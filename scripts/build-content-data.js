import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import MiniSearch from 'minisearch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const publicationsDir = path.join(rootDir, 'content', 'publications');
const authorsDir = path.join(rootDir, 'content', 'authors');
const researchAreasFile = path.join(rootDir, 'content', 'research-areas.json');
const sqliteFile = path.join(rootDir, 'src', 'data', 'content.db');
const jsonOutputFile = path.join(rootDir, 'src', 'data', 'generatedContentData.json');

// Helper to parse simple YAML frontmatter and Markdown body
function parseMarkdownContent(fileContent, filePath) {
  const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontMatterRegex);
  
  if (!match) {
    return { frontmatter: {}, body: fileContent.trim(), filePath: path.relative(rootDir, filePath) };
  }

  const yamlRaw = match[1];
  const body = match[2].trim();
  const frontmatter = parseYaml(yamlRaw);
  
  return { frontmatter, body, filePath: path.relative(rootDir, filePath) };
}

// Robust YAML parser for frontmatter
function parseYaml(yamlStr) {
  const result = {};
  const lines = yamlStr.split('\n');
  let currentKey = null;
  let isMultiline = false;
  let multilineBuffer = [];
  let currentArrayKey = null;
  let currentObjectInArray = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trimEnd();

    if (!line || line.trim().startsWith('#')) continue;

    if (isMultiline) {
      if (rawLine.startsWith('  ') || rawLine.startsWith('\t') || rawLine === '') {
        multilineBuffer.push(rawLine.replace(/^(  |\t)/, ''));
        continue;
      } else {
        result[currentKey] = multilineBuffer.join('\n');
        isMultiline = false;
        multilineBuffer = [];
        currentKey = null;
      }
    }

    const colonIdx = line.indexOf(':');
    const isArrayItem = line.trim().startsWith('-');

    if (isArrayItem && currentArrayKey) {
      const itemContent = line.trim().substring(1).trim();
      if (itemContent.includes(':')) {
        const [subK, ...subValParts] = itemContent.split(':');
        const subVal = subValParts.join(':').trim();
        currentObjectInArray = {};
        currentObjectInArray[subK.trim()] = parseYamlValue(subVal);
        result[currentArrayKey].push(currentObjectInArray);
      } else if (currentObjectInArray && rawLine.startsWith('    ')) {
        const [subK, ...subValParts] = line.trim().split(':');
        const subVal = subValParts.join(':').trim();
        currentObjectInArray[subK.trim()] = parseYamlValue(subVal);
      } else {
        result[currentArrayKey].push(parseYamlValue(itemContent));
      }
      continue;
    }

    if (colonIdx !== -1) {
      const key = line.substring(0, colonIdx).trim();
      const valStr = line.substring(colonIdx + 1).trim();

      if (valStr === '|') {
        currentKey = key;
        isMultiline = true;
        multilineBuffer = [];
        currentArrayKey = null;
      } else if (valStr === '' && i + 1 < lines.length && lines[i + 1].trim().startsWith('-')) {
        currentArrayKey = key;
        result[key] = [];
      } else {
        result[key] = parseYamlValue(valStr);
        currentArrayKey = null;
      }
    }
  }

  if (isMultiline && currentKey) {
    result[currentKey] = multilineBuffer.join('\n');
  }

  return result;
}

function parseYamlValue(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (/^-?\d+$/.test(val)) return parseInt(val, 10);
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.substring(1, val.length - 1);
  }
  if (val.startsWith('[') && val.endsWith(']')) {
    return val.substring(1, val.length - 1).split(',').map(s => parseYamlValue(s.trim()));
  }
  return val;
}

function getBaseResearchAreas() {
  if (fs.existsSync(researchAreasFile)) {
    try {
      return JSON.parse(fs.readFileSync(researchAreasFile, 'utf8'));
    } catch {
      // Fallback
    }
  }
  return [];
}

function buildContentData() {
  console.log('⚡ Compiling SQLite Production Store & MiniSearch Index from Content Engine...');

  // 1. Load Authors
  const authors = [];
  if (fs.existsSync(authorsDir)) {
    const authorFiles = fs.readdirSync(authorsDir).filter(f => f.endsWith('.md'));
    authorFiles.forEach(file => {
      const fullPath = path.join(authorsDir, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      const parsed = parseMarkdownContent(content, fullPath);
      const data = parsed.frontmatter;
      data.bio = parsed.body || data.bio || '';
      data.sourceFile = data.sourceFile || `content/authors/${file}`;
      data.githubUrl = data.githubUrl || data.github || '';
      data.linkedinUrl = data.linkedinUrl || data.linkedin || '';
      data.scholarUrl = data.scholarUrl || data.scholar || '';
      data.orcidId = data.orcidId || data.orcid || '';
      data.github = data.github || data.githubUrl || '';
      data.linkedin = data.linkedin || data.linkedinUrl || '';
      data.scholar = data.scholar || data.scholarUrl || '';
      data.orcid = data.orcid || data.orcidId || '';
      authors.push(data);
    });
  }

  // 2. Load Publications
  const publications = [];
  if (fs.existsSync(publicationsDir)) {
    const pubFiles = fs.readdirSync(publicationsDir).filter(f => f.endsWith('.md'));
    pubFiles.forEach(file => {
      const fullPath = path.join(publicationsDir, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      const parsed = parseMarkdownContent(content, fullPath);
      const data = parsed.frontmatter;
      data.abstract = parsed.body || data.abstract || '';
      data.sourceFile = data.sourceFile || `content/publications/${file}`;
      publications.push(data);
    });
  }

  publications.sort((a, b) => (b.year || 0) - (a.year || 0));

  // Helper for ORCID, ID, and name-tolerant author matching
  function matchAuthor(a, author) {
    if (!a || !author) return false;
    const authorId = (author.id || '').toLowerCase().trim();
    const authorOrcid = (author.orcidId || author.orcid || '').toLowerCase().trim();
    const authorName = (author.name || '').toLowerCase().trim();

    if (typeof a === 'string') {
      const cleanA = a.toLowerCase().trim();
      return (
        cleanA === authorId ||
        (authorOrcid && cleanA === authorOrcid) ||
        (authorName && cleanA === authorName)
      );
    }

    const aId = (a.id || '').toLowerCase().trim();
    const aOrcid = (a.orcidId || a.orcid || '').toLowerCase().trim();
    const aName = (a.name || '').toLowerCase().trim();

    return (
      (aId && (aId === authorId || aId === authorOrcid)) ||
      (aOrcid && (aOrcid === authorOrcid || aOrcid === authorId)) ||
      (aName && authorName && aName === authorName)
    );
  }

  // Compute accurate author paper counts first
  const authorPaperCounts = {};
  authors.forEach(author => {
    const authored = publications.filter(p =>
      p.authors && p.authors.some(a => matchAuthor(a, author))
    );
    author.pubCount = authored.length;
    authorPaperCounts[author.id] = authored.length;
  });

  authors.sort((a, b) => (b.pubCount || 0) - (a.pubCount || 0));

  // Normalize author objects on publications
  publications.forEach(pub => {
    if (pub.authors && Array.isArray(pub.authors)) {
      pub.authors = pub.authors.map(a => {
        const match = authors.find(author => matchAuthor(a, author));
        if (match) {
          return {
            id: match.id,
            orcidId: match.orcidId,
            name: match.name,
            avatar: match.avatar,
            role: match.role,
            affiliation: match.affiliation
          };
        }
        return typeof a === 'string' ? { id: a, name: a } : a;
      });
    }
  });

  // Research areas calculation
  const researchAreas = getBaseResearchAreas().map(area => {
    const areaPubs = publications.filter(p =>
      p.areaId === area.id || p.areaName === area.name || p.areaBadge === area.badge
    );
    return {
      ...area,
      count: areaPubs.length,
      totalCitations: areaPubs.reduce((sum, p) => sum + (p.citations || 0), 0)
    };
  });

  const totalPublicationsCount = publications.length;
  const totalAuthorsCount = authors.length;
  const totalCitations = publications.reduce((sum, p) => sum + (p.citations || 0), 0);

  // 3. Build SQLite Database (src/data/content.db)
  if (fs.existsSync(sqliteFile)) {
    fs.unlinkSync(sqliteFile);
  }

  const db = new Database(sqliteFile);
  
  // Enable WAL mode & performance PRAGMAs
  db.pragma('journal_mode = WAL');
  db.pragma('synchronous = NORMAL');

  // Create Schema
  db.exec(`
    CREATE TABLE publications (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      year INTEGER,
      month TEXT,
      venue TEXT,
      is_published INTEGER,
      published_badge TEXT,
      area_id TEXT,
      area_name TEXT,
      area_badge TEXT,
      citations INTEGER,
      featured INTEGER,
      doi TEXT,
      abstract TEXT,
      pdf_url TEXT,
      code_url TEXT,
      authors_json TEXT,
      tags_json TEXT,
      figures_json TEXT,
      bibtex TEXT,
      source_file TEXT
    );

    CREATE TABLE authors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT,
      affiliation TEXT,
      bio TEXT,
      avatar TEXT,
      orcid_id TEXT,
      scholar_url TEXT,
      github_url TEXT,
      twitter_url TEXT,
      pub_count INTEGER,
      source_file TEXT
    );

    CREATE TABLE research_areas (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      badge TEXT,
      description TEXT,
      count INTEGER,
      total_citations INTEGER
    );

    CREATE VIRTUAL TABLE fts_publications USING fts5(id, title, abstract, authors_text, tags_text, venue);
  `);

  // Insert Publications into SQLite
  const insertPub = db.prepare(`
    INSERT INTO publications (
      id, title, year, month, venue, is_published, published_badge, area_id, area_name, area_badge,
      citations, featured, doi, abstract, pdf_url, code_url, authors_json, tags_json, figures_json, bibtex, source_file
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertFTS = db.prepare(`
    INSERT INTO fts_publications (id, title, abstract, authors_text, tags_text, venue)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  publications.forEach(p => {
    const authorsJson = JSON.stringify(p.authors || []);
    const tagsJson = JSON.stringify(p.tags || []);
    const figuresJson = JSON.stringify(p.figures || []);
    const authorsText = (p.authors || []).map(a => a.name).join(' ');
    const tagsText = (p.tags || []).join(' ');

    insertPub.run(
      p.id || '',
      p.title || '',
      p.year || 0,
      p.month || '',
      p.venue || '',
      p.isPublished ? 1 : 0,
      p.publishedBadge || '',
      p.areaId || '',
      p.areaName || '',
      p.areaBadge || '',
      p.citations || 0,
      p.featured ? 1 : 0,
      p.doi || '',
      p.abstract || '',
      p.pdfUrl || '',
      p.codeUrl || '',
      authorsJson,
      tagsJson,
      figuresJson,
      p.bibtex || '',
      p.sourceFile || ''
    );

    insertFTS.run(p.id || '', p.title || '', p.abstract || '', authorsText, tagsText, p.venue || '');
  });

  // Insert Authors into SQLite
  const insertAuthor = db.prepare(`
    INSERT INTO authors (id, name, role, affiliation, bio, avatar, orcid_id, scholar_url, github_url, twitter_url, pub_count, source_file)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  authors.forEach(a => {
    insertAuthor.run(
      a.id || '',
      a.name || '',
      a.role || '',
      a.affiliation || '',
      a.bio || '',
      a.avatar || '',
      a.orcidId || '',
      a.scholarUrl || '',
      a.githubUrl || '',
      a.twitterUrl || '',
      a.pubCount || 0,
      a.sourceFile || ''
    );
  });

  // Insert Research Areas into SQLite
  const insertArea = db.prepare(`
    INSERT INTO research_areas (id, name, badge, description, count, total_citations)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  researchAreas.forEach(r => {
    insertArea.run(r.id, r.name, r.badge, r.description, r.count, r.totalCitations);
  });

  db.close();

  // 4. Build MiniSearch In-Memory Index for Instant Client-Side Full-Text Search
  const miniSearch = new MiniSearch({
    fields: ['title', 'abstract', 'authorsText', 'tagsText', 'venue'],
    storeFields: ['id', 'title', 'areaId', 'year'],
    idField: 'id'
  });

  const searchDocs = publications.map(p => ({
    id: p.id,
    title: p.title || '',
    abstract: p.abstract || '',
    authorsText: (p.authors || []).map(a => a.name).join(' '),
    tagsText: (p.tags || []).join(' '),
    venue: p.venue || '',
    areaId: p.areaId,
    year: p.year
  }));

  miniSearch.addAll(searchDocs);
  const searchIndexJson = JSON.stringify(miniSearch);

  // 5. Output Fast Production JSON Store with Indexes & Maps
  const publicationMap = {};
  publications.forEach(p => { publicationMap[p.id] = p; });

  const authorMap = {};
  authors.forEach(a => { authorMap[a.id] = a; });

  const outputData = {
    stats: {
      totalPublicationsCount,
      totalAuthorsCount,
      totalCitations,
      totalResearchAreasCount: researchAreas.length,
      averageCitationsPerPaper: Math.round(totalCitations / (totalPublicationsCount || 1)),
      authorPaperCounts
    },
    meta: {
      generatedAt: new Date().toISOString(),
      generator: "SQLite Production Store & MiniSearch Content Engine",
      sqliteFile: "src/data/content.db"
    },
    researchAreas,
    publications,
    authors,
    publicationMap,
    authorMap,
    searchIndex: searchIndexJson
  };

  fs.writeFileSync(jsonOutputFile, JSON.stringify(outputData, null, 2));
  console.log(`✅ SQLite Database compiled to src/data/content.db!`);
  console.log(`✅ Production Store compiled to src/data/generatedContentData.json!`);
  console.log(`📊 Statistics: ${totalPublicationsCount} Publications | ${totalAuthorsCount} Authors | ${totalCitations} Citations | ${researchAreas.length} Research Domains.`);
}

buildContentData();
