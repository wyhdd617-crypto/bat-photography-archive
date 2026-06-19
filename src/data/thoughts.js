const thoughtModules = import.meta.glob('../content/thoughts/*.json', {
  eager: true,
  import: 'default',
});

function normalizeThought(path, entry) {
  return {
    id: path.split('/').pop().replace('.json', ''),
    title: String(entry.title || '无题'),
    date: String(entry.date || ''),
    type: String(entry.type || '私人记录'),
    tags: Array.isArray(entry.tags) ? entry.tags.map(String) : [],
    body: String(entry.body || ''),
  };
}

export const thoughts = Object.entries(thoughtModules)
  .map(([path, entry]) => normalizeThought(path, entry))
  .sort((a, b) => b.date.localeCompare(a.date));
