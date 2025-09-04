import { ProfileData } from '../types';

const exampleData: ProfileData = {
  firstName: "Jane",
  lastName: "Smith",
  title: "Software Engineer",
  subtitle: "Full-Stack Developer | Team Lead | Tech Enthusiast",
  imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop",
  summary: "Software Engineer with over 8 years of experience building scalable web and mobile applications. Skilled in backend systems, modern frontends, and cloud solutions. Passionate about clean code, great design, and impactful software.",
  about: {
    introduction: "I’m a developer who loves solving complex problems with simple, elegant solutions. Over the years, I’ve worked across backend, frontend, and mobile platforms.",
    paragraphs: [
      "At ExampleTech, I contributed to their developer tools, creating open-source SDKs used by global teams. I also launched ProjectFlow, an internal productivity platform.",
      "I enjoy building products that blend usability with technical excellence, and I thrive in collaborative team environments."
    ]
  },
  experiences: [
    {
      role: "Lead Software Engineer",
      company: "TechNova Inc.",
      period: "Jan 2022 - Present",
      location: "Remote",
      description: [
        "Led engineering teams to deliver scalable SaaS applications.",
        "Managed cloud deployments and CI/CD pipelines.",
        "Implemented real-time dashboards and reporting systems.",
        "Introduced agile practices to improve delivery speed."
      ],
      skills: ["React.js", "Node.js", "AWS", "Docker", "CI/CD", "Team Leadership"]
    },
    {
      role: "Senior Software Engineer",
      company: "Innovex Labs",
      period: "May 2018 - Dec 2021",
      location: "Remote",
      description: [
        "Developed open-source libraries in Python and JavaScript.",
        "Built microservices for a large e-commerce platform.",
        "Worked closely with product managers to define features."
      ],
      skills: ["Python", "JavaScript", "Microservices", "REST APIs", "Agile"]
    },
    {
      role: "Software Engineer",
      company: "CodeCraft Ltd.",
      period: "Jul 2015 - Apr 2018",
      location: "Onsite",
      description: [
        "Built internal tools with Ruby on Rails and Angular.",
        "Integrated third-party APIs for payments and notifications.",
        "Deployed and monitored applications on cloud providers."
      ],
      skills: ["Ruby on Rails", "Angular", "Cloud Hosting", "PostgreSQL"]
    }
  ],
  projects: [
    {
      name: "OpenTools SDK",
      icon: "🔧",
      description: ["Contributed to SDKs in multiple languages for feature management."],
      skills: ["JavaScript", "Python", "Ruby", "SDK Development"],
      linkText: "View on GitHub →",
      repo: "https://github.com/example/open-tools"
    },
    {
      name: "VisionBoard 3D",
      icon: "🖼️",
      description: ["3D visualization platform with real-time rendering and drag-and-drop editing."],
      skills: ["Three.js", "React", "WebGL"],
      linkText: "View Project →",
      link: "https://example.com/visionboard"
    },
    {
      name: "MediConnect",
      icon: "💊",
      description: ["Telehealth app for scheduling and secure video consultations."],
      skills: ["React", "Node.js", "WebRTC"],
      linkText: "View Project →",
      link: "https://example.com/mediconnect"
    },
    {
      name: "FitTrack",
      icon: "🏃",
      description: ["Cross-platform fitness app with tracking and wearable integration."],
      skills: ["React Native", "NestJS", "PostgreSQL"],
      linkText: "View Project →",
      link: "https://example.com/fittrack"
    },
    {
      name: "EduLearn",
      icon: "📚",
      description: ["Virtual learning platform with interactive classrooms and content sharing."],
      skills: ["Ruby on Rails", "AWS", "Video Streaming"],
      linkText: "View Project →",
      link: "https://example.com/edulearn"
    }
  ],
  education: [
    {
      institution: "Example University",
      degree: "Bachelor of Science (BS), Computer Science",
      period: "2010 - 2014"
    }
  ],
  certifications: [
    {
      name: "Certified Scrum Master",
      issuer: "Agile Institute",
      date: "Issued Mar 2021"
    },
    {
      name: "Cloud Practitioner",
      issuer: "AWS Training",
      date: "Issued Nov 2019"
    }
  ],
  skills: [
    "React", "Node.js", "Python", "Ruby on Rails", "Django",
    "TypeScript", "Three.js", "Docker", "AWS", "CI/CD",
    "Agile Practices", "Team Leadership"
  ],
  projectFilters: ["react", "python", "node", "ruby", "cloud"],
  exampleQuestions: [
    "What are your main technical skills?",
    "Can you tell me about the VisionBoard 3D project?",
    "How much team leadership experience do you have?"
  ],
  social: {
    github: "https://github.com/example",
    linkedin: "https://linkedin.com/in/example"
  },
  sections: {
    showAbout: true,
    showExperience: true,
    showProjects: true,
    showAIChat: true,
    showThreeD: true,
    showContact: true
  }
};

export default exampleData;
