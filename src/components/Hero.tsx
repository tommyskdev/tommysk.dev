'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PersonalInfo, SocialLink } from '@/types';
import styles from './Hero.module.css';

interface HeroProps {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
}

export default function Hero({ personalInfo, socialLinks }: HeroProps) {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const time = new Intl.DateTimeFormat('en-US', {
        timeZone: personalInfo.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());
      setCurrentTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [personalInfo.timezone]);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left: Profile Photo */}
          <div className={styles.profileWrapper}>
            <Image
              src={personalInfo.avatar}
              alt={personalInfo.name}
              width={120}
              height={120}
              className={styles.profilePhoto}
              priority
            />
          </div>

          {/* Middle: Text Info */}
          <div className={styles.info}>
            <h1 className={styles.name}>{personalInfo.name}</h1>
            <p className={styles.title}>{personalInfo.title}</p>
            
            {personalInfo.available && (
              <div className={styles.status}>
                <span className={styles.statusDot}></span>
                <span>Open for opportunities</span>
              </div>
            )}

            <div className={styles.locationTime}>
              <div className={styles.location}>
                <i className="fas fa-map-marker-alt"></i>
                <span>{personalInfo.location}</span>
              </div>
              <span className={styles.time}>{currentTime || '--:--'}</span>
            </div>
          </div>

          {/* Right: Social Links Panel */}
          <div className={styles.socialPanel}>
            <h3>Connect</h3>
            <div className={styles.socialLinks}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <i className={link.icon}></i>
                  <span>{link.username || link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
