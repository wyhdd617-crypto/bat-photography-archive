export default function Notes({ photos, onOpen }) {
  return (
    <section className="notes-page">
      <header className="page-heading">
        <p>Field Notes</p>
        <h2>拍摄之后留下的时间、地点和不可靠记忆。</h2>
        <span>随拍摄持续补记</span>
      </header>

      <div className="notes-list">
        {photos.map((photo, index) => (
          <article className="note-entry" key={photo.id}>
            <button type="button" onClick={() => onOpen(photo)}>
              <img
                src={photo.src}
                alt={photo.title}
                width={photo.width}
                height={photo.height}
                loading={index < 4 ? 'eager' : 'lazy'}
              />
            </button>
            <div className="note-index">{photo.archiveNo}</div>
            <dl>
              <div><dt>时间</dt><dd>{photo.time}</dd></div>
              <div><dt>地点</dt><dd>{photo.location}</dd></div>
              <div><dt>旁注</dt><dd>{photo.note}</dd></div>
              <div><dt>背景</dt><dd>{photo.context}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
