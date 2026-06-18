import { useMemo, useState } from 'react';

const frames = [
  { className: 'frame frame-a', depth: 18 },
  { className: 'frame frame-b', depth: -12 },
  { className: 'frame frame-c', depth: 9 },
  { className: 'frame frame-d', depth: -6 },
  { className: 'frame frame-e', depth: 14 },
  { className: 'frame frame-f', depth: -10 },
];

function seededShuffle(items) {
  const order = [2, 5, 1, 4, 0, 3];
  const sorted = [...items].sort((a, b) => a.id.localeCompare(b.id));
  return order.map((index) => sorted[index]).filter(Boolean);
}

export default function Hero({ photos, onOpen }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const orderedPhotos = useMemo(() => seededShuffle(photos), [photos]);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <section
      className="hero-page"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="hero-copy" aria-label="BAT 摄影师介绍">
        <p className="kicker">Photographer / Visual Artist</p>
        <h1>BAT</h1>
        <p className="line">Fragments of light, noise and human existence.</p>
      </div>

      <div className="photo-field" aria-label="精选摄影片段">
        {orderedPhotos.map((photo, index) => {
          const frame = frames[index % frames.length];
          const x = pointer.x * frame.depth;
          const y = pointer.y * frame.depth;

          return (
            <button
              className={frame.className}
              key={photo.id}
              type="button"
              onClick={() => onOpen(photo)}
              style={{
                '--shift-x': `${x}px`,
                '--shift-y': `${y}px`,
              }}
              aria-label={`打开作品 ${photo.title}`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                width={photo.width}
                height={photo.height}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            </button>
          );
        })}
      </div>

      <a className="scroll-mark" href="#work" aria-label="打开作品档案">
        作品档案
      </a>
    </section>
  );
}
