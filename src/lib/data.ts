import { Project, SocialLink, PersonalInfo } from '@/types';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src/data');

export function getPersonalInfo(): PersonalInfo {
  const filePath = path.join(dataDir, 'personal.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getSocialLinks(): SocialLink[] {
  const filePath = path.join(dataDir, 'socials.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getAllProjects(): Project[] {
  const projectsDir = path.join(dataDir, 'projects');
  const files = fs.readdirSync(projectsDir);
  
  const projects = files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const filePath = path.join(projectsDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents) as Project;
    });
  
  return projects.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(project => project.featured);
}

export function getProjectById(id: string): Project | undefined {
  const projectsDir = path.join(dataDir, 'projects');
  const filePath = path.join(projectsDir, `${id}.json`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch {
    return undefined;
  }
}

export function getProjectsByCategory(category: string): Project[] {
  return getAllProjects().filter(project => project.category === category);
}

export function getAboutContent(): string {
  const filePath = path.join(dataDir, 'about.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.content;
}
