import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const inputJson = path.join(rootDir, 'src', 'data', 'generatedContentData.json');
const publicDir = path.join(rootDir, 'public');

const BASE_URL = (process.env.SITE_URL || 'https://research.sensifai.com').replace(/\/$/, '');

function formatDate(date = new Date()) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return new Date().toISOString().split('T')[0];
  }
  return d.toISOString().split('T')[0];
}

function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildUrlSet(urls) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach(item => {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(item.loc)}</loc>\n`;
    if (item.lastmod) {
      xml += `    <lastmod>${escapeXml(item.lastmod)}</lastmod>\n`;
    }
    if (item.changefreq) {
      xml += `    <changefreq>${escapeXml(item.changefreq)}</changefreq>\n`;
    }
    if (item.priority !== undefined) {
      xml += `    <priority>${item.priority}</priority>\n`;
    }
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;
  return xml;
}

function buildSitemapIndex(sitemaps) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  sitemaps.forEach(item => {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${escapeXml(item.loc)}</loc>\n`;
    if (item.lastmod) {
      xml += `    <lastmod>${escapeXml(item.lastmod)}</lastmod>\n`;
    }
    xml += `  </sitemap>\n`;
  });

  xml += `</sitemapindex>\n`;
  return xml;
}

function generateSitemaps() {
  console.log('🌐 Generating sitemaps in public/...');

  if (!fs.existsSync(inputJson)) {
    console.error('❌ generatedContentData.json not found! Run "npm run build:content" first.');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(inputJson, 'utf8'));
  const today = formatDate();

  // 1. Publications Sitemap (sitemap-publications.xml)
  const pubUrls = (data.publications || []).map(pub => {
    let lastmod = today;
    if (pub.year) {
      lastmod = `${pub.year}-01-01`;
    }
    return {
      loc: `${BASE_URL}/publication/${pub.id}`,
      lastmod,
      changefreq: 'monthly',
      priority: pub.featured ? 0.9 : 0.8
    };
  });

  const pubSitemapXml = buildUrlSet(pubUrls);
  const pubSitemapPath = path.join(publicDir, 'sitemap-publications.xml');
  fs.writeFileSync(pubSitemapPath, pubSitemapXml, 'utf8');
  console.log(`✅ Created public/sitemap-publications.xml (${pubUrls.length} publications)`);

  // 2. Authors / Researchers Sitemap (sitemap-authors.xml)
  const authorUrlMap = new Map();
  (data.authors || []).forEach(author => {
    if (author.id) {
      const loc = `${BASE_URL}/researcher/${author.id}`;
      if (!authorUrlMap.has(loc)) {
        authorUrlMap.set(loc, {
          loc,
          lastmod: today,
          changefreq: 'monthly',
          priority: 0.8
        });
      }
    }
    if (author.orcidId && author.orcidId !== author.id) {
      const loc = `${BASE_URL}/researcher/${author.orcidId}`;
      if (!authorUrlMap.has(loc)) {
        authorUrlMap.set(loc, {
          loc,
          lastmod: today,
          changefreq: 'monthly',
          priority: 0.7
        });
      }
    }
  });

  const authorUrls = Array.from(authorUrlMap.values());
  const authorSitemapXml = buildUrlSet(authorUrls);
  const authorSitemapPath = path.join(publicDir, 'sitemap-authors.xml');
  fs.writeFileSync(authorSitemapPath, authorSitemapXml, 'utf8');
  console.log(`✅ Created public/sitemap-authors.xml (${authorUrls.length} author routes)`);

  // 3. Main Static & Category Pages Sitemap (sitemap-main.xml)
  const mainUrls = [
    { loc: `${BASE_URL}/`, lastmod: today, changefreq: 'daily', priority: 1.0 },
    { loc: `${BASE_URL}/publications`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
    { loc: `${BASE_URL}/researchers`, lastmod: today, changefreq: 'weekly', priority: 0.8 },
    { loc: `${BASE_URL}/people`, lastmod: today, changefreq: 'weekly', priority: 0.7 }
  ];

  // Collect unique tag routes
  const tagsSet = new Set();
  (data.publications || []).forEach(pub => {
    if (Array.isArray(pub.tags)) {
      pub.tags.forEach(tag => tagsSet.add(tag));
    }
  });

  tagsSet.forEach(tag => {
    const slug = encodeURIComponent(tag.toLowerCase().trim().replace(/\s+/g, '-'));
    mainUrls.push({
      loc: `${BASE_URL}/tag/${slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5
    });
  });

  const mainSitemapXml = buildUrlSet(mainUrls);
  const mainSitemapPath = path.join(publicDir, 'sitemap-main.xml');
  fs.writeFileSync(mainSitemapPath, mainSitemapXml, 'utf8');
  console.log(`✅ Created public/sitemap-main.xml (${mainUrls.length} static & tag routes)`);

  // 4. Root Sitemap Index (sitemap.xml)
  const sitemapIndexList = [
    { loc: `${BASE_URL}/sitemap-main.xml`, lastmod: today },
    { loc: `${BASE_URL}/sitemap-publications.xml`, lastmod: today },
    { loc: `${BASE_URL}/sitemap-authors.xml`, lastmod: today }
  ];

  const sitemapIndexXml = buildSitemapIndex(sitemapIndexList);
  const sitemapIndexPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapIndexPath, sitemapIndexXml, 'utf8');
  console.log(`✅ Created public/sitemap.xml (Sitemap Index)`);

  // 5. Update public/robots.txt with Sitemap directive if not already present
  const robotsPath = path.join(publicDir, 'robots.txt');
  let robotsTxt = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : 'User-agent: *\nAllow: /\n';
  if (!robotsTxt.includes('Sitemap:')) {
    robotsTxt = robotsTxt.trimEnd() + `\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
    console.log('✅ Updated public/robots.txt with Sitemap URL');
  }
}

generateSitemaps();
