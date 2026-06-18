import { useEffect, useMemo, useState } from 'react';
import { categories, photos } from './data/photos.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Gallery from './components/Gallery.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Lightbox from './components/Lightbox.jsx';
import FilmNoise from './components/FilmNoise.jsx';

const pageOrder = ['home', 'work', 'about', 'contact'];

function readHash() {
  const clean = window.location.hash.replace('#', '');
  return pageOrder.includes(clean) ? clean : 'home';
}

export default function App() {
  const [page, setPage] = useState(() => readHash());
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePhotoId, setActivePhotoId] = useState(null);

  useEffect(() => {
    const handleHash = () => setPage(readHash());
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    document.body.dataset.page = page;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [page]);

  const activeIndex = useMemo(
    () => photos.findIndex((photo) => photo.id === activePhotoId),
    [activePhotoId],
  );

  const openPhoto = (photo) => setActivePhotoId(photo.id);
  const closePhoto = () => setActivePhotoId(null);
  const showNext = () => setActivePhotoId(photos[(activeIndex + 1) % photos.length].id);
  const showPrevious = () =>
    setActivePhotoId(photos[(activeIndex - 1 + photos.length) % photos.length].id);

  const activePhoto = activeIndex >= 0 ? photos[activeIndex] : null;

  return (
    <>
      <Header page={page} />
      <main>
        {page === 'home' && <Hero photos={photos.slice(0, 6)} onOpen={openPhoto} />}
        {page === 'work' && (
          <Gallery
            photos={photos}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onOpen={openPhoto}
          />
        )}
        {page === 'about' && <About />}
        {page === 'contact' && <Contact />}
      </main>
      <Lightbox
        photo={activePhoto}
        onClose={closePhoto}
        onNext={showNext}
        onPrevious={showPrevious}
      />
      <FilmNoise />
    </>
  );
}
