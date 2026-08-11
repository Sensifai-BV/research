import MiniSearch from 'minisearch';
import contentData from './generatedContentData.json';

export const CONTENT_STATS = contentData?.stats || {};
export const CONTENT_META = contentData?.meta || {};
export const RESEARCH_AREAS = contentData?.researchAreas || [];
export const PAPERS = contentData?.publications || [];
export const TEAM = contentData?.authors || [];

// O(1) Indexed Maps
export const PUBLICATION_MAP = contentData?.publicationMap || {};
export const AUTHOR_MAP = contentData?.authorMap || {};

// High-Performance MiniSearch Full-Text Search Engine
let miniSearchInstance = null;

export function getSearchEngine() {
  if (!miniSearchInstance && contentData?.searchIndex) {
    try {
      const parsedIndex = typeof contentData.searchIndex === 'string'
        ? JSON.parse(contentData.searchIndex)
        : contentData.searchIndex;

      miniSearchInstance = MiniSearch.loadJSON(parsedIndex, {
        fields: ['title', 'abstract', 'authorsText', 'tagsText', 'venue'],
        storeFields: ['id', 'title', 'areaId', 'year'],
        idField: 'id'
      });
    } catch (e) {
      console.warn("MiniSearch search index initialization fallback:", e);
    }
  }
  return miniSearchInstance;
}

export function searchPublications(query) {
  if (!query || !query.trim()) return PAPERS;

  try {
    const engine = getSearchEngine();
    if (engine) {
      const results = engine.search(query, { prefix: true, fuzzy: 0.2 });
      const matchedIds = new Set(results.map(r => r.id));
      return PAPERS.filter(p => matchedIds.has(p.id));
    }
  } catch (e) {
    console.warn("MiniSearch query error, using linear fallback:", e);
  }

  // Fallback string matching
  const q = query.toLowerCase().trim();
  return PAPERS.filter(p =>
    (p.title && p.title.toLowerCase().includes(q)) ||
    (p.abstract && p.abstract.toLowerCase().includes(q)) ||
    (p.authors && p.authors.some(a => a.name && a.name.toLowerCase().includes(q))) ||
    (p.tags && p.tags.some(t => t && t.toLowerCase().includes(q)))
  );
}

// O(1) Instant Getters
export function getPublicationById(id) {
  if (!id) return null;
  return PUBLICATION_MAP[id] || PAPERS.find(p => p.id === id || p.id?.toString() === id?.toString()) || null;
}

export function getAuthorById(id) {
  if (!id) return null;
  return AUTHOR_MAP[id] || TEAM.find(a => a.id === id || a.orcidId === id) || null;
}

// Backward compatibility aliases
export const HUGO_STATS = CONTENT_STATS;
export const HUGO_META = CONTENT_META;
