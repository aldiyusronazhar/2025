import styles from './Projects.module.scss';
import React from 'react';
import type { ProjectData } from './projectsData';

interface ProjectSectionProps {
  project: ProjectData;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ project }) => {
  return (
    <section className={styles.project}>
      <header className={styles.project__header} data-gl-background>
        <div className={styles.project__header__content}>
          <p className={styles.project__header__information} data-gl-text="uppercase">
            {project.subtitle}
          </p>

          <h3 className={styles.project__header__title} data-gl-text="uppercase">
            {project.title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h3>

          <p className={styles.project__header__description} data-gl-text>
            {project.description.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>

        <a
          className={styles.project__header__link}
          data-gl-background-line
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.project__header__link__text} data-gl-text="uppercase">
            {project.client}
          </span>
        </a>
      </header>

      <div className={styles.project__content}>
        {project.images.map((img, index) => (
          <figure key={index} className={styles.project__media}>
            <img
              src={img}
              alt={`${project.title} image ${index + 1}`}
              className={styles.project__media__image}
            />
          </figure>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;

