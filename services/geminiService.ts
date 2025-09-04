import { GoogleGenAI, Chat } from "@google/genai";
import { loadProfileData } from './profileData';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
if (!GEMINI_API_KEY) {
  console.warn("VITE_GEMINI_API_KEY is not set. AI Chat will be disabled.");
}

const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

const stringifyProfileData = async () => {
  const PROFILE_DATA = await loadProfileData();
  let profileString = `Name: ${PROFILE_DATA.firstName} ${PROFILE_DATA.lastName}\nTitle: ${PROFILE_DATA.title}\nSummary: ${PROFILE_DATA.summary}\n\n`;
  
  const about = PROFILE_DATA.about;
  // FIX: Removed references to 'buildList' and 'buildListTitle' as they do not exist on PROFILE_DATA.about.
  profileString += `About:\n${about.introduction}\n\n${about.paragraphs.join('\n')}\n\n`;

  profileString += "Experience:\n";
  PROFILE_DATA.experiences.forEach(exp => {
    profileString += `- Role: ${exp.role} at ${exp.company} (${exp.period})\n  Description: ${exp.description.join(' ')}\n  Skills: ${exp.skills.join(', ')}\n`;
  });
  profileString += '\n';

  profileString += "Projects:\n";
  PROFILE_DATA.projects.forEach(proj => {
    const periodPart = proj.period ? ` (${proj.period})` : '';
    profileString += `- Name: ${proj.name}${periodPart}\n  Description: ${proj.description.join(' ')}\n  Skills: ${proj.skills.join(', ')}\n`;
  });
  profileString += '\n';

  profileString += "Education:\n";
  PROFILE_DATA.education.forEach(edu => {
    profileString += `- Institution: ${edu.institution}, Degree: ${edu.degree} (${edu.period})\n`;
  });
  profileString += '\n';

  profileString += "Skills:\n" + PROFILE_DATA.skills.join(', ') + '\n';
  
  return profileString;
};

let systemInstruction: string | null = null;
const getSystemInstruction = async (): Promise<string> => {
  if (systemInstruction) return systemInstruction;
  const profile = await stringifyProfileData();
  systemInstruction = `You are a professional and helpful AI assistant for this portfolio website. Your purpose is to answer questions about the professional background, skills, and experience. Your knowledge is strictly limited to the information provided below. Do not invent any information. If a question is outside of this context or about personal details not listed, politely state that you can only answer questions related to the professional profile.

Here is the profile information:
---
${profile}
---
`;
  return systemInstruction;
};

let chat: Chat | null = null;

const initializeChat = async () => {
    if (!chat && ai) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: await getSystemInstruction(),
            },
        });
    }
};

export const streamAIResponse = async (message: string, onChunk: (chunk: string) => void, onError: (error: string) => void) => {
  if (!GEMINI_API_KEY || !ai) {
    onError("The AI assistant is currently unavailable. API key is not configured.");
    return;
  }
  
  try {
    await initializeChat();
    if (chat) {
        const responseStream = await chat.sendMessageStream({ message });
        for await (const chunk of responseStream) {
            onChunk(chunk.text);
        }
    } else {
        throw new Error("Chat initialization failed.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onError("Sorry, I encountered an error while processing your request. Please try again.");
  }
};