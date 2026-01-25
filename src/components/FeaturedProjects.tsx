import Link from 'next/link';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import styles from './FeaturedProjects.module.css';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Featured Projects</h2>
            <p className={styles.subtitle}>
              Some of my recent work
            </p>
          </div>
          <Link href="/projects" className={styles.viewAllBtn}>
            View All Projects
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={styles.projectWrapper}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className={styles.empty}>
            <p>No featured projects yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
