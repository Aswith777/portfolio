/**
 * Portfolio Configuration Data
 * Centralized data store for Chinthapalli Aswith (CH. ASWITH)
 * 
 * Update your URLs, resume link, or project details here directly.
 */

export const PORTFOLIO_CONFIG = {
  personal: {
    fullName: "Chinthapalli Aswith",
    displayName: "CH. ASWITH",
    title: "B.Tech CIC Student | Full-Stack Developer",
    tagline: "Hardworking developer passionate about building practical technology solutions.",
    location: "Chagallu, India",
    email: "chinthapalliaswith@gmail.com",
    college: "MVGR College of Engineering",
    branch: "Computer & Information/Communication (CIC)",
    gradYear: 2027,
    cgpa: "6.4",
  },

  // Social & Professional Profiles
  // UPDATE NOTICE: Add your personal GitHub and LinkedIn profile links here.
  social: {
    github: {
      url: "", // e.g., "https://github.com/your-username"
      isPlaceholder: true,
      placeholderMessage: "GitHub link pending. Update URL in js/config.js"
    },
    linkedin: {
      url: "", // e.g., "https://linkedin.com/in/your-username"
      isPlaceholder: true,
      placeholderMessage: "LinkedIn link pending. Update URL in js/config.js"
    }
  },

  // Resume configuration
  // Place your resume PDF in the assets/resume/ directory and update the fileName if changed.
  resume: {
    fileName: "Chinthapalli_Aswith_Resume.pdf",
    filePath: "assets/resume/Chinthapalli_Aswith_Resume.pdf",
    isAvailable: false, // Set to true once you place your PDF into assets/resume/
  },

  // Technical Skills categorized
  skills: [
    // Programming Languages
    { name: "C", category: "languages", icon: "code" },
    { name: "C++", category: "languages", icon: "code" },
    { name: "Java", category: "languages", icon: "coffee" },
    { name: "Python", category: "languages", icon: "terminal" },

    // Frontend
    { name: "HTML", category: "frontend", icon: "layout" },
    { name: "CSS", category: "frontend", icon: "palette" },
    { name: "JavaScript", category: "frontend", icon: "zap" },

    // Backend
    { name: "Spring Boot", category: "backend", icon: "server" },

    // Database
    { name: "SQL (Advanced)", category: "database", icon: "database" },
    { name: "MongoDB", category: "database", icon: "hard-drive" },

    // Developer Tools
    { name: "Git", category: "tools", icon: "git-branch" },
    { name: "GitHub", category: "tools", icon: "github" },
    { name: "Vercel", category: "tools", icon: "upload-cloud" },

    // Areas of Interest
    { name: "Frontend Development", category: "interests", icon: "monitor" },
    { name: "Backend Development", category: "interests", icon: "cpu" },
    { name: "Full-Stack Development", category: "interests", icon: "layers" },
    { name: "Blockchain", category: "interests", icon: "link-2" },
    { name: "Computer Networks", category: "interests", icon: "wifi" },
    { name: "IoT", category: "interests", icon: "radio" },
    { name: "Cybersecurity", category: "interests", icon: "shield" },
  ],

  // Projects
  projects: [
    {
      id: "raise-your-voice",
      title: "Raise Your Voice — Digital Complaint Box",
      category: "Digital Complaint Management / Full-Stack Project",
      description: "Raise Your Voice is a digital complaint box designed to provide a convenient platform for users to submit complaints or concerns digitally and help streamline the complaint-management process.",
      tags: ["Full-Stack", "Digital Complaint Box", "Web Development", "Database"],
      demoUrl: "", // Add live project URL when deployed
      githubUrl: "", // Add GitHub repository URL when published
      isDemoAvailable: false,
      isGithubAvailable: false
    }
  ],

  // Certifications & Internships
  certifications: [
    {
      id: "cisco-cybersecurity",
      program: "Cybersecurity",
      organization: "Cisco",
      duration: "3 months",
      icon: "shield"
    },
    {
      id: "eduskills-datascience",
      program: "Data Science Master",
      organization: "EduSkills",
      duration: "3 months",
      icon: "activity"
    }
  ],

  // Technology Focus
  interests: [
    {
      title: "Full-Stack Development",
      description: "Designing end-to-end web architectures integrating interactive user interfaces with resilient backend APIs and structured databases.",
      icon: "layers"
    },
    {
      title: "Frontend Development",
      description: "Crafting modern, accessible, and responsive user experiences using clean HTML5, CSS3, and JavaScript.",
      icon: "monitor"
    },
    {
      title: "Backend Development",
      description: "Building robust RESTful services and business logic with Spring Boot and modular backend patterns.",
      icon: "server"
    },
    {
      title: "Databases",
      description: "Architecting relational schemas with Advanced SQL queries as well as flexible document stores with MongoDB.",
      icon: "database"
    },
    {
      title: "Blockchain",
      description: "Exploring decentralized ledger concepts, smart contracts, and cryptographic verification mechanisms.",
      icon: "link-2"
    },
    {
      title: "Computer Networks",
      description: "Analyzing network protocols, routing, transmission controls, and secure socket communications.",
      icon: "wifi"
    },
    {
      title: "IoT (Internet of Things)",
      description: "Investigating smart sensor integrations, edge computing paradigms, and connected hardware workflows.",
      icon: "radio"
    },
    {
      title: "Cybersecurity",
      description: "Studying defensive security principles, vulnerability assessment fundamentals, and secure coding practices.",
      icon: "shield"
    }
  ],

  // Backend API Endpoint Configuration
  api: {
    // If running Spring Boot locally: "http://localhost:8080/api/contact"
    // If deployed on Vercel: "/api/contact"
    contactEndpoint: "/api/contact"
  }
};
