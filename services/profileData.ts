import { ProfileData } from '../types';
import { ProfileDataSchema, ProfileDataValidated } from './profileSchema';

let cachedData: ProfileDataValidated | null = null;

export const loadProfileData = async (): Promise<ProfileDataValidated> => {
  if (cachedData) return cachedData;
  // For now, we import the example JSON-like module (TS file) statically.
  const { default: data } = await import('../data/profile.example');
  const parsed = ProfileDataSchema.safeParse(data as ProfileData);
  if (!parsed.success) {
    const message = parsed.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ');
    throw new Error(`Invalid profile data: ${message}`);
  }
  cachedData = parsed.data;
  return cachedData;
};

export const getSectionsConfig = (data: ProfileDataValidated) => {
  return {
    showAbout: data.sections?.showAbout ?? true,
    showExperience: data.sections?.showExperience ?? true,
    showProjects: data.sections?.showProjects ?? true,
    showAIChat: data.sections?.showAIChat ?? true,
    showThreeD: data.sections?.showThreeD ?? true,
    showContact: data.sections?.showContact ?? true,
  };
};

