export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-varadjoshi.vercel.app";

export const contact = {
  email: "thevarad.s.joshi@gmail.com",
  location: "Nashik, Maharashtra, India",
  github: "https://github.com/Varad-Joshi",
  linkedin: "https://www.linkedin.com/in/varad-s-joshi/",
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Recognition", href: "#recognition" },
  { label: "Contact", href: "#contact" },
];

export const projectCategories = [
  "AI / Machine Learning",
  "Generative AI",
  "Software Engineering",
  "Cybersecurity",
  "Blockchain",
  "Automation",
  "Infrastructure",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  name: string;
  description: string;
  categories: ProjectCategory[];
  stack: string[];
  repo?: string;
  sourceNote?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "PolicyVault Nexus",
    description:
      "Privacy-preserving, consent-driven middleware for financial data sharing.",
    categories: ["Cybersecurity", "Software Engineering"],
    stack: [],
    sourceNote:
      "Project summary supplied in the brief; repository, technologies and demo link were not provided.",
    featured: true,
  },
  {
    name: "Redact",
    description:
      "A privacy-focused tool for redacting and anonymizing sensitive text, images and documents.",
    categories: [
      "AI / Machine Learning",
      "Generative AI",
      "Cybersecurity",
      "Software Engineering",
    ],
    stack: ["Python", "FastAPI", "Tauri", "NLP"],
    repo: "https://github.com/Varad-Joshi/RE-DACT",
    featured: true,
  },
  {
    name: "Lumos Vault",
    description: "A zero-trust solution for temporary secret sharing.",
    categories: ["Cybersecurity", "Software Engineering"],
    stack: [],
    sourceNote:
      "Project summary supplied in the brief; repository, technologies and demo link were not provided.",
    featured: true,
  },
  {
    name: "Blockchain-based KYC · HashVault",
    description:
      "A blockchain and IPFS KYC workflow for secure, reusable identity sharing.",
    categories: ["Blockchain", "Cybersecurity", "Software Engineering"],
    stack: ["Java", "Blockchain", "IPFS"],
    repo: "https://github.com/Varad-Joshi/HashVault",
  },
  {
    name: "IntelliQueue",
    description:
      "A Flutter and Firebase queue-management app with live queue updates and role-based access.",
    categories: ["Automation", "Software Engineering"],
    stack: ["Flutter", "Firebase"],
    repo: "https://github.com/Varad-Joshi/intelli_queue",
  },
  {
    name: "ANPR Toll Collection",
    description:
      "An automated toll workflow using number-plate recognition, RFID fallback and connected hardware.",
    categories: [
      "AI / Machine Learning",
      "Automation",
      "Infrastructure",
      "Software Engineering",
    ],
    stack: ["Python", "Raspberry Pi", "REST APIs"],
    repo: "https://github.com/Varad-Joshi/ANPR",
  },
  {
    name: "Virtual Mouse",
    description:
      "A gesture-controlled virtual mouse using MediaPipe and OpenCV.",
    categories: [
      "AI / Machine Learning",
      "Automation",
      "Software Engineering",
    ],
    stack: ["Python", "MediaPipe", "OpenCV"],
    repo: "https://github.com/Varad-Joshi/VirtualMouse",
  },
];

export const experience: {
  organization: string;
  role: string;
  period: string;
  details: string[];
  sourceNote?: string;
}[] = [
  {
    organization: "CodeFeast",
    role: "Gen AI and LLM Engineer",
    period: "October 2025 – December 2025",
    details: [
      "Tested and evaluated prompts for Generative AI and Large Language Models.",
      "Identified hallucinations and assessed output consistency and AI response quality.",
      "Supported LLM evaluation workflows to assess response reliability.",
    ],
  },
  {
    organization: "ESDS Software Solution",
    role: "Junior Associate",
    period: "December 2025 – Present",
    details: [
      "Linux administration and enterprise infrastructure operations.",
      "Backup and recovery using Veeam Backup & Replication and Commvault.",
      "VMware and virtualization, server monitoring and troubleshooting, storage and network operations.",
    ],
  },
  {
    organization: "Innovera National Hackathon",
    role: "R&D Member",
    period: "Jan 2025 – Mar 2025",
    details: ["Contributed to research and development during the hackathon."],
  },
  {
    organization: "Zensor",
    role: "Employability Skill Development Program",
    period: "2024 – 2025",
    details: ["Selected for the Zensor Employability Skill Development program."],
  },
  {
    organization: "CodSoft · Remote",
    role: "Intern",
    period: "Nov 2023",
    details: [
      "Explored Java, mobile development, IoT and .NET fundamentals.",
      "Built a hotel management system in Advanced Java.",
    ],
  },
  {
    organization: "Sunanda Infotech",
    role: "Intern",
    period: "Jul 2023 – Aug 2023",
    details: ["Built small Python projects while learning library workflows."],
  },
];

export const skillGroups = [
  {
    label: "Programming",
    skills: ["Python", "Java", "C++", "JavaScript"],
  },
  {
    label: "AI & Data",
    skills: [
      "Machine Learning",
      "NLP",
      "Generative AI",
      "LLM Evaluation",
      "Agentic AI",
      "OCR",
      "Computer Vision",
    ],
  },
  {
    label: "Backend & Development",
    skills: [
      "React",
      "Flask",
      "FastAPI",
      "REST APIs",
      "Android Development",
      "Streamlit",
      "Tauri",
      "Flutter",
    ],
  },
  {
    label: "Infrastructure",
    skills: [
      "Linux Administration",
      "VMware",
      "Networking",
      "NFS",
      "Storage Management",
    ],
  },
  {
    label: "Enterprise Technologies",
    skills: ["Veeam", "Commvault", "Database Technologies"],
  },
  {
    label: "Security & Privacy",
    skills: ["Blockchain", "IPFS", "Encryption", "Data Privacy"],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "Docker", "SQL", "MongoDB", "Firebase"],
  },
];

export const education = [
  {
    qualification: "B.Tech · Artificial Intelligence & Data Science",
    institution: "K.K. Wagh Institute",
    period: "",
    note: "Study dates and academic results were not included in the available materials.",
  },
];

export const achievements = [
  {
    title: "Smart India Hackathon finalist",
    period: "2024",
    detail: "Finalist, Smart India Hackathon.",
  },
  {
    title: "Phoenix Club project competition · 1st prize",
    period: "2024",
    detail: "First place in the college project competition.",
  },
  {
    title: "Selected for Zensor ESD Training Program",
    period: "2024–2025",
    detail: "Selected for the Employability Skill Development program.",
  },
  {
    title: "SunHacks · Participant",
    period: "2024",
    detail: "Participated in the national-level hackathon hosted by Sandip University.",
  },
  {
    title: "Dr. Homi Bhabha Balvaidnyanik Competition",
    period: "2024",
    detail: "Passed the competition.",
  },
];

export const certificates = [
  {
    name: "AWS Cloud Foundation",
    issuer: "Amazon Web Services",
    file: "AWS Cloud Foundation - AWS.pdf",
    format: "PDF",
  },
  {
    name: "Advanced Prompt Engineering using ChatGPT",
    issuer: "UpGrad",
    file: "Advanced Prompt Engineering using ChatGPT - UpGrad.jpg",
    format: "Image",
  },
  {
    name: "Data Analysis and Visualization",
    issuer: "Udemy",
    file: "Data Analysis and Visualization - Udemy.pdf",
    format: "PDF",
  },
  {
    name: "Encryption Basics",
    issuer: "Great Learning",
    file: "Encryption Basics - Great Learning.pdf",
    format: "PDF",
  },
  {
    name: "Employability Skill Development Program",
    issuer: "Zensor",
    file: "Zensor Employability Skill Development Program - Zensor.jpg",
    format: "Image",
  },
  {
    name: "Spoken Tutorial",
    issuer: "Spoken Tutorial",
    file: "Spoken Tutorial.pdf",
    format: "PDF",
  },
];
