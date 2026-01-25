'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import styles from './projects.module.css';

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === 'all' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>All Projects</h1>
          <p className={styles.subtitle}>
            A collection of {projects.length} projects I've worked on
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {/* Search */}
          <div className={styles.searchWrapper}>
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={styles.clearBtn}
                aria-label="Clear search"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className={styles.categories}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.categoryBtn} ${
                  selectedCategory === category ? styles.active : ''
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className={styles.resultsInfo}>
          <p>
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div className={styles.grid}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={styles.projectWrapper}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <i className="fas fa-search"></i>
            <h3>No projects found</h3>
            <p>Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className={styles.resetBtn}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
