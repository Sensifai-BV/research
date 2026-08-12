import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const inputJson = path.join(rootDir, 'src', 'data', 'generatedContentData.json');
const outputLlms = path.join(rootDir, 'public', 'llms.txt');
const outputRobots = path.join(rootDir, 'public', 'robots.txt');

function generateLlmsTxt(data) {
  let content = '# Sensifai Research Labs - LLM Context\n\n';
  content += '> This file provides structured information about Sensifai Research Labs publications, researchers, and domains for LLMs and AI crawlers.\n\n';

  // Research Areas
  if (data.researchAreas && data.researchAreas.length > 0) {
    content += '## Research Areas\n\n';
    data.researchAreas.forEach(area => {
      content += `- ${area.name}\n`;
    });
    content += '\n';
  }

  // Authors
  content += '## Researchers\n\n';
  data.authors.forEach(author => {
    content += `### ${author.name}\n`;
    content += `- Profile: https://research.sensifai.com/researcher/${author.orcidId || author.id}\n`;
    if (author.role) content += `- Role: ${author.role}\n`;
    if (author.area) content += `- Focus: ${author.area}\n`;
    if (author.headline) content += `- Headline: ${author.headline}\n`;
    if (author.bio) {
      // Clean up markdown/newlines
      const bioText = author.bio.replace(/\n+/g, ' ').replace(/[#*>_]/g, '').trim();
      content += `- Bio: ${bioText}\n`;
    }
    content += '\n';
  });

  // Publications
  content += '## Publications\n\n';
  data.publications.forEach(pub => {
    content += `### ${pub.title}\n`;
    content += `- URL: https://research.sensifai.com/publication/${pub.id}\n`;
    const authorNames = pub.authors.map(a => a.name || a).join(', ');
    content += `- Authors: ${authorNames}\n`;
    if (pub.year) content += `- Year: ${pub.year}\n`;
    if (pub.venue) content += `- Venue: ${pub.venue}\n`;
    if (pub.areaName || pub.areaBadge) content += `- Area: ${pub.areaName || pub.areaBadge}\n`;
    if (pub.abstract) {
      const absText = pub.abstract.replace(/\n+/g, ' ').replace(/[#*>_]/g, '').trim();
      content += `- Abstract: ${absText}\n`;
    }
    if (pub.keywords) content += `- Keywords: ${(pub.keywords || []).join(', ')}\n`;
    content += '\n';
  });

  return content;
}

function run() {
  console.log('⚡ Generating llms.txt and robots.txt...');

  if (!fs.existsSync(inputJson)) {
    console.error('❌ generatedContentData.json not found! Run build:content first.');
    process.exit(1);
  }

  const rawData = fs.readFileSync(inputJson, 'utf8');
  const data = JSON.parse(rawData);

  // Generate llms.txt
  const llmsTxtContent = generateLlmsTxt(data);
  fs.writeFileSync(outputLlms, llmsTxtContent);
  console.log('✅ Created public/llms.txt');

  // Generate robots.txt
  // Allow all standard crawlers, and specifically point to llms.txt and sitemap.xml
  const robotsTxtContent = `User-agent: *\nAllow: /\n\n# LLM context file\n# This file provides a markdown-formatted summary of our site for LLM consumption\n# See: https://sensifai.com/llms.txt\n\nSitemap: https://research.sensifai.com/sitemap.xml\n`;
  fs.writeFileSync(outputRobots, robotsTxtContent);
  console.log('✅ Created public/robots.txt');
}

run();
