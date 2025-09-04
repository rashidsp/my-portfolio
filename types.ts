
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Tab {
  FULLSTACK = 'Fullstack',
  THREE_D = '3D View',
  AI_CHAT = 'AI Chat'
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface Project {
  name: string;
  period?: string;
  description: string[];
  skills: string[];
  link?: string;
  repo?: string;
  imageUrl?: string;
  icon: string;
  stars?: string;
  forks?: string;
  linkText: string;
}

export interface Education {
    institution: string;
    degree: string;
    period: string;
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
}

export interface SectionsConfig {
  showAbout: boolean;
  showExperience: boolean;
  showProjects: boolean;
  showAIChat: boolean;
  showThreeD: boolean;
  showContact: boolean;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  summary: string;
  about: {
    introduction: string;
    paragraphs: string[];
  };
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  skills: string[];
  projectFilters?: string[];
  exampleQuestions?: string[];
  social: {
    github?: string;
    linkedin?: string;
  };
  sections?: Partial<SectionsConfig>;
}