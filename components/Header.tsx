import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home');

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'experience', 'projects', 'ai-chat', 'three-d', 'contact'];
            const scrollPos = window.scrollY + window.innerHeight / 2;
            
            let newActiveSection = '';
            // Find which section is in the middle of the viewport
            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                        newActiveSection = sectionId;
                        break;
                    }
                }
            }
            
            if (newActiveSection) {
                setActiveSection(newActiveSection);
            } else if (window.scrollY < window.innerHeight / 2) {
                 // If scrolled near the top of the page, default to 'home'
                 setActiveSection('home');
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Run on initial load

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 w-20 hover:w-64 transition-all duration-300" id="sidebar" aria-label="Section navigation">
            <div className="glass-morphism rounded-2xl p-4 mb-6 text-center">
                <div className="text-xl font-bold font-mono mb-2">
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-white">RS</span>
                    <span className="text-blue-400">/&gt;</span>
                </div>
                <div className="text-xs text-gray-400 font-mono">v2.0.1</div>
            </div>
            <div className="glass-morphism rounded-2xl p-4 space-y-4">
                <a href="#home" aria-current={activeSection === 'home' ? 'page' : undefined} onClick={(e) => handleLinkClick(e, 'home')} className={`nav-link group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-blue-500/20 ${activeSection === 'home' ? 'active' : ''}`}>
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-500/20 rounded-lg group-hover:bg-blue-500/40 transition-colors">
                        <span className="text-blue-400 text-sm">🏠</span>
                    </div>
                    <div className="hidden group-hover:block whitespace-nowrap">
                        <div className="text-white text-sm font-medium">Home</div>
                        <div className="text-gray-400 text-xs font-mono">index.html</div>
                    </div>
                </a>
                <a href="#about" aria-current={activeSection === 'about' ? 'page' : undefined} onClick={(e) => handleLinkClick(e, 'about')} className={`nav-link group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-green-500/20 ${activeSection === 'about' ? 'active' : ''}`}>
                    <div className="w-8 h-8 flex items-center justify-center bg-green-500/20 rounded-lg group-hover:bg-green-500/40 transition-colors">
                        <span className="text-green-400 text-sm">👨‍💻</span>
                    </div>
                    <div className="hidden group-hover:block whitespace-nowrap">
                        <div className="text-white text-sm font-medium">About</div>
                        <div className="text-gray-400 text-xs font-mono">profile.js</div>
                    </div>
                </a>
                <a href="#experience" aria-current={activeSection === 'experience' ? 'page' : undefined} onClick={(e) => handleLinkClick(e, 'experience')} className={`nav-link group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-purple-500/20 ${activeSection === 'experience' ? 'active' : ''}`}>
                    <div className="w-8 h-8 flex items-center justify-center bg-purple-500/20 rounded-lg group-hover:bg-purple-500/40 transition-colors">
                        <span className="text-purple-400 text-sm">📈</span>
                    </div>
                    <div className="hidden group-hover:block whitespace-nowrap">
                        <div className="text-white text-sm font-medium">Experience</div>
                        <div className="text-gray-400 text-xs font-mono">career.json</div>
                    </div>
                </a>
                <a href="#projects" aria-current={activeSection === 'projects' ? 'page' : undefined} onClick={(e) => handleLinkClick(e, 'projects')} className={`nav-link group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-yellow-500/20 ${activeSection === 'projects' ? 'active' : ''}`}>
                    <div className="w-8 h-8 flex items-center justify-center bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/40 transition-colors">
                        <span className="text-yellow-400 text-sm">🚀</span>
                    </div>
                    <div className="hidden group-hover:block whitespace-nowrap">
                        <div className="text-white text-sm font-medium">Projects</div>
                        <div className="text-gray-400 text-xs font-mono">portfolio.tsx</div>
                    </div>
                </a>
                <a href="#ai-chat" aria-current={activeSection === 'ai-chat' ? 'page' : undefined} onClick={(e) => handleLinkClick(e, 'ai-chat')} className={`nav-link group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-red-500/20 ${activeSection === 'ai-chat' ? 'active' : ''}`}>
                    <div className="w-8 h-8 flex items-center justify-center bg-red-500/20 rounded-lg group-hover:bg-red-500/40 transition-colors">
                        <span className="text-red-400 text-sm">🤖</span>
                    </div>
                    <div className="hidden group-hover:block whitespace-nowrap">
                        <div className="text-white text-sm font-medium">AI Chat</div>
                        <div className="text-gray-400 text-xs font-mono">gemini.api</div>
                    </div>
                </a>
                <a href="#three-d" aria-current={activeSection === 'three-d' ? 'page' : undefined} onClick={(e) => handleLinkClick(e, 'three-d')} className={`nav-link group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-cyan-500/20 ${activeSection === 'three-d' ? 'active' : ''}`}>
                    <div className="w-8 h-8 flex items-center justify-center bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/40 transition-colors">
                        <span className="text-cyan-400 text-sm">🧊</span>
                    </div>
                    <div className="hidden group-hover:block whitespace-nowrap">
                        <div className="text-white text-sm font-medium">3D View</div>
                        <div className="text-gray-400 text-xs font-mono">scene.js</div>
                    </div>
                </a>
                <a href="#contact" aria-current={activeSection === 'contact' ? 'page' : undefined} onClick={(e) => handleLinkClick(e, 'contact')} className={`nav-link group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-pink-500/20 ${activeSection === 'contact' ? 'active' : ''}`}>
                    <div className="w-8 h-8 flex items-center justify-center bg-pink-500/20 rounded-lg group-hover:bg-pink-500/40 transition-colors">
                        <span className="text-pink-400 text-sm">📧</span>
                    </div>
                    <div className="hidden group-hover:block whitespace-nowrap">
                        <div className="text-white text-sm font-medium">Contact</div>
                        <div className="text-gray-400 text-xs font-mono">connect.api</div>
                    </div>
                </a>
            </div>
            <div className="glass-morphism rounded-2xl p-4 mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs font-mono">ONLINE</span>
                </div>
                <div className="text-gray-400 text-xs font-mono">Status: 200 OK</div>
            </div>
        </nav>
    );
};