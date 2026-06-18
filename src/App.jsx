import { useCallback, useEffect, useMemo, useState } from 'react';
import { photos, projects } from './data/photos.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Gallery from './components/Gallery.jsx';
import Projects from './components/Projects.jsx';
import Notes from './components/Notes.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Lightbox from './components/Lightbox.jsx';
import FilmNoise from './components/FilmNoise.jsx';

const pageOrder = ['home', 'archive', 'projects', 'notes', 'about', 'contact'];

function readHash() {
  const clean = window.location.hash.replace('#', '');
  return pageOrder.includes(clean) ? clean : 'home';
}

export default function App() {
  const [page, setPage] = useState(readHash);
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

  const openPhoto = useCallback((photo) => setActivePhotoId(photo.id), []);
  const closePhoto = useCallback(() => setActivePhotoId(null), []);
  const showNext = useCallback(() => {
    setActivePhotoId((currentId) => {
      const index = photos.findIndex((photo) => photo.id === currentId);
      return photos[(index + 1) % photos.length].id;
    });
  }, []);
  const showPrevious = useCallback(() => {
    setActivePhotoId((currentId) => {
      const index = photos.findIndex((photo) => photo.id === currentId);
      return photos[(index - 1 + photos.length) % photos.length].id;
    });
  }, []);
  const openRandom = useCallback(() => {
    const candidates = photos.filter((photo) => photo.id !== activePhotoId);
    openPhoto(candidates[Math.floor(Math.random() * candidates.length)] || photos[0]);
  }, [activePhotoId, openPhoto]);

  const activePhoto = activeIndex >= 0 ? photos[activeIndex] : null;

  return (
    <>
      {page !== 'home' && <Header page={page} onRandom={openRandom} />}
      <main>
        {page === 'home' && <Hero photos={photos} onOpen={openPhoto} />}
        {page === 'archive' && <Gallery photos={photos} onOpen={openPhoto} />}
        {page === 'projects' && <Projects projects={projects} photos={photos} onOpen={openPhoto} />}
        {page === 'notes' && <Notes photos={photos} onOpen={openPhoto} />}
        {page === 'about' && <About />}
        {page === 'contact' && <Contact />}
      </main>
      <Lightbox
        photo={activePhoto}
        current={activeIndex + 1}
        total={photos.length}
        onClose={closePhoto}
        onNext={showNext}
        onPrevious={showPrevious}
      />
      <FilmNoise />
    </>
  );
}
