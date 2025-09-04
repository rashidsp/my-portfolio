
import React from 'react';

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
        <title>LinkedIn</title>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 0 1 2.063-2.065 2.064 2.064 0 0 1 2.063 2.065c0 1.14-.925 2.065-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
    </svg>
);

export const LinkIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className = 'h-8 w-8' }) => (
  <div className={`flex items-center justify-center rounded-full bg-light-accent dark:bg-dark-accent text-white ${className}`}>
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </div>
);

export const SparkleIcon: React.FC<{ className?: string }> = ({ className = 'h-8 w-8' }) => (
    <div className={`flex items-center justify-center rounded-full bg-light-primary dark:bg-dark-primary text-white ${className}`}>
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm0 15a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM5.25 12a.75.75 0 0 0-3 .75h3a.75.75 0 0 0 0-1.5ZM21.75 12a.75.75 0 0 0-3 .75h3a.75.75 0 0 0 0-1.5Z" /><path fillRule="evenodd" d="M12 6.75A5.25 5.25 0 0 0 6.75 12a5.25 5.25 0 0 0 5.25 5.25a5.25 5.25 0 0 0 5.25-5.25A5.25 5.25 0 0 0 12 6.75ZM8.25 12a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0Z" clipRule="evenodd" />
        </svg>
    </div>
);

export const BriefcaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Technology Icons
export const ReactIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor"><title>React Logo</title><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
);
export const PythonIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M15.09,8.08L14,8.91V11.23L15.09,12.08C16.94,13.54 16.94,16.2 15.09,17.65L12.35,19.94C10.5,21.4 7.77,21.4 5.92,19.94L3.18,17.65C1.33,16.2 1.33,13.54 3.18,12.08L4.27,11.23V8.91L3.18,8.06C1.33,6.61 1.33,3.95 3.18,2.5L5.92,0.21C7.77,-1.24 10.5,-1.24 12.35,0.21L15.09,2.5C16.94,3.95 16.94,6.61 15.09,8.08M15.1,12.5V17.22L12.36,19.5C10.51,20.95 7.78,20.95 5.93,19.5L3.58,17.27V12.5C3.58,11.88 3.9,11.33 4.4,11L8.81,7.22H15.28V11C15.93,11.33 16.25,11.88 16.25,12.5V17.27L18.59,19.5C20.44,20.95 23.17,20.95 25.02,19.5L27.47,17.27V12.5C27.47,11.88 27.15,11.33 26.55,11L22.14,7.22H15.67V11C15.02,11.33 14.7,11.88 14.7,12.5Z"/></svg>
);
export const ThreeJSIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg className={className} viewBox="0 0 1000 1000" fill="currentColor"><path d="M486,45.28,14.7,358.87,485.58,735.61,960.5,358.45ZM485.58,954.72,965.3,640.71,486,264.39,10,640.71Z"/></svg>
);
export const TypeScriptIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg className={className} viewBox="0 0 128 128" fill="currentColor"><path fill="#007ACC" d="M0 0h128v128H0z"/><path fill="#fff" d="M22.1 22.1h83.7v83.7H22.1z"/><path fill="#007ACC" d="M24.4 24.4h79.2v79.2H24.4z"/><path fill="#fff" d="M91.1 91.1V63.2H76.7V51h30.9v12.2H93.4v27.9H91.1zM66 63.2c0-3.6 1.1-6.4 3.4-8.4 2.3-2 5.2-3 8.9-3 3.1 0 5.7.9 7.7 2.6 1.2 1 2.1 2.2 2.6 3.6l-13.3.1c-1-.7-1.5-1.7-1.5-3 .1 0 .1 0 0 0zm10.2-12.2c-3.1-2.9-7.3-4.3-12.7-4.3-4.9 0-8.9 1.3-12.2 3.8-3.3 2.5-5.5 5.9-6.8 10.2-1.2 4.3-1.8 8.8-1.8 13.5 0 4.7.6 9.1 1.8 13.4 1.2 4.3 3.4 7.7 6.6 10.2 3.2 2.5 7.1 3.8 11.6 3.8 5.7 0 10.3-1.7 13.7-5.2s5.7-8.1 6.8-13.8h-15.1s-.1.4-.2.8c-.1.4-.4.8-.7 1.1-.3.3-.8.6-1.3.8-.5.2-1.1.3-1.8.3-1.9 0-3.4-.6-4.4-1.7-1.1-1.1-1.6-2.8-1.6-4.9h25.7v-2.3c0-5.6-1.3-10.4-3.8-14.4z"/></svg>
);
export const DockerIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22,11.5c0-4.62-3.5-8.44-8-8.44C9.5,3.06,6,3.06,6,3.06v9.42c2.14,1,4.2,1,6.43,1h1.43C18.64,13.48,22,12.5,22,11.5M12.06,14.21c-2,0-4.36-.78-5.92-1.4V8.58c1.56-.62,3.92-1.4,5.92-1.4s4.36.78,5.92,1.4v4.23c-1.56.62-3.92,1.4-5.92,1.4M2.38,10.92c-.39.22-1.14.65-1.14,1.45s.75,1.23,1.14,1.45L6,15.69v-1.69L2.73,12.37,6,10.74V9.05L2.38,10.92M21,14.47v1.86c-1.88,1.24-4.5,2-7,2s-5.12-.76-7-2v-1.86l3,1.75v-1.69l-3-1.75v-1.42l3,1.75v-1.69l-3-1.75v-1.42l3,1.75V9l-3-1.75V5.39c1.88-1.24,4.5-2,7-2s5.12.76,7,2v1.86l-3-1.75v1.69l3,1.75v1.42l-3-1.75v1.69l3,1.75v1.42l-3-1.75Z"/></svg>
);
export const AWSIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13.68,15.34c-2.33,1.38-4.6,1.48-4.6,1.48s-2.27-.1-4.6-1.48C.19,17.43,0,22.25,0,22.25H24s-.19-4.82-4.47-6.91c-2.33,1.38-4.6,1.48-4.6,1.48S16,16.72,13.68,15.34M12,1.75c-3.13,0-5.67,2.54-5.67,5.67s2.54,5.67,5.67,5.67,5.67-2.54,5.67-5.67S15.13,1.75,12,1.75Z"/></svg>
);
export const RailsIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M21.14,2.37l-1.53,1.53c-2.24-1.92-5.4-2.5-8.31-1.61L10,5.85c.61,.14,1.2,.36,1.75,.63l1.39-1.39c.2-.2,.51-.2,.71,0l1.13,1.13c.2,.2,.2,.51,0,.71l-1.46,1.46c.55,.68,1,1.48,1.25,2.34l3.56-1.28c.27-.1,.56,.05,.71,.29l1.41,2.44c.15,.25,.07,.58-.18,.73l-2.48,1.43c.12,.63,.18,1.27,.18,1.91s-.06,1.28-.18,1.91l2.48,1.43c.25,.15,.33,.48,.18,.73l-1.41,2.44c-.15,.25-.44,.38-.71,.29l-3.56-1.28c-.25,.86-.7,1.66-1.25,2.34l1.46,1.46c.2,.2,.2,.51,0,.71l-1.13,1.13c-.2,.2-.51,.2-.71,0l-1.39-1.39c-.55,.27-1.14,.49-1.75,.63l-2.66,3.56c-.16,.21-.45,.29-.69,.19L2,21.14c-.25-.1-.36-.4-.25-.65L4.85,14c.14-.61,.36-1.2,.63-1.75L4.09,10.86c-.2-.2-.2-.51,0-.71L5.22,9c.2-.2,.51-.2,.71,0l1.39,1.39c.68-.55,1.48-1,2.34-1.25L8.38,5.58c-.1-.27,.05-.56,.29-.71l2.44-1.41c.25-.15,.58-.07,.73,.18l1.43,2.48c.63-.12,1.27-.18,1.91-.18c.64,0,1.28,.06,1.91,.18l1.43-2.48c.15-.25,.48-.33,.73-.18l2.44,1.41c.25,.15,.38,.44,.29,.71l-1.28,3.56c.86,.25,1.66,.7,2.34,1.25l1.46-1.46c.2-.2,.51-.2,.71,0l1.13,1.13c.2,.2,.2,.51,0,.71l-1.39,1.39c.27,.55,.49,1.14,.63,1.75l3.56,2.66c.21,.16,.29,.45,.19,.69Z"/></svg>
);
