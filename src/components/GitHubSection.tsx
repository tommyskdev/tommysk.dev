'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './GitHubSection.module.css';

interface GitHubData {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  blog?: string;
  location?: string;
  company?: string;
}

interface GitHubSectionProps {
  username: string;
}

export default function GitHubSection({ username }: GitHubSectionProps) {
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [stats, setStats] = useState({ stars: 0, commits: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        setGithub(userData);

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await reposResponse.json();
        
        if (Array.isArray(repos)) {
          const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
          setStats({ stars: totalStars, commits: 0 });
        }

        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchGitHub();
  }, [username]);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.loading}>
              <i className="fab fa-github"></i>
              <p>Loading GitHub stats...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!github) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.header}>
              <i className="fab fa-github"></i>
              <h3>GitHub</h3>
            </div>
            <p className={styles.error}>GitHub data unavailable</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <a
          href={github.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
        >
          <div className={styles.card}>
          <div className={styles.header}>
            <i className="fab fa-github"></i>
            <h3>GitHub Profile</h3>
          </div>

          <div className={styles.profile}>
            <Image
              src={github.avatar_url}
              alt={github.login}
              width={80}
              height={80}
              className={styles.avatar}
            />

            <div className={styles.userInfo}>
              <h4 className={styles.name}>{github.name || github.login}</h4>
              <p className={styles.username}>@{github.login}</p>
              {github.bio && <p className={styles.bio}>{github.bio}</p>}
              {github.location && (
                <p className={styles.meta}>
                  <i className="fas fa-map-marker-alt"></i>
                  {github.location}
                </p>
              )}
              {github.company && (
                <p className={styles.meta}>
                  <i className="fas fa-building"></i>
                  {github.company}
                </p>
              )}
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <i className="fas fa-code-branch"></i>
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>{github.public_repos}</p>
                <p className={styles.statLabel}>Repositories</p>
              </div>
            </div>

            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <i className="fas fa-star"></i>
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>{stats.stars}</p>
                <p className={styles.statLabel}>Total Stars</p>
              </div>
            </div>

            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <i className="fas fa-users"></i>
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>{github.followers}</p>
                <p className={styles.statLabel}>Followers</p>
              </div>
            </div>

            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <i className="fas fa-user-friends"></i>
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>{github.following}</p>
                <p className={styles.statLabel}>Following</p>
              </div>
            </div>
          </div>
          </div>
        </a>
      </div>
    </section>
  );
}
