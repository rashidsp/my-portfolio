import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu after navigation
            setIsMobileMenuOpen(false);
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

    const navigationItems = [
        { id: 'home', icon: '🏠', label: 'Home', file: 'index.html', color: 'blue' },
        { id: 'about', icon: '👨‍💻', label: 'About', file: 'profile.js', color: 'green' },
        { id: 'experience', icon: '📈', label: 'Experience', file: 'career.json', color: 'purple' },
        { id: 'projects', icon: '🚀', label: 'Projects', file: 'portfolio.tsx', color: 'yellow' },
        { id: 'ai-chat', icon: '🤖', label: 'AI Chat', file: 'gemini.api', color: 'red' },
        { id: 'three-d', icon: '🧊', label: '3D View', file: 'scene.js', color: 'cyan' },
        { id: 'contact', icon: '📧', label: 'Contact', file: 'connect.api', color: 'pink' }
    ];

    return (
        <>
            {/* Mobile Top Navigation */}
            <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800 shadow-lg">
                <div className="flex items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="text-lg font-bold font-mono">
                            <span className="text-blue-400">&lt;</span>
                            <span className="text-white">RS</span>
                            <span className="text-blue-400">/&gt;</span>
                        </div>
                        <div className="text-xs text-gray-400 font-mono">v2.0.1</div>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                        aria-label="Toggle navigation menu"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                            <div className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                            <div className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                        </div>
                    </button>
                </div>
                
                {/* Mobile Menu Dropdown */}
                <div className={`overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-4 pb-6 space-y-3 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                        {navigationItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                aria-current={activeSection === item.id ? 'page' : undefined}
                                onClick={(e) => handleLinkClick(e, item.id)}
                                className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:bg-${item.color}-500/20 ${
                                    activeSection === item.id ? `bg-${item.color}-500/20 border border-${item.color}-500/30` : ''
                                }`}
                            >
                                <div className={`w-8 h-8 flex items-center justify-center bg-${item.color}-500/20 rounded-lg`}>
                                    <span className={`text-${item.color}-400 text-sm`}>{item.icon}</span>
                                </div>
                                <div>
                                    <div className="text-white text-sm font-medium">{item.label}</div>
                                    <div className="text-gray-400 text-xs font-mono">{item.file}</div>
                                </div>
                            </a>
                        ))}
                        
                        {/* Status Indicator */}
                        <div className="mt-6 p-4 rounded-xl bg-gray-800/50 text-center">
                            <div className="flex items-center justify-center space-x-2 mb-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-400 text-xs font-mono">ONLINE</span>
                            </div>
                            <div className="text-gray-400 text-xs font-mono">Status: 200 OK</div>
                        </div>
                        
                        {/* Scroll Indicator */}
                        <div className="flex justify-center mt-4 pb-2">
                            <div className="w-8 h-1 bg-gray-600 rounded-full opacity-50"></div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Desktop Sidebar Navigation */}
            <nav className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-50 w-20 hover:w-64 transition-all duration-300" id="sidebar" aria-label="Section navigation">
                <div className="glass-morphism rounded-2xl p-4 mb-6 text-center">
                    <div className="text-xl font-bold font-mono mb-2">
                        <span className="text-blue-400">&lt;</span>
                        <span className="text-white">RS</span>
                        <span className="text-blue-400">/&gt;</span>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">v2.0.1</div>
                </div>
                <div className="glass-morphism rounded-2xl p-4 space-y-4">
                    {navigationItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            aria-current={activeSection === item.id ? 'page' : undefined}
                            onClick={(e) => handleLinkClick(e, item.id)}
                            className={`nav-link group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-${item.color}-500/20 ${activeSection === item.id ? 'active' : ''}`}
                        >
                            <div className={`w-8 h-8 flex items-center justify-center bg-${item.color}-500/20 rounded-lg group-hover:bg-${item.color}-500/40 transition-colors`}>
                                <span className={`text-${item.color}-400 text-sm`}>{item.icon}</span>
                            </div>
                            <div className="hidden group-hover:block whitespace-nowrap">
                                <div className="text-white text-sm font-medium">{item.label}</div>
                                <div className="text-gray-400 text-xs font-mono">{item.file}</div>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="glass-morphism rounded-2xl p-4 mt-6 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-xs font-mono">ONLINE</span>
                    </div>
                    <div className="text-gray-400 text-xs font-mono">Status: 200 OK</div>
                </div>
            </nav>
        </>
    );
};