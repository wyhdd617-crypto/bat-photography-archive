export default function Gallery({
  photos,
  categories,
  activeCategory,
  onCategoryChange,
  onOpen,
}) {
  const categoryLabels = {
    All: '全部',
    Street: '街头',
    Landscape: '风景',
    Portrait: '人像',
    Night: '夜晚',
    Experimental: '实验',
  };

  const visiblePhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  return (
    <section className="archive-page">
      <div className="section-heading">
        <p>作品索引</p>
        <h2>像证据一样被保留下来的图像，不完整，也不干净。</h2>
      </div>

      <div className="category-row" aria-label="作品分类">
        {['All', ...categories].map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? 'is-selected' : ''}
            onClick={() => onCategoryChange(category)}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      <div className="work-grid">
        {visiblePhotos.map((photo, index) => (
          <article className="work-item" key={photo.id}>
            <button type="button" onClick={() => onOpen(photo)} aria-label={`查看作品 ${photo.title}`}>
              <img
                src={photo.src}
                alt={photo.title}
                width={photo.width}
                height={photo.height}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </button>
            <div className="work-meta">
              <h3>{photo.title}</h3>
              <dl>
                <div>
                  <dt>年份</dt>
                  <dd>{photo.year}</dd>
                </div>
                <div>
                  <dt>地点</dt>
                  <dd>{photo.location}</dd>
                </div>
                <div>
                  <dt>方式</dt>
                  <dd>{photo.method}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
