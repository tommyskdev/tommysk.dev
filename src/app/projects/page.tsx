import ProjectsClient from './ProjectsClient';
import { getAllProjects } from '@/lib/data';

export const metadata = {
  title: 'Projects - Tommy SK',
  description: 'Browse my portfolio of web development projects, applications, and designs.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return <ProjectsClient projects={projects} />;
}
