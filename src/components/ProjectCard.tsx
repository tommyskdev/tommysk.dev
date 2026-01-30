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
    <Link href={`/projects/details?id=${project.id}`} className={styles.cardLink}>
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
          <div className={styles.viewProject}>
            <i className="fas fa-arrow-right"></i>
            <span>View Project</span>
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
    </Link>
  );
}
