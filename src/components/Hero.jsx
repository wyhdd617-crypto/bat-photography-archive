import { useEffect, useRef, useState } from 'react';

const directory = [
  ['档案', 'archive'],
  ['项目', 'projects'],
  ['笔记', 'notes'],
  ['关于', 'about'],
  ['联系', 'contact'],
];

function pickDifferentPhoto(photos, currentId) {
  const availablePhotos = photos.filter((photo) => photo.id !== currentId);
  return availablePhotos[Math.floor(Math.random() * availablePhotos.length)] || photos[0];
}

export default function Hero({ photos, onOpen }) {
  const homeBackground = `${import.meta.env.BASE_URL}photos/home-bg.jpg`;
  const [randomPhoto, setRandomPhoto] = useState(
    () => photos[Math.floor(Math.random() * photos.length)] || photos[0],
  );
  const [previousRandomPhoto, setPreviousRandomPhoto] = useState(null);
  const [randomFrameVersion, setRandomFrameVersion] = useState(0);
  const preparedRandomPhoto = useRef(null);
  const sequencePhotos = [photos[1], photos[11], photos[12]].filter(Boolean);

  useEffect(() => {
    const nextPhoto = pickDifferentPhoto(photos, randomPhoto?.id);
    if (!nextPhoto) return undefined;

    let cancelled = false;
    const preloadImage = new Image();
    preloadImage.src = nextPhoto.src;

    const prepare = preloadImage.decode
      ? preloadImage.decode().catch(() => undefined)
      : new Promise((resolve) => {
          preloadImage.onload = resolve;
          preloadImage.onerror = resolve;
        });

    prepare.then(() => {
      if (!cancelled) preparedRandomPhoto.current = nextPhoto;
    });

    return () => {
      cancelled = true;
    };
  }, [photos, randomPhoto]);

  const changeRandomPhoto = () => {
    if (previousRandomPhoto) return;

    const nextPhoto = preparedRandomPhoto.current || pickDifferentPhoto(photos, randomPhoto?.id);

    if (!nextPhoto) return;

    preparedRandomPhoto.current = null;
    setPreviousRandomPhoto(randomPhoto);
    setRandomPhoto(nextPhoto);
    setRandomFrameVersion((version) => version + 1);
  };

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

          <div className="right-frames">
            <div className="random-frame-heading">
              <span>Random Frame</span>
              <button
                className="randomize-frame"
                type="button"
                onClick={changeRandomPhoto}
                aria-label="Change random photo"
                title="Change random photo"
              >
                <i aria-hidden="true">⇄</i>
              </button>
            </div>
            <button className="random-proof" type="button" onClick={() => onOpen(randomPhoto)}>
              <span className="random-proof-media">
                {previousRandomPhoto && (
                  <img
                    className="random-image random-image-out"
                    src={previousRandomPhoto.src}
                    alt=""
                    width={previousRandomPhoto.width}
                    height={previousRandomPhoto.height}
                    aria-hidden="true"
                  />
                )}
                <img
                  key={randomFrameVersion}
                  className="random-image random-image-in"
                  src={randomPhoto.src}
                  alt={`随机照片 ${randomPhoto.title}`}
                  width={randomPhoto.width}
                  height={randomPhoto.height}
                  onAnimationEnd={() => setPreviousRandomPhoto(null)}
                />
              </span>
              <small>{randomPhoto.archiveNo}</small>
            </button>
          </div>
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
