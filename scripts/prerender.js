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
  
  const defaultTitleMatch = templateHtml.match(/<title>(.*?)<\/title>/i);
  const defaultTitle = defaultTitleMatch ? defaultTitleMatch[1] : 'Sensifai Research Labs';

  let contentData = { publications: [], authors: [], stats: {} };

  if (fs.existsSync(dataPath)) {
    try {
      contentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } catch (e) {
      console.warn('⚠️ Could not parse content data for prerendering:', e.message);
    }
  }

  const routes = [
    { url: '/', title: defaultTitle, description: 'Pushing the frontiers of science to build intelligent systems. Explore our research trajectory, publications, and scientific minds.' },
    { url: '/publications', title: `Publications & Research Papers | ${defaultTitle}`, description: 'Browse peer-reviewed publications, arXiv preprints, code implementations, and datasets in AI and computer vision.' },
    { url: '/researchers', title: `Researchers & AI Scientists | ${defaultTitle}`, description: 'Meet the scientists, engineers, and researchers pioneering multimodal intelligence at Sensifai Labs.' },
    { url: '/people', title: `Our Team & Researchers | ${defaultTitle}`, description: 'Meet the scientists, engineers, and researchers pioneering multimodal intelligence at Sensifai Labs.' }
  ];

  // Add individual publication pages
  (contentData.publications || []).forEach(paper => {
    const paperTitle = `${paper.title} | ${defaultTitle}`;
    const paperDesc = paper.abstract ? paper.abstract.substring(0, 160) + '...' : paper.title;
    routes.push({ url: `/publication/${paper.id}`, title: paperTitle, description: paperDesc });
    routes.push({ url: `/paper/${paper.id}`, title: paperTitle, description: paperDesc });
  });

  // Add individual author pages
  (contentData.authors || []).forEach(author => {
    const authorTitle = `${author.name} - ${author.role} | ${defaultTitle}`;
    const authorDesc = author.headline || author.bio || author.name;
    const authorImage = author.avatar;
    if (author.id) routes.push({ url: `/researcher/${author.id}`, title: authorTitle, description: authorDesc, image: authorImage });
    if (author.orcidId && author.orcidId !== author.id) routes.push({ url: `/researcher/${author.orcidId}`, title: authorTitle, description: authorDesc, image: authorImage });
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
    const tagTitle = `Publications tagged "${tag}" | ${defaultTitle}`;
    const tagDesc = `Browse all peer-reviewed research papers and publications tagged with ${tag} at Sensifai Labs.`;
    routes.push({ url: `/tag/${slug}`, title: tagTitle, description: tagDesc });
    routes.push({ url: `/tags/${slug}`, title: tagTitle, description: tagDesc });
    routes.push({ url: `/publications/tag/${slug}`, title: tagTitle, description: tagDesc });
  });

  console.log(`📄 Generating static HTML pages for ${routes.length} SSG routes...`);

  let generatedCount = 0;

  routes.forEach(route => {
    let routeHtml = templateHtml;

    const routeUrl = `https://research.sensifai.com${route.url === '/' ? '' : route.url}`;
    const routeImage = route.image ? (route.image.startsWith('http') ? route.image : `https://research.sensifai.com${route.image}`) : 'https://research.sensifai.com/sensifai-logo.png';

    // Inject custom page title & meta description for SEO
    routeHtml = routeHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeXml(route.title)}</title>`);
    
    const metaDescTag = `<meta name="description" content="${escapeXml(route.description)}">`;
    if (routeHtml.includes('<meta name="description"')) {
      routeHtml = routeHtml.replace(/<meta name="description"[^>]*>/i, metaDescTag);
    } else {
      routeHtml = routeHtml.replace('</head>', `  ${metaDescTag}\n</head>`);
    }

    // Inject Open Graph / Twitter / Canonical tags with absolute URLs for external resources & scrapers
    routeHtml = routeHtml.replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="${escapeXml(routeUrl)}"`);
    routeHtml = routeHtml.replace(/<meta property="twitter:url" content="[^"]*"/i, `<meta property="twitter:url" content="${escapeXml(routeUrl)}"`);
    routeHtml = routeHtml.replace(/<link rel="canonical" href="[^"]*"/i, `<link rel="canonical" href="${escapeXml(routeUrl)}"`);
    
    routeHtml = routeHtml.replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${escapeXml(route.title)}"`);
    routeHtml = routeHtml.replace(/<meta property="twitter:title" content="[^"]*"/i, `<meta property="twitter:title" content="${escapeXml(route.title)}"`);
    
    routeHtml = routeHtml.replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${escapeXml(route.description)}"`);
    routeHtml = routeHtml.replace(/<meta property="twitter:description" content="[^"]*"/i, `<meta property="twitter:description" content="${escapeXml(route.description)}"`);

    routeHtml = routeHtml.replace(/<meta property="og:image" content="[^"]*"/i, `<meta property="og:image" content="${escapeXml(routeImage)}"`);
    routeHtml = routeHtml.replace(/<meta property="twitter:image" content="[^"]*"/i, `<meta property="twitter:image" content="${escapeXml(routeImage)}"`);

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
