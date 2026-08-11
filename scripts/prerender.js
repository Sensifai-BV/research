import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');
const dataPath = path.join(rootDir, 'src', 'data', 'generatedContentData.json');

function runPrerender() {
  console.log('🌐 Starting Vite SSG Pre-renderer...');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');
  let contentData = { publications: [], authors: [], stats: {} };

  if (fs.existsSync(dataPath)) {
    try {
      contentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } catch (e) {
      console.warn('⚠️ Could not parse content data for prerendering:', e.message);
    }
  }

  const routes = [
    { url: '/', title: 'Sensifai AI Research Library | Cutting-Edge Research', description: 'Explore cutting-edge artificial intelligence, real-time video understanding, audio speech processing, and lightweight edge models by Sensifai Labs.' },
    { url: '/publications', title: 'Publications & Research Papers | Sensifai Research', description: 'Browse peer-reviewed publications, arXiv preprints, code implementations, and datasets in AI and computer vision.' },
    { url: '/researchers', title: 'Researchers & AI Scientists | Sensifai Research', description: 'Meet the scientists, engineers, and researchers pioneering multimodal intelligence at Sensifai Labs.' },
    { url: '/people', title: 'Our Team & Researchers | Sensifai Research', description: 'Meet the scientists, engineers, and researchers pioneering multimodal intelligence at Sensifai Labs.' }
  ];

  // Add individual publication pages
  (contentData.publications || []).forEach(paper => {
    const paperTitle = `${paper.title} | Sensifai Research`;
    const paperDesc = paper.abstract ? paper.abstract.substring(0, 160) + '...' : paper.title;
    routes.push({ url: `/publication/${paper.id}`, title: paperTitle, description: paperDesc });
    routes.push({ url: `/paper/${paper.id}`, title: paperTitle, description: paperDesc });
  });

  // Add individual author pages
  (contentData.authors || []).forEach(author => {
    const authorTitle = `${author.name} - ${author.role} | Sensifai Research`;
    const authorDesc = author.headline || author.bio || author.name;
    if (author.id) routes.push({ url: `/researcher/${author.id}`, title: authorTitle, description: authorDesc });
    if (author.orcidId && author.orcidId !== author.id) routes.push({ url: `/researcher/${author.orcidId}`, title: authorTitle, description: authorDesc });
  });

  // Add individual tag routes
  const allTags = new Set();
  (contentData.publications || []).forEach(paper => {
    if (paper.tags && Array.isArray(paper.tags)) {
      paper.tags.forEach(tag => allTags.add(tag));
    }
  });

  allTags.forEach(tag => {
    const slug = encodeURIComponent(tag.toLowerCase().trim().replace(/\s+/g, '-'));
    const tagTitle = `Publications tagged "${tag}" | Sensifai Research`;
    const tagDesc = `Browse all peer-reviewed research papers and publications tagged with ${tag} at Sensifai Labs.`;
    routes.push({ url: `/tag/${slug}`, title: tagTitle, description: tagDesc });
    routes.push({ url: `/tags/${slug}`, title: tagTitle, description: tagDesc });
    routes.push({ url: `/publications/tag/${slug}`, title: tagTitle, description: tagDesc });
  });

  console.log(`📄 Generating static HTML pages for ${routes.length} SSG routes...`);

  let generatedCount = 0;

  routes.forEach(route => {
    let routeHtml = templateHtml;

    // Inject custom page title & meta description for SEO
    routeHtml = routeHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeXml(route.title)}</title>`);
    
    const metaDescTag = `<meta name="description" content="${escapeXml(route.description)}">`;
    if (routeHtml.includes('<meta name="description"')) {
      routeHtml = routeHtml.replace(/<meta name="description"[^>]*>/i, metaDescTag);
    } else {
      routeHtml = routeHtml.replace('</head>', `  ${metaDescTag}\n</head>`);
    }

    // Determine output path
    let outFilePath;
    if (route.url === '/' || route.url === '/index.html') {
      outFilePath = path.join(distDir, 'index.html');
    } else {
      const cleanPath = route.url.replace(/^\//, '');
      const pageDir = path.join(distDir, cleanPath);
      if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
      }
      outFilePath = path.join(pageDir, 'index.html');
    }

    fs.writeFileSync(outFilePath, routeHtml, 'utf8');
    generatedCount++;
  });

  console.log(`✨ Vite SSG Prerendering complete! ${generatedCount} static routes written to dist/`);
}

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

runPrerender();
