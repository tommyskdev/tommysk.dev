import styles from './AboutSection.module.css';

interface AboutSectionProps {
  content: string;
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.titleSection}>
            <div className={styles.iconWrapper}>
              <i className="fas fa-user-circle"></i>
            </div>
            <h2 className={styles.title}>About Me</h2>
            <p className={styles.subtitle}>A bit about who I am and what I do</p>
          </div>
          
          <div className={styles.content}>
            <div className={styles.textWrapper}>
              <p className={styles.text}>{content}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
