'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={styles.overlay}>
          <div className={styles.links}>
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fab fa-github"></i>
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fas fa-play"></i>
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        
        <div className={styles.tags}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className={styles.tag}>+{project.tags.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
}
