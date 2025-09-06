import React, { useState, useRef, useEffect } from 'react';
import { loadProfileData } from '../services/profileData';
import { streamAIResponse } from '../services/geminiService';
import { SendIcon, UserIcon, SparkleIcon } from './icons/Icons';

// Generate a simple browser fingerprint for user identification
const generateUserFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx?.fillText('Browser fingerprint', 2, 2);
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
};

const STORAGE_KEY = 'ai_chat_user_status';
const MAX_USER_MESSAGES = 5;

interface Message {
  sender: 'user' | 'model';
  text: string;
}

const DEFAULT_EXAMPLE_QUESTIONS = [
  "What are your main backend skills?",
  "Tell me about the AgentDock project.",
  "How many years of experience do you have?",
];

const formatMessageContent = (text: string) => {
    const blocks = text.split(/\n\s*\n/); 

    const parseInline = (line: string): React.ReactNode => {
        const parts = line.split(/(\*\*.*?\*\*)/g).filter(part => part);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="text-sm space-y-3">
            {blocks.map((block, i) => {
                const lines = block.split('\n').filter(line => line.trim() !== '');
                if (lines.length === 0) return null;

                const isUnorderedList = lines.every(line => line.trim().startsWith('* ') || line.trim().startsWith('- '));
                
                if (isUnorderedList) {
                    return (
                        <ul key={i} className="list-disc list-inside space-y-1 pl-2">
                            {lines.map((item, j) => (
                                <li key={j}>{parseInline(item.trim().substring(2))}</li>
                            ))}
                        </ul>
                    );
                }

                return (
                    <p key={i}>
                       {lines.map((line, j) => (
                           <React.Fragment key={j}>
                               {parseInline(line)}
                               {j < lines.length - 1 && <br />}
                           </React.Fragment>
                       ))}
                    </p>
                );
            }).filter(Boolean)}
        </div>
    );
};

interface UserStatus {
  fingerprint: string;
  messageCount: number;
  isBanned: boolean;
  lastActivity: number;
}

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [exampleQuestions, setExampleQuestions] = useState<string[]>(DEFAULT_EXAMPLE_QUESTIONS);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [isUserBanned, setIsUserBanned] = useState(false);
  const [userFingerprint, setUserFingerprint] = useState<string>('');

  // User status management functions
  const getUserStatus = (): UserStatus | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const saveUserStatus = (status: UserStatus) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
    } catch {
      // Handle localStorage errors silently
    }
  };

  const checkUserBanStatus = () => {
    const fingerprint = generateUserFingerprint();
    setUserFingerprint(fingerprint);
    
    const userStatus = getUserStatus();
    
    if (userStatus && userStatus.fingerprint === fingerprint) {
      if (userStatus.isBanned) {
        setIsUserBanned(true);
        setUserMessageCount(userStatus.messageCount);
        return true; // User is banned
      } else {
        setUserMessageCount(userStatus.messageCount);
        return false; // User exists but not banned
      }
    }
    
    // New user or no stored data
    setUserMessageCount(0);
    setIsUserBanned(false);
    return false;
  };

  const banUser = () => {
    const status: UserStatus = {
      fingerprint: userFingerprint,
      messageCount: userMessageCount,
      isBanned: true,
      lastActivity: Date.now()
    };
    saveUserStatus(status);
    setIsUserBanned(true);
  };

  const updateUserMessageCount = (count: number) => {
    setUserMessageCount(count);
    const status: UserStatus = {
      fingerprint: userFingerprint,
      messageCount: count,
      isBanned: count >= MAX_USER_MESSAGES,
      lastActivity: Date.now()
    };
    saveUserStatus(status);
    
    if (count >= MAX_USER_MESSAGES) {
      banUser();
    }
  };

  useEffect(() => {
    // Check user ban status first
    const isBanned = checkUserBanStatus();
    
    (async () => {
      try {
        const data = await loadProfileData();
        if (Array.isArray(data.exampleQuestions) && data.exampleQuestions.length > 0) {
          setExampleQuestions(data.exampleQuestions.slice(0, 6));
        }
        const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');
        
        let greeting: string;
        if (isBanned) {
          greeting = `Thanks for your interest! You've reached the current message limit, but we're upgrading the token capacity soon for unlimited conversations. Feel free to explore the rest of my portfolio!`;
        } else {
          greeting = `Hello! I'm an AI assistant. Feel free to ask me anything about ${fullName}'s professional profile.`;
        }
        
        if (messages.length === 0) {
          setMessages([{ sender: 'model', text: greeting }]);
        }
      } catch (e) {
        if (messages.length === 0) {
          const greeting = isBanned 
            ? `Thanks for your interest! You've reached the current message limit, but we're upgrading the token capacity soon for unlimited conversations. Feel free to explore the rest of my portfolio!`
            : "Hello! I'm an AI assistant. Ask me anything about this professional profile.";
          setMessages([{ sender: 'model', text: greeting }]);
        }
      }
    })();
    chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
    });
  }, [messages, isLoading]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || isUserBanned || userMessageCount >= MAX_USER_MESSAGES) return;

    const userMessage: Message = { sender: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    updateUserMessageCount(userMessageCount + 1);
    setIsLoading(true);
    setError(null);
    
    setMessages(prev => [...prev, { sender: 'model', text: '' }]);

    try {
      await streamAIResponse(
        messageText,
        (chunk) => {
          setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage && lastMessage.sender === 'model') {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = { ...lastMessage, text: lastMessage.text + chunk };
                  return newMessages;
              }
              return prev;
          });
        },
        (errorMessage) => {
          setError(errorMessage);
          setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage && lastMessage.sender === 'model' && lastMessage.text === '') {
                   return prev.slice(0, -1);
              }
              return prev;
          });
        }
      );
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentInput = input;
    if (!currentInput.trim()) return;
    setInput('');
    await sendMessage(currentInput);
  };

  const handleQuestionClick = async (question: string) => {
    if (isLoading || isUserBanned || userMessageCount >= MAX_USER_MESSAGES) return;
    setInput('');
    await sendMessage(question);
  };

  const TypingIndicator = () => (
    <div className="flex items-end gap-3 chat-message">
        <SparkleIcon />
        <div className="flex items-center space-x-1 p-3 bg-gray-800/60 rounded-xl rounded-bl-sm">
            <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></span>
        </div>
    </div>
  );

  return (
    <div className="glass-morphism max-w-4xl mx-auto h-[80vh] flex flex-col shadow-2xl rounded-2xl border-gray-700/50 animate-scale-in" role="region" aria-label="AI chat">
        <div ref={chatContainerRef} className="flex-1 p-6 space-y-6 overflow-y-auto chat-bg" aria-live="polite" aria-relevant="additions text">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-3 chat-message ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'model' && msg.text && <SparkleIcon className="self-start" />}
                {msg.text && (
                    <div className={`max-w-md p-4 rounded-xl shadow-lg ${
                        msg.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-sm' 
                        : 'bg-gray-800/60 backdrop-blur-sm text-gray-300 rounded-bl-sm'
                    }`}>
                      {formatMessageContent(msg.text)}
                    </div>
                )}
                {msg.sender === 'user' && <UserIcon className="self-start" />}
              </div>
            ))}
            {/* FIX: Replaced Array.prototype.at() with bracket notation for broader compatibility. */}
            {isLoading && messages[messages.length - 1]?.sender === 'model' && <TypingIndicator />}
            {error && <div className="text-red-400 text-sm text-center p-3 bg-red-500/10 rounded-lg">{error}</div>}
        </div>
        <div className="p-4 border-t border-white/10 bg-black/20 rounded-b-2xl">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {exampleQuestions.map((q, i) => (
                  <button
                      key={i}
                      onClick={() => handleQuestionClick(q)}
                      disabled={isLoading || isUserBanned || userMessageCount >= MAX_USER_MESSAGES}
                      className="px-4 py-2 text-xs font-mono rounded-full bg-gray-700/30 text-gray-300 border border-gray-600 hover:bg-blue-500/20 hover:border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                      {q}
                  </button>
              ))}
            </div>
            {isUserBanned ? (
              <div className="text-center mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-blue-400 text-sm font-medium">
                  💬 Thanks for chatting!
                </p>
                <p className="text-blue-300 text-xs mt-1">
                  You've reached the current message limit. We're upgrading the token capacity soon - stay tuned for unlimited conversations!
                </p>
              </div>
            ) : userMessageCount >= MAX_USER_MESSAGES ? (
              <div className="text-center mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  You've reached the current limit of {MAX_USER_MESSAGES} messages. Token capacity upgrade coming soon!
                </p>
              </div>
            ) : (
              <div className="text-center mb-4">
                <p className="text-gray-400 text-xs">
                  Messages remaining: {MAX_USER_MESSAGES - userMessageCount}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Token capacity upgrade coming soon!
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isUserBanned ? "Token upgrade coming soon! Explore the portfolio below" : userMessageCount >= MAX_USER_MESSAGES ? "Current limit reached - upgrade coming soon!" : "Ask about my skills, projects, experience..."}
                className="flex-1 w-full px-5 py-3 bg-gray-900/50 text-white border-2 border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                disabled={isLoading || isUserBanned || userMessageCount >= MAX_USER_MESSAGES}
              />
              <button type="submit" disabled={isLoading || !input.trim() || isUserBanned || userMessageCount >= MAX_USER_MESSAGES} className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 transition-transform duration-200">
                <SendIcon />
              </button>
            </form>
        </div>
    </div>
  );
};
