export default function Projects({ projects, photos, onOpen }) {
  return (
    <section className="projects-page">
      <header className="page-heading">
        <p>Projects / Ongoing</p>
        <h2>项目不是分类，而是图像之间暂时形成的关系。</h2>
        <span>{String(projects.length).padStart(2, '0')} SEQUENCES</span>
      </header>

      <div className="project-list">
        {projects.map((project) => {
          const projectPhotos = project.photoIds
            .map((id) => photos.find((photo) => photo.id === id))
            .filter(Boolean);
          return (
            <article className="project" key={project.id}>
              <div className="project-copy">
                <span>{project.number}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <time>{project.years}</time>
              </div>
              <div className="project-strip">
                {projectPhotos.map((photo, index) => (
                  <button type="button" key={photo.id} onClick={() => onOpen(photo)}>
                    <img
                      src={photo.src}
                      alt={photo.title}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                    />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
