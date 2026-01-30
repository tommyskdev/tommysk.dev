import Link from 'next/link';
import { getSocialLinks } from '@/lib/data';
import styles from './Footer.module.css';

export default function Footer() {
  const socialLinks = getSocialLinks();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socials}>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={link.name}
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        
        <div className={styles.branding}>
          <Link href="/">tommysk.dev</Link>
        </div>
      </div>
    </footer>
  );
}
