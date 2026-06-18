import { useEffect } from 'react';

export default function Lightbox({ photo, onClose, onNext, onPrevious }) {
  useEffect(() => {
    if (!photo) return undefined;

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrevious();
    };

    window.addEventListener('keydown', handleKey);
    document.body.classList.add('is-lightbox-open');

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.classList.remove('is-lightbox-open');
    };
  }, [photo, onClose, onNext, onPrevious]);

  if (!photo) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={photo.title}>
      <button className="lightbox-hitarea" type="button" onClick={onClose} aria-label="关闭" />
      <figure>
        <img src={photo.src} alt={photo.title} width={photo.width} height={photo.height} />
        <figcaption>
          <span>{photo.title}</span>
          <span>
            {photo.year} / {photo.location} / {photo.method}
          </span>
        </figcaption>
      </figure>
      <div className="lightbox-controls">
        <button type="button" onClick={onPrevious} aria-label="上一张">
          上一张
        </button>
        <button type="button" onClick={onClose} aria-label="关闭图片">
          关闭
        </button>
        <button type="button" onClick={onNext} aria-label="下一张">
          下一张
        </button>
      </div>
    </div>
  );
}
