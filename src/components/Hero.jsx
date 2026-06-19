const directory = [
  ['档案', 'archive'],
  ['项目', 'projects'],
  ['关于', 'about'],
  ['联系', 'contact'],
  ['蝙蝠小脑袋在想什么？', 'thoughts'],
];

export default function Hero({ photos, onOpen }) {
  const homeBackground = `${import.meta.env.BASE_URL}photos/home-bg.jpg`;
  const sequencePhotos = [photos[1], photos[11], photos[12]].filter(Boolean);

  return (
    <div className="archive-home">
      <section className="archive-cover" aria-label="BAT 摄影档案首页">
        <img
          className="home-cover-background"
          src={homeBackground}
          alt="Umbravol 首页背景影像"
          width="877"
          height="529"
          fetchPriority="high"
        />
        <aside className="home-left">
          <div className="home-identity">
            <h1>Umbravol</h1>
            <p className="home-edition">Photography Archive</p>
            <p className="home-manifesto">记录那些正在消失的欲望，焦虑，悲伤。</p>
          </div>
          <a className="home-scroll" href="#home-sequence">SCROLL <span>↓</span></a>
        </aside>

        <div className="home-main" aria-hidden="true" />

        <aside className="home-right">
          <nav className="issue-index" aria-label="档案目录">
            {directory.map(([label, target]) => (
              <a href={`#${target}`} key={target}>
                <strong>{label}</strong>
              </a>
            ))}
          </nav>

          <p className="home-signature">are_bure-boke</p>
        </aside>
      </section>

      <section className="sequence-heading" id="home-sequence">
        <span>BAT / VISUAL RECORD</span>
        <p>不断增长的图像记录。没有结论，只有被留下的片段。</p>
        <span>2026—</span>
      </section>

      {sequencePhotos.map((photo, index) => (
        <section className={`archive-plate archive-plate-${index + 1}`} key={photo.id}>
          <button className="plate-primary" type="button" onClick={() => onOpen(photo)}>
            <img
              src={photo.src}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              loading="lazy"
            />
          </button>
          <button
            className="plate-companion"
            type="button"
            onClick={() => onOpen(photos[(index + 5) % photos.length])}
          >
            <img
              src={photos[(index + 5) % photos.length].src}
              alt={photos[(index + 5) % photos.length].title}
              width={photos[(index + 5) % photos.length].width}
              height={photos[(index + 5) % photos.length].height}
              loading="lazy"
            />
          </button>
          <p><span>{String(index + 1).padStart(2, '0')}</span>{photo.location}, {photo.year}</p>
        </section>
      ))}

      <footer className="home-end">
        <span>END OF ISSUE / 001</span>
        <a href="#archive">进入完整档案 →</a>
      </footer>
    </div>
  );
}
