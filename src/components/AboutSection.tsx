import styles from './AboutSection.module.css';

interface AboutSectionProps {
  content: string;
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>About Me</h2>
        <div className={styles.content}>
          <p>{content}</p>
        </div>
      </div>
    </section>
  );
}
