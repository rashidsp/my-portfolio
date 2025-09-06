import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { loadProfileData, getSectionsConfig } from '../services/profileData';
import { generatePdf } from '../services/pdfService';
import { Project } from '../types';
const AIChat = lazy(() => import('./AIChat').then(m => ({ default: m.AIChat })));
const ThreeScene = lazy(() => import('./ThreeScene').then(m => ({ default: m.ThreeScene })));


export const Portfolio: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [resumeBlink, setResumeBlink] = useState(false);
    const [profileFirstName, setProfileFirstName] = useState('');
    const [profileLastName, setProfileLastName] = useState('');
    const [profileSummary, setProfileSummary] = useState('');
    const [profileTitle, setProfileTitle] = useState('');
    const [profileSubtitle, setProfileSubtitle] = useState('');
    const [about, setAbout] = useState<{ introduction: string; paragraphs: string[] }>({ introduction: '', paragraphs: [] });
    const [experiences, setExperiences] = useState<any[]>([]);
    const [social, setSocial] = useState<{ github?: string; linkedin?: string }>({});
    const [sections, setSections] = useState(getSectionsConfig({} as any));
    const [projectFilters, setProjectFilters] = useState<string[]>(["all"]);
    const [skills, setSkills] = useState<string[]>([]);
    
    // Animation and effects logic
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
      
        const typeWriter = () => {
          const text = profileSubtitle || profileSummary || '';
          const element = document.getElementById("typingText");
          if (!element) return;
      
          let i = 0;
          element.textContent = "";
      
          function type() {
            if (i < text.length) {
              (element as HTMLElement).textContent += text.charAt(i);
              i++;
              timeoutId = setTimeout(type, 50);
            }
          }
          timeoutId = setTimeout(type, 1000);
        };
      
        typeWriter();
      
        return () => {
          clearTimeout(timeoutId); // cleanup prevents double typing
        };
      }, [profileSubtitle, profileSummary]);

    useEffect(() => {
        (async () => {
            const data = await loadProfileData();
            setProjects(data.projects);
            setProfileFirstName(data.firstName);
            setProfileLastName(data.lastName);
            setProfileSummary(data.summary);
            setProfileTitle(data.title);
            setProfileSubtitle(data.subtitle ?? '');
            setAbout(data.about);
            setExperiences(data.experiences as any[]);
            setSocial(data.social);
            setSkills(data.skills);
            setSections(getSectionsConfig(data));
            const derived = Array.from(new Set(data.projects.flatMap(p => p.skills.map(s => s.toLowerCase()))));
            const filters = ["all", ...(data.projectFilters ?? derived).slice(0, 12)];
            setProjectFilters(filters);
            setLoadingProjects(false);
        })();
    }, []);
    
    // Trigger Resume button blink on mount
    useEffect(() => {
        setResumeBlink(true);
        const timeoutId = setTimeout(() => setResumeBlink(false), 4000);
        return () => clearTimeout(timeoutId);
    }, []);
      
    
    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") {
          return projects;
        }
        return projects.filter(p =>
          p.skills.some(skill => skill.toLowerCase().includes(activeFilter.toLowerCase()))
        );
    }, [activeFilter, projects]);
      

    const handleDownloadRequest = () => {
        const resumeContent = document.getElementById('resume-content');
        if (resumeContent) {
            generatePdf();
        } else {
            alert('Resume content not found for PDF generation.');
        }
    };

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const getRoleDetails = (index: number) => {
        switch(index) {
            case 0: return { class: 'current-role', icon: '🚀', status: 'ACTIVE', color: 'green', duration: '2+ years', metrics: { type: 'skills' as const, val1: '5+', val2: '5', val3: '10+' } };
            case 1: return { class: 'senior-role', icon: '💎', status: 'COMPLETED', color: 'yellow', duration: '4.8 years', metrics: { type: 'skills' as const, val1: '3+', val2: '100+', val3: '8+' } };
            case 2: return { class: 'junior-role', icon: '🌱', status: 'FOUNDATION', color: 'blue', duration: '1.8 years', metrics: { type: 'skills' as const, val1: '2+', val2: '2', val3: '5+' } };
            default: return { class: 'junior-role', icon: '🌱', status: 'FOUNDATION', color: 'blue', duration: '1.1 years', metrics: { type: 'skills' as const, val1: '3+', val2: 'N/A', val3: '5+' } };
        }
    };

    const techColors: Record<string, string> = {
        python: 'bg-blue-500/20 text-blue-400',
        typescript: 'bg-blue-500/20 text-blue-400',
        postgresql: 'bg-blue-500/20 text-blue-400',
        'open source': 'bg-blue-500/20 text-blue-400',
        rspec: 'bg-green-500/20 text-green-400',
        'node.js': 'bg-green-500/20 text-green-400',
        'ruby on rails': 'bg-green-500/20 text-green-400',
        django: 'bg-green-500/20 text-green-400',
      
        react: 'bg-cyan-500/20 text-cyan-400',
      
        'ai/ml': 'bg-purple-500/20 text-purple-400',
        unity: 'bg-purple-500/20 text-purple-400',
        enterprise: 'bg-purple-500/20 text-purple-400',
        pandas: 'bg-purple-500/20 text-purple-400',
        'socket.io': 'bg-purple-500/20 text-purple-400',
      
        'three.js': 'bg-yellow-500/20 text-yellow-400',
        'd3.js': 'bg-yellow-500/20 text-yellow-400',
      
        webgl: 'bg-red-500/20 text-red-400',
        ruby: 'bg-red-500/20 text-red-400',
        redis: 'bg-red-500/20 text-red-400',
    };
      
    const getTechTagClass = (tech: string) => {
    return techColors[tech.toLowerCase()] ?? 'bg-gray-500/20 text-gray-400';
    };
      
    const styleAboutText = (text: string) => {
        const escapeHtml = (str: string) =>
            str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');

        let html = escapeHtml(text);

        const replacements: Array<[RegExp, string]> = [
            [/full-stack engineer/gi, '<span class="text-blue-400 font-semibold">$&</span>'],
            [/technical leader/gi, '<span class="text-purple-400 font-semibold">$&</span>'],
            [/clean code/gi, '<span class="text-blue-400 font-semibold">$&</span>'],
            [/innovative design/gi, '<span class="text-purple-400 font-semibold">$&</span>'],
            [/collaborative teamwork/gi, '<span class="text-green-400 font-semibold">$&</span>'],
            [/Optimizely/gi, '<span class="text-green-400 font-semibold">$&</span>'],
            [/#1 Top Contributor/gi, '<span class="text-yellow-400 font-semibold">$&</span>'],
            [/AgentDock/gi, '<span class="text-pink-400 font-semibold">$&</span>'],
            [/AI orchestration platform/gi, '<span class="text-pink-400">$&</span>'],
            [/3D experiences?/gi, '<span class="text-cyan-400">$&</span>'],
            [/Ruby SDK/gi, '<span class="text-red-400">$&</span>']
        ];

        for (const [pattern, replacement] of replacements) {
            html = html.replace(pattern, replacement);
        }

        return { __html: html };
    };


    return (
        <main className="pt-16 lg:pt-0 lg:ml-20">
            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
                 <div className="matrix-bg" id="matrixBg"></div>
                 <div className="floating-icons">
                    <div className="floating-icon" style={{ top: '10%', left: '10%', animationDelay: '0s' }}>⚛️</div>
                    <div className="floating-icon" style={{ top: '20%', right: '15%', animationDelay: '2s' }}>🐍</div>
                    <div className="floating-icon" style={{ top: '60%', left: '5%', animationDelay: '4s' }}>💎</div>
                    <div className="floating-icon" style={{ bottom: '20%', right: '10%', animationDelay: '6s' }}>☁️</div>
                    <div className="floating-icon" style={{ top: '40%', right: '5%', animationDelay: '8s' }}>🤖</div>
                </div>
                <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
                    <div className="terminal-window mb-8 max-w-2xl mx-auto animate-scale-in rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-gray-400 text-sm font-mono">{(profileFirstName || 'user').toLowerCase()}@portfolio:~$</span>
                        </div>
                        <div className="p-6 text-left min-h-[70px]">
                            <div className="text-green-400 font-mono text-sm mb-2">
                                <span className="text-blue-400">$</span> whoami
                            </div>
                            <div className="text-white font-mono text-sm mb-4">
                                <span id="typingText"></span><span className="animate-terminal-cursor">|</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 animate-slide-in-left">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            {[profileFirstName, profileLastName].filter(Boolean).join(' ')}
                        </span>
                    </h1>
                    
                    {profileTitle && (
                    <div className="text-xl md:text-2xl mb-8 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                        <span className="text-gray-300">{profileTitle}</span>
                    </div>
                    )}

                    <p className="text-lg text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-scale-in" style={{ animationDelay: '0.6s' }}>
                        {profileSummary}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 animate-scale-in" style={{ animationDelay: '0.9s' }}>
                        <div className="text-center">
                            <div className="stats-counter" data-target={`${experiences.length}`}>{experiences.length}</div>
                            <div className="text-gray-400">Experience Entries</div>
                        </div>
                        <div className="text-center">
                            <div className="stats-counter" data-target={`${projects.length}`}>{projects.length}</div>
                            <div className="text-gray-400">Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="stats-counter" data-target={`${projects.filter(p=>p.repo).length}`}>{projects.filter(p=>p.repo).length}</div>
                            <div className="text-gray-400">Open Source Repos</div>
                        </div>
                        <div className="text-center">
                            <div className="stats-counter" data-target={`${skills.length}`}>{skills.length}</div>
                            <div className="text-gray-400">Skills</div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in" style={{ animationDelay: '1.2s' }}>
                        <a href="#ai-chat" onClick={(e) => handleScrollTo(e, 'ai-chat')} className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-black transition-all duration-300 hover:scale-105">
                            Explore My Work
                        </a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`group relative px-10 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-110 shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/50 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white ${resumeBlink ? 'animate-resume-blink' : ''}`}>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                📄 Resume
                            </span>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600"></div>
                        </a>
                    </div>
                </div>
            </section>
            {/* Local style for resume blink animation */}
            <style>{`
                @keyframes resume-blink {
                    0%, 100% { opacity: 1; filter: drop-shadow(0 0 0 rgba(59,130,246,0)); }
                    50% { opacity: 0.3; filter: drop-shadow(0 0 12px rgba(59,130,246,0.7)); }
                }
                .animate-resume-blink {
                    animation: resume-blink 0.6s steps(1, end) 6;
                }
            `}</style>
            
            <div id="resume-content">
                {sections.showAbout && (
                <section id="about" className="py-20 relative">
                  <div className="max-w-7xl mx-auto px-6">
                      <h2 className="text-5xl font-black text-center mb-16">
                          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">About Me</span>
                      </h2>
                      
                      <div className="grid lg:grid-cols-2 gap-16 items-stretch">
                          <div className="animate-slide-in-left h-full">
                              <div className="code-editor h-full">
                                  <div className="flex items-center justify-between bg-gray-800 px-4 py-3">
                                      <div className="flex space-x-2">
                                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                      </div>
                                      <span className="text-gray-400 text-sm">profile.ts</span>
                                  </div>
                                  <div className="p-6 font-mono text-sm">
                                      <div className="text-purple-400">const <span className="text-blue-400">profile</span> = &#123;</div>
                                      <div className="ml-4 text-gray-300">
                                          <div><span className="text-green-400">firstName</span>: <span className="text-yellow-400">'{profileFirstName}'</span>,</div>
                                          <div><span className="text-green-400">lastName</span>: <span className="text-yellow-400">'{profileLastName}'</span>,</div>
                                          {profileTitle && (<div><span className="text-green-400">title</span>: <span className="text-yellow-400">'{profileTitle}'</span>,</div>)}
                                          {profileSubtitle && (<div><span className="text-green-400">subtitle</span>: <span className="text-yellow-400">'{profileSubtitle}'</span>,</div>)}
                                          <div><span className="text-green-400">topSkills</span>: [</div>
                                          <div className="ml-4">
                                              {skills.slice(0,4).map((s, i) => (
                                                <div key={s}><span className="text-yellow-400">'{s}'</span>{i < Math.min(4, skills.length) - 1 ? ',' : ''}</div>
                                              ))}
                                          </div>
                                          <div>]</div>
                                      </div>
                                      <div className="text-purple-400">&#125;;</div>
                                  </div>
                              </div>
                          </div>

                          <div className="animate-slide-in-right h-full">
                              <div className="space-y-6 text-lg text-gray-300 leading-relaxed h-full">
                                  <p style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={styleAboutText(about.introduction)} />
                                  {about.paragraphs.map((p, i) => (
                                      <p key={i} style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={styleAboutText(p)} />
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
                </section>
                )}

                {sections.showExperience && (
                <section id="experience" className="py-16 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="floating-code-bg">
                            <div className="code-snippet" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>git commit -m "career++;"</div>
                            <div className="code-snippet" style={{ top: '30%', right: '10%', animationDelay: '2s' }}>while(learning) &#123; grow(); &#125;</div>
                        </div>
                    </div>
                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-black mb-4">
                                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Experience Journey</span>
                            </h2>
                            <p className="text-gray-400 font-mono">
                                <span className="text-green-400">[INFO]</span> {experiences.length}+ roles contributing to impactful software
                            </p>
                        </div>
                        <div className="space-y-8">
                            {experiences.map((exp, index) => {
                                const details = getRoleDetails(index);
                                return (
                                <div key={index} className="group">
                                    <div className={`experience-card ${details.class}`}>
                                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                            {/* Left: Role Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                    {details.color === 'green' && <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>}
                                                    {details.color === 'yellow' && <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>}
                                                    {details.color === 'blue' && <div className="w-3 h-3 bg-blue-400 rounded-full"></div>}
                                                    
                                                    <span className={`font-mono text-xs ${
                                                        details.color === 'green' ? 'text-green-400' :
                                                        details.color === 'yellow' ? 'text-yellow-400' : 'text-blue-400'
                                                    }`}>{details.status}</span>
                                                    
                                                    <span className="text-blue-400 font-mono text-sm">{exp.period}</span>
                                                    
                                                    <span className={`px-2 py-1 rounded text-xs ${
                                                        details.color === 'green' ? 'bg-green-500/20 text-green-400' :
                                                        details.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                                                    }`}>{details.duration}</span>
                                                </div>
                                                
                                                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                                                    <span className="mr-2 text-2xl">{details.icon}</span>
                                                    {exp.role}
                                                </h3>
                                                <p className="text-purple-400 font-mono mb-3">
                                                    <span className="text-gray-500">@</span> {exp.company}
                                                </p>
                                                
                                                <div className="flex flex-wrap gap-1 mb-3">
                                                  {exp.skills.slice(0, 5).map((skill: string) => <span key={skill} className="tech-tag bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">{skill}</span>)}
                                                </div>
                                            </div>
                                            
                                            {/* Right: Key Highlights & Metrics */}
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-400 mb-2 font-mono">// Key Highlights:</div>
                                                <ul className="space-y-1 text-sm">
                                                    {exp.description.map((desc: string, i: number) => (
                                                        <li key={i} className="flex items-start">
                                                            <span className="text-green-400 mr-2 mt-0.5">✓</span>
                                                            <span className="text-gray-300">{desc}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                
                                                {/* Compact Metrics */}
                                                <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-gray-700">
                                                    <div className="text-center">
                                                        <div className={`text-lg font-bold ${details.color === 'yellow' ? 'text-yellow-400' : 'text-blue-400'}`}>{details.metrics.val1}</div>
                                                        <div className="text-xs text-gray-400">Projects</div>
                                                    </div>
                                
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-purple-400">{details.metrics.val3}</div>
                                                        <div className="text-xs text-gray-400">
                                                            Skills
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
                )}

                {sections.showProjects && (
                <section id="projects" className="py-20 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-5xl font-black text-center mb-16">
                            <span className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">Featured Projects</span>
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {projectFilters.map(filter => (
                                <button key={filter} onClick={() => setActiveFilter(filter)} className={`filter-btn px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${activeFilter === filter ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white'}`}>
                                   {filter === 'all' ? 'All Projects' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {loadingProjects ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="project-card rounded-2xl p-8 group animate-pulse">
                                        <div className="h-16 w-16 bg-gray-700/50 rounded-lg mb-6"></div>
                                        <div className="h-8 w-3/4 bg-gray-700/50 rounded mb-4"></div>
                                        <div className="h-4 w-full bg-gray-700/50 rounded mb-2"></div>
                                        <div className="h-4 w-5/6 bg-gray-700/50 rounded mb-6"></div>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            <div className="h-6 w-16 bg-gray-700/50 rounded-full"></div>
                                            <div className="h-6 w-20 bg-gray-700/50 rounded-full"></div>
                                            <div className="h-6 w-12 bg-gray-700/50 rounded-full"></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                filteredProjects.map(proj => (
                                    <div key={proj.name} className="project-card rounded-2xl p-8 group">
                                        <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{proj.icon}</div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{proj.name}</h3>
                                        <p className="text-gray-300 mb-6 leading-relaxed">
                                            {proj.description.join(' ')}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {proj.skills.map(skill => (
                                                <span key={skill} className={`px-3 py-1 rounded-full text-sm font-mono ${getTechTagClass(skill)}`}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <a href={proj.repo || proj.link || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                                {proj.linkText}
                                            </a>
                                            {(proj.stars || proj.forks) && (
                                                <div className="flex space-x-3">
                                                    {proj.stars && <span className="text-yellow-400">⭐ {proj.stars}</span>}
                                                    {proj.forks && <span className="text-green-400">🍴 {proj.forks}</span>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
                )}
            </div>

            {sections.showAIChat && (
            <section id="ai-chat" className="py-20 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-5xl font-black text-center mb-16">
                        <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">AI Profile Assistant</span>
                    </h2>
                    <p className="text-center text-gray-400 -mt-8 mb-12">Ask my AI assistant anything about my professional profile! Powered by Gemini.</p>
                    <Suspense fallback={<div className="text-center text-gray-400">Loading assistant…</div>}>
                        <AIChat />
                    </Suspense>
                </div>
            </section>
            )}

            {sections.showThreeD && (
            <section id="three-d" className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                     <h2 className="text-5xl font-black text-center mb-16">
                        <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">3D Showcase</span>
                    </h2>
                    <p className="text-center text-gray-400 -mt-8 mb-12">An immersive experience is currently under construction. Drag to interact!</p>
                    <Suspense fallback={<div className="h-[70vh] flex items-center justify-center text-gray-400">Loading 3D scene…</div>}>
                        <ThreeScene />
                    </Suspense>
                </div>
            </section>
            )}

            {/* Contact Section */}
            {sections.showContact && (
            <section id="contact" className="py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-5xl font-black mb-8">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Let's Build Something Amazing</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                        Ready to transform your ideas into reality? Let's collaborate on your next groundbreaking project.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                        <a href={social.linkedin ? social.linkedin : '#'} target={social.linkedin ? '_blank' : undefined} rel={social.linkedin ? 'noopener noreferrer' : undefined} className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105">
                            <span className="relative z-10 flex items-center justify-center">
                                📧 Get In Touch
                            </span>
                        </a>
                        <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-black transition-all duration-300 hover:scale-105">
                            📄 Download Resume
                        </a>
                    </div>
                    <div className="flex justify-center space-x-8">
                        <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-4xl hover:text-blue-400 transition-colors hover:scale-110 transform">
                            <svg role="img" viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 0 1 2.063-2.065 2.064 2.064 0 0 1 2.063 2.065c0 1.14-.925 2.065-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                        </a>
                        <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-4xl hover:text-purple-400 transition-colors hover:scale-110 transform">
                            <svg role="img" viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                        </a>
                    </div>
                </div>
            </section>
            )}
            
            <footer className="border-t border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-gray-400 font-mono">
                        <span className="text-blue-400">&lt;</span>
                        Crafted with passion and precision by {[profileFirstName, profileLastName].filter(Boolean).join(' ')}
                        <span className="text-blue-400">/&gt;</span>
                    </p>
                </div>
            </footer>
        </main>
    )
};