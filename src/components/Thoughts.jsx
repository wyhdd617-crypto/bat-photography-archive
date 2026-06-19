const sections = ['现代诗', '梦境', '呓语', '放大'];

function formatDate(date) {
  if (!date) return '日期未记';
  return date.replaceAll('-', ' / ');
}

export default function Thoughts({ thoughts }) {
  return (
    <section className="thoughts-page">
      <header className="page-heading thoughts-heading">
        <p>Private Papers / Ongoing</p>
        <h2>蝙蝠小脑袋在想什么？</h2>
        <span>{String(thoughts.length).padStart(2, '0')} PAGES</span>
      </header>

      <div className="thoughts-catalogue" aria-label="文本类型">
        {sections.map((section) => <span key={section}>{section}</span>)}
      </div>

      <div className="thoughts-list">
        {thoughts.map((thought, index) => (
          <article className="thought-entry" key={thought.id}>
            <header className="thought-meta">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <time dateTime={thought.date}>{formatDate(thought.date)}</time>
              <span>{thought.type}</span>
            </header>
            <div className="thought-sheet">
              <h3>{thought.title}</h3>
              <div className="thought-body">{thought.body}</div>
            </div>
            {thought.tags.length > 0 && (
              <footer className="thought-tags" aria-label="标签">
                {thought.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </footer>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
