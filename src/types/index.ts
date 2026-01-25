export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  category: 'web' | 'mobile' | 'design' | 'other';
  featured: boolean;
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  date?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  timezone: string;
  avatar: string;
  available: boolean;
}
