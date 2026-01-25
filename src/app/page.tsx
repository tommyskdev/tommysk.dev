import Hero from '@/components/Hero';
import DiscordSection from '@/components/DiscordSection';
import GitHubSection from '@/components/GitHubSection';
import AboutSection from '@/components/AboutSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import { getPersonalInfo, getSocialLinks, getFeaturedProjects, getAboutContent } from '@/lib/data';
import styles from './IntegrationsGrid.module.css';

export default function Home() {
  // Load data
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();
  const featuredProjects = getFeaturedProjects();
  const aboutContent = getAboutContent();

  // Get IDs from environment or use placeholders
  const discordUserId = process.env.NEXT_PUBLIC_DISCORD_USER_ID || '123456789012345678';
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'tommyskdev';

  return (
    <>
      <Hero 
        personalInfo={personalInfo} 
        socialLinks={socialLinks} 
      />
      
      <div className={styles.grid}>
        <DiscordSection userId={discordUserId} />
        <GitHubSection username={githubUsername} />
      </div>
      
      <AboutSection content={aboutContent} />
      
      <FeaturedProjects projects={featuredProjects} />
    </>
  );
}
