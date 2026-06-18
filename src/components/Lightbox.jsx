import { useEffect } from 'react';

export default function Lightbox({ photo, current, total, onClose, onNext, onPrevious }) {
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
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="关闭">×</button>
      <button className="lightbox-nav lightbox-prev" type="button" onClick={onPrevious} aria-label="上一张">←</button>
      <figure>
        <img src={photo.src} alt={photo.title} width={photo.width} height={photo.height} />
        <figcaption>
          <span>{photo.archiveNo}</span>
          <span>{photo.time} / {photo.location}</span>
          <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </figcaption>
      </figure>
      <button className="lightbox-nav lightbox-next" type="button" onClick={onNext} aria-label="下一张">→</button>
    </div>
  );
}
