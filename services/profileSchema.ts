import { z } from 'zod';

export const ExperienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  period: z.string(),
  location: z.string(),
  description: z.array(z.string()),
  skills: z.array(z.string()),
});

export const ProjectSchema = z.object({
  name: z.string(),
  period: z.string().optional(),
  description: z.array(z.string()),
  skills: z.array(z.string()),
  link: z.string().url().optional(),
  repo: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  icon: z.string(),
  stars: z.string().optional(),
  forks: z.string().optional(),
  linkText: z.string(),
});

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  period: z.string(),
});

export const CertificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
});

export const SectionsConfigSchema = z.object({
  showAbout: z.boolean(),
  showExperience: z.boolean(),
  showProjects: z.boolean(),
  showAIChat: z.boolean(),
  showThreeD: z.boolean(),
  showContact: z.boolean(),
});

export const ProfileDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  imageUrl: z.string().url().optional(),
  summary: z.string(),
  about: z.object({
    introduction: z.string(),
    paragraphs: z.array(z.string()),
  }),
  experiences: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
  education: z.array(EducationSchema),
  certifications: z.array(CertificationSchema),
  skills: z.array(z.string()),
  projectFilters: z.array(z.string()).optional(),
  exampleQuestions: z.array(z.string()).optional(),
  social: z.object({
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }),
  sections: SectionsConfigSchema.partial().optional(),
});

export type ProfileDataValidated = z.infer<typeof ProfileDataSchema>;

