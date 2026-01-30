import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getAllProjects, getProjectById } from '@/lib/data';
import type { Project } from '@/types';

import styles from '../projects.module.css';

interface ProjectDetailsPageProps {
  params: {
    id: string;
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ id: project.id }));
}

export function generateMetadata({ params }: ProjectDetailsPageProps): Metadata {
  const project = getProjectById(params.id);

  if (!project) {
    return {
      title: 'Project Not Found - Tommy SK',
    };
  }

  return {
    title: `${project.title} - Tommy SK`,
    description: project.description,
  };
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const project: Project | undefined = getProjectById(params.id);

  if (!project) {
    return notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/projects" className={styles.backButton}>
          <i className="fas fa-arrow-left"></i>
          <span>Back to Projects</span>
        </Link>
      </div>
      <div className={styles.heroShell}>
        <div className={styles.heroImage}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className={styles.heroImageInner}
            sizes="100vw"
          />
        </div>
        <div className={styles.heroScrim}></div>
        <div className={styles.heroOverlay}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.subtitle}>{project.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.detailContent}>
          <div className={`${styles.detailBody} ${styles.popCard}`}>
            {project.longDescription && <p>{project.longDescription}</p>}
            <p>
              Built with modern tooling including Next.js, TypeScript, React, CSS3, Turbopack, and layered glass/gradient styling. It features animated backgrounds, project navigation, and live integrations.
            </p>
          </div>

          <div className={`${styles.detailMeta} ${styles.popCard}`}>
            <h3 className={styles.metaHeading}>Tech used</h3>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            {project.links?.live && (
              <Link href={project.links.live} className={styles.primaryBtn}>
                Visit live site
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
