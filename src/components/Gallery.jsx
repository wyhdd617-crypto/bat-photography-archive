export default function Gallery({ photos, onOpen }) {
  return (
    <section className="archive-page">
      <header className="page-heading">
        <p>Archive / 2026—</p>
        <h2>图像依照进入档案的顺序留在这里。</h2>
        <span>{String(photos.length).padStart(3, '0')} FRAMES</span>
      </header>

      <div className="archive-grid">
        {photos.map((photo, index) => (
          <article className="archive-item" key={photo.id}>
            <button type="button" onClick={() => onOpen(photo)} aria-label={`查看 ${photo.archiveNo}`}>
              <img
                src={photo.src}
                alt={photo.title}
                width={photo.width}
                height={photo.height}
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </button>
            <div className="archive-caption">
              <span>{photo.archiveNo}</span>
              <span>{photo.location}, {photo.year}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
