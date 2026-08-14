// file: components/Portfolio.tsx  (or app/page.tsx)
"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  Code2,
  ShieldCheck,
  Brain,
  Phone,
} from "lucide-react";

/**
 * Portfolio - merged / enhanced version
 * - Layout & positioning based on your second file
 * - Uses the earlier loading splash style (strong spinner + dots),
 *   but increases the intro splash duration to ~3000ms
 * - Adds Achievements section and removes large contact page
 * - Adds compact contact card (fixed) similar to the reference site
 * - Populates content from the uploaded CV (Varad S Joshi)
 *
 * Make sure TailwindCSS, framer-motion and lucide-react are installed.
 */

// Premium Blue Color System - Design tokens for reference
// (Colors defined as CSS custom properties in globals.css)

// Motion variants - Premium animations
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5 } 
  },
};

const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

// Projects & other structured data filled from CV + earlier list
const projectsData = [
  {
    title: "Blockchain based KYC (IPFS)",
    subtitle: "Decentralized KYC pipeline",
    description:
      "Backend developer for a blockchain-based KYC system using IPFS for decentralized storage and permissioned access controls.",
    tags: ["Blockchain", "IPFS", "Security"],
    repo: "https://github.com/Varad-Joshi/HashVault",
  },
  {
    title: "Resume Generation & Filtering System",
    subtitle: "NLP-powered recruiter tool",
    description:
      "Built backend and model training pipeline for automated resume generation and filtering using Python & NLP techniques.",
    tags: ["Python", "NLP", "Streamlit"],
    repo: "https://github.com/Varad-Joshi/Resume-Matcher",
  },
  {
    title: "ANPR Toll Collection System",
    subtitle: "Automatic Number Plate Recognition",
    description:
      "Model training and API integration for ANPR using OpenCV and Raspberry Pi for edge inference and automation.",
    tags: ["OpenCV", "Python", "Raspberry Pi"],
    repo: "https://github.com/Varad-Joshi/ANPR",
  },
  {
    title: "REDACT",
    subtitle: "Secure redaction & synthetic data",
    description:
      "Backend and model work for redaction/anonymization and synthetic data generation across multiple formats.",
    tags: ["Machine Learning", "Security", "Tauri", "React"],
    repo: "https://github.com/Varad-Joshi/RE-DACT",
  },
];

// Achievements extracted from CV
const achievementsFromCV = [
  {
    title: "SIH'2024 Finalist",
    when: "2024",
    detail: "Smart India Hackathon finalist.",
  },
  {
    title: "1st Prize — Project Competition (Phoenix Club)",
    when: "2024",
    detail: "Won 1st prize in internal college project competition.",
  },
  {
    title: "Selected — Zensor ESD Training Program",
    when: "2024-2025",
    detail: "Selected for the Zensor Employability Skill Development program.",
  },
  {
    title: "SunHacks — National Level Hackathon (Participant)",
    when: "2024",
    detail: "Participated in SunHacks hosted by Sandip University.",
  },
  {
    title: "DR. HOMI BHABHA BALVAIDNYANIK Competition - Passed",
    when: "2024",
    detail: "Selected/passed the Balvaidnyanik competition.",
  },
];

// Experience entries from CV
const experienceFromCV = [
  {
    title: "CodSoft (Remote) — Intern",
    period: "Nov 2023",
    details: [
      "Worked on Java & Advanced Java, mobile app basics, IoT, and .NET fundamentals.",
      "Developed a Basic Hotel Management System using Advanced Java.",
    ],
  },
  {
    title: "Sunanda Infotech (Physical) — Intern",
    period: "Jul 2023 - Aug 2023",
    details: [
      "Worked with Python; developed mini-projects to learn library usage and workflows.",
    ],
  },
  {
    title: "R&D Member — Innovera National Hackathon",
    period: "Jan 2025 - Mar 2025",
    details: ["Contributed to research & development during the Innovera hackathon."],
  },
];

const certificatesList = [
  {
    name: "Zensor Employability Skill Development Program - Zensor",
    file: "Zensor Employability Skill Development Program - Zensor.jpg",
  },
  {
    name: "AWS Cloud Foundation - AWS",
    file: "AWS Cloud Foundation - AWS.pdf",
  },
  {
    name: "Advanced Prompt Engineering using ChatGPT - UpGrad",
    file: "Advanced Prompt Engineering using ChatGPT - UpGrad.jpg",
  },
  {
    name: "Data Analysis and Visualization - Udemy",
    file: "Data Analysis and Visualization - Udemy.pdf",
  },
  {
    name: "Encryption Basics - Great Learning",
    file: "Encryption Basics - Great Learning.pdf",
  },
  {
    name: "Spoken Tutorial",
    file: "Spoken Tutorial.pdf",
  },
];

// function CertificateItem({ certificate }: { certificate: { name: string; file: string } }) {
//   const [open, setOpen] = useState(false);
//   const filePath = `/api/certificates/${certificate.file}`;

//   return (
//     <li className="rounded-md border p-3 bg-white/10">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full text-left font-medium hover:underline"
//       >
//         {certificate.name}
//       </button>

//       {open && (
//         <div className="mt-3 border rounded-lg overflow-hidden">
//           <iframe
//             src={filePath}
//             className="w-full h-64"
//             title={certificate.name}
//           />
//         </div>
//       )}
//     </li>
//   );
// }

function CertificateItem({ certificate, isDark }: { certificate: { name: string; file: string }; isDark: boolean }) {
  const [open, setOpen] = useState(false);
  const filePath = `/api/certificates/${certificate.file}`;
  
  // Check if the certificate is an image (based on file extension)
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(certificate.file);

  return (
    <motion.li
      whileHover={{ y: -2 }}
      className={`rounded-lg border p-4 transition cursor-pointer ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/30" : "bg-blue-50/50 border-blue-200 hover:bg-blue-100/50 hover:border-blue-300"}`}
    >
      <motion.button
        onClick={() => setOpen(!open)}
        className={`w-full text-left font-medium flex justify-between items-center ${isDark ? "text-white hover:text-blue-400" : "text-[#0a1428] hover:text-blue-600"}`}
        whileHover={{ x: 4 }}
      >
        <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{certificate.name}</span>
        <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>
          {open ? "▲" : "▼"}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 border rounded-lg overflow-hidden"
          >
            {isImage ? (
              <div className={`flex justify-center p-4 ${isDark ? "bg-white/5" : "bg-white"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filePath}
                  className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
                  alt={certificate.name}
                />
              </div>
            ) : (
              <iframe
                src={filePath}
                className="w-full h-96"
                title={certificate.name}
                frameBorder="0"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

// Basic contact details from CV
const CONTACT = {
  name: "Varad S Joshi",
  phone: "+91 70284 37273",
  email: "varadjoshi2506@gmail.com",
  location: "Nashik, Maharashtra",
  github: "https://github.com/Varad-Joshi",
  linkedin: "https://www.linkedin.com/in/varad-s-joshi/",
};

const navItems = [
  { label: "About", href: "#about", icon: Brain },
  { label: "Projects", href: "#projects", icon: Code2 },
  { label: "Achievements", href: "#achievements", icon: ShieldCheck },
  { label: "Experience", href: "#experience", icon: Github },
  { label: "Skills", href: "#skills", icon: Mail },
];

// Reusable small components
function ProjectCard({
  project,
  isDark,
}: {
  project: typeof projectsData[0];
  isDark: boolean;
}) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl border p-6 shadow-md backdrop-blur transition ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/10" : "bg-blue-50/50 border-blue-200 hover:bg-blue-100/50 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/10"}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`rounded-xl p-3 shadow flex items-center justify-center text-white flex-shrink-0`}
          style={{
            background: `linear-gradient(135deg, ${isDark ? "#0066ff" : "#0052cc"}, ${isDark ? "#06b6d4" : "#0891b2"})`,
            minWidth: 48,
            minHeight: 48,
          }}
        >
          <Code2 className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`text-lg font-semibold leading-tight ${isDark ? "text-white" : "text-[#0a1428]"}`}>
            {project.title}
          </h3>
          <p className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            {project.subtitle}
          </p>
          <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${isDark ? "border-blue-400/30 bg-blue-400/10 text-blue-300" : "border-blue-300 bg-blue-100 text-blue-700"}`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            {project.repo && (
              <motion.a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${isDark ? "border-blue-400/30 bg-blue-400/10 text-blue-300 hover:bg-blue-400/20" : "border-blue-300 bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
                aria-label={`View ${project.title} code`}
              >
                View Code
                <Github className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Main component
export default function Portfolio() {
  // filter state
  const [filter, setFilter] = useState<string>("All");

  // Theme state
  const [isDark, setIsDark] = useState(true);

  // short loading spinner (first-stage), and intro splash (second-stage)
  const [loadingShort, setLoadingShort] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  // init: short loader -> then intro splash (longer)
  useEffect(() => {
    // short spinner for immediate UX (1.1s)
    const t1 = setTimeout(() => setLoadingShort(false), 1100);

    // intro splash duration increased to ~3000ms as requested
    const t2 = setTimeout(() => setIntroDone(true), 3100); // 3.1s to leave room for spinner
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // compute tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projectsData.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return projectsData;
    return projectsData.filter((p) => p.tags.includes(filter));
  }, [filter]);

  // Short loading spinner UI - 1.2s fast load
  if (loadingShort) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, rgb(37, 99, 235), rgb(59, 130, 246), rgb(6, 182, 212))' }}>
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-24 h-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-white/20 border-t-white"
            />
          </div>
          <div className="text-white text-lg font-semibold tracking-wide">Building premium experience...</div>
          <div className="flex justify-center gap-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-white/80 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-white/80 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-white/80 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isDark ? "dark" : "light"} style={{ colorScheme: isDark ? "dark" : "light" }}>
      <div className={`min-h-screen transition-colors`} style={{
        backgroundImage: isDark 
          ? 'linear-gradient(to bottom, rgb(10, 15, 26), rgb(15, 22, 35), rgb(10, 15, 26))'
          : 'linear-gradient(to bottom, rgb(255, 255, 255), rgb(240, 249, 255), rgb(255, 255, 255))'
      }}>
        {/* Intro Splash - Reduced to 2s for better UX */}
        <AnimatePresence>
          {!introDone && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center"
              style={{
                backgroundImage: isDark 
                  ? 'linear-gradient(to bottom right, rgba(30, 58, 138, 0.2), rgb(20, 31, 50), rgb(10, 20, 40))'
                  : 'linear-gradient(to bottom right, rgb(240, 249, 255), rgb(255, 255, 255), rgb(240, 249, 255))'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              aria-hidden
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center space-y-4"
              >
                <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium backdrop-blur ${isDark ? "border-blue-400/30 bg-blue-400/10 text-blue-300" : "border-blue-300 bg-blue-50 text-blue-700"}`}>
                  <ShieldCheck className="h-4 w-4" /> AI • ML • Blockchain
                </div>
                <h1 className={`text-5xl md:text-6xl font-bold tracking-tight ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                  Hi, I&apos;m{" "}
                  <span className="bg-clip-text text-transparent" style={{
                    backgroundImage: isDark 
                      ? 'linear-gradient(to right, rgb(96, 165, 250), rgb(6, 182, 212))'
                      : 'linear-gradient(to right, rgb(37, 99, 235), rgb(14, 116, 144))'
                  }}>
                    Varad
                  </span>
                </h1>
                <p className={`text-lg ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Building intelligent, secure, premium experiences.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className={`relative min-h-screen transition-colors`}>
          {/* Premium Header with Dark/Light Toggle */}
          <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all ${isDark ? "bg-[#0a0f1a]/70 border-white/5" : "bg-white/70 border-blue-100"}`}>
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <motion.a
                href="#home"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`font-bold text-lg tracking-tight ${isDark ? "text-white" : "text-[#0a1428]"}`}
                aria-label="Go to home"
              >
                VJ
              </motion.a>

              <nav className="hidden items-center gap-8 md:flex">
                {navItems.map(({ label, href, icon: Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ y: -2 }}
                    className={`flex items-center gap-2 text-sm font-medium transition ${isDark ? "text-slate-300 hover:text-blue-400" : "text-slate-600 hover:text-blue-600"}`}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </motion.a>
                ))}
              </nav>

              {/* Dark/Light Mode Toggle */}
              <motion.button
                onClick={() => setIsDark(!isDark)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition ${isDark ? "bg-white/10 hover:bg-white/20 text-yellow-300" : "bg-blue-100 hover:bg-blue-200 text-blue-800"}`}
                aria-label="Toggle dark mode"
              >
                {isDark ? "☀️" : "🌙"}
              </motion.button>
            </div>
          </header>

          {/* Hero Section */}
          <section id="home" className="relative flex min-h-[85vh] items-center py-12 px-6">
            <motion.div
              variants={containerStagger}
              initial="hidden"
              animate="show"
              className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2"
            >
              {/* Profile Photo */}
              <motion.div variants={fadeInScale} className="flex justify-center order-2 md:order-1">
                <div className={`rounded-3xl overflow-hidden shadow-2xl border-4 ${isDark ? "border-blue-500/30" : "border-blue-200"}`}>
                  <Image
                    src="/photo/Profile.jpg"
                    alt="Profile"
                    width={280}
                    height={380}
                    priority
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.div>

              {/* Hero Text */}
              <motion.div variants={fadeUp} className="space-y-6 order-1 md:order-2">
                <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium backdrop-blur w-fit ${isDark ? "border-blue-400/30 bg-blue-400/10 text-blue-300" : "border-blue-300 bg-blue-50 text-blue-700"}`}>
                  <ShieldCheck className="h-4 w-4" /> Privacy • AI/ML • Blockchain
                </div>

                <div className="space-y-3">
                  <h1 className={`text-5xl md:text-6xl font-bold tracking-tight ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                    Hi, I&apos;m{" "}
                    <span className="bg-clip-text text-transparent" style={{
                      backgroundImage: isDark 
                        ? 'linear-gradient(to right, rgb(96, 165, 250), rgb(6, 182, 212))'
                        : 'linear-gradient(to right, rgb(37, 99, 235), rgb(14, 116, 144))'
                    }}>
                      Varad Joshi
                    </span>
                  </h1>
                  <p className={`text-lg font-medium leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    I build <span className={`font-semibold ${isDark ? "text-blue-400" : "text-blue-600"}`}>intelligent</span> and <span className={`font-semibold ${isDark ? "text-blue-400" : "text-blue-600"}`}>secure</span> experiences using AI, ML, and blockchain technology.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl px-6 py-3 font-semibold transition shadow-lg text-white hover:shadow-xl"
                    style={{
                      backgroundImage: isDark
                        ? 'linear-gradient(to right, rgb(59, 130, 246), rgb(6, 182, 212))'
                        : 'linear-gradient(to right, rgb(37, 99, 235), rgb(14, 116, 144))',
                      boxShadow: isDark ? '0 10px 15px -3px rgba(59, 130, 246, 0.3)' : '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
                    }}
                  >
                    See Projects
                  </motion.a>
                  <motion.a
                    href={`mailto:${CONTACT.email}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-xl px-6 py-3 font-semibold transition border ${isDark ? "border-blue-400/30 bg-blue-400/10 text-blue-300 hover:bg-blue-400/20" : "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
                  >
                    Get in Touch
                  </motion.a>
                </div>

                <div className={`flex items-center gap-6 pt-4 border-t ${isDark ? "border-white/10 text-slate-300" : "border-blue-100 text-slate-700"}`}>
                  <motion.a
                    href={CONTACT.github}
                    whileHover={{ scale: 1.1 }}
                    className={`flex items-center gap-2 transition ${isDark ? "hover:text-blue-400" : "hover:text-blue-600"}`}
                  >
                    <Github className="h-5 w-5" /> <span className="text-sm font-medium">GitHub</span>
                  </motion.a>

                  <motion.a
                    href={CONTACT.linkedin}
                    whileHover={{ scale: 1.1 }}
                    className={`flex items-center gap-2 transition ${isDark ? "hover:text-blue-400" : "hover:text-blue-600"}`}
                  >
                    <Linkedin className="h-5 w-5" /> <span className="text-sm font-medium">LinkedIn</span>
                  </motion.a>

                  <motion.a
                    href={`mailto:${CONTACT.email}`}
                    whileHover={{ scale: 1.1 }}
                    className={`flex items-center gap-2 transition ${isDark ? "hover:text-blue-400" : "hover:text-blue-600"}`}
                  >
                    <Mail className="h-5 w-5" /> <span className="text-sm font-medium">Email</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2"
            >
              <ArrowDown className={`h-6 w-6 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="mx-auto max-w-6xl px-6 py-20 space-y-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                About Me
              </h2>
              <p className={`text-lg font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                Passionate engineer building intelligent solutions
              </p>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`max-w-3xl text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              I&apos;m passionate about technology and innovation. With a strong foundation in software development, I aim to contribute to real-world projects by designing, coding, and debugging robust applications. I bring strong communication and adaptability to environments that value creativity and growth.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: "📍 Location",
                  value: CONTACT.location,
                  detail: "Based in India",
                },
                {
                  label: "📧 Contact",
                  value: CONTACT.phone,
                  detail: CONTACT.email,
                },
                {
                  label: "🎓 Education",
                  value: "B.Tech in AI & DS",
                  detail: "K.K. Wagh Institute",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl border p-6 transition ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/30" : "bg-blue-50/50 border-blue-200 hover:bg-blue-100/50 hover:border-blue-300"}`}
                >
                  <div className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {item.label}
                  </div>
                  <div className={`mt-2 text-lg font-semibold ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                    {item.value}
                  </div>
                  <div className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {item.detail}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mx-auto max-w-6xl px-6 py-20 space-y-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-2"
            >
              <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                Featured Projects
              </h2>
              <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Backend, ML, and blockchain-focused work
              </p>
            </motion.div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((t) => (
                <motion.button
                  key={t}
                  onClick={() => setFilter(t)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition border ${
                    filter === t
                      ? isDark
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-blue-600 text-white border-blue-600"
                      : isDark
                        ? "border-white/10 text-slate-300 hover:border-blue-400/30 hover:bg-blue-400/10"
                        : "border-blue-200 text-slate-600 hover:border-blue-300 hover:bg-blue-100"
                  }`}
                  aria-pressed={filter === t}
                >
                  {t}
                </motion.button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filtered.map((p) => (
                <ProjectCard key={p.title} project={p} isDark={isDark} />
              ))}
            </div>
          </section>

          {/* Achievements Section */}
          <section id="achievements" className="mx-auto max-w-6xl px-6 py-20 space-y-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-2"
            >
              <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                Achievements & Hackathons
              </h2>
              <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Awards, hackathon results, and recognitions
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {achievementsFromCV.map((a, idx) => (
                <motion.div
                  key={a.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`rounded-2xl border p-5 transition ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/30" : "bg-blue-50/50 border-blue-200 hover:bg-blue-100/50 hover:border-blue-300"}`}
                >
                  <div className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                    {a.when}
                  </div>
                  <div className={`mt-2 font-semibold text-lg ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                    {a.title}
                  </div>
                  <div className={`mt-2 text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {a.detail}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="mx-auto max-w-6xl px-6 py-20 space-y-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-2"
            >
              <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                Experience
              </h2>
              <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Professional roles and contributions
              </p>
            </motion.div>

            <div className={`space-y-6 border-l-2 pl-6 ${isDark ? "border-blue-500/30" : "border-blue-300"}`}>
              {experienceFromCV.map((e, idx) => (
                <motion.div
                  key={e.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-8 top-2 h-4 w-4 rounded-full border-2 shadow-lg border-blue-500 ${isDark ? "bg-[#0a1428]" : "bg-white"}`} />

                  <div className={`rounded-2xl border p-6 transition ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/30" : "bg-blue-50/50 border-blue-200 hover:bg-blue-100/50 hover:border-blue-300"}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                        {e.title}
                      </h3>
                      <span className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        {e.period}
                      </span>
                    </div>
                    <ul className={`mt-4 space-y-2 text-sm leading-relaxed list-disc list-inside ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      {e.details.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills & Certificates Section */}
          <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-2 mb-8"
            >
              <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                Skills & Certifications
              </h2>
              <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Technical expertise and professional development
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Skills */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
                <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                  Skills
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "Python",
                    "FastAPI",
                    "SQL",
                    "Java",
                    "MongoDB",
                    "NLP",
                    "OCR",
                    "Computer Vision",
                    "React",
                    "Tauri",
                    "PHP",
                    "Flutter",
                    "Firebase",
                    "Blockchain",
                    "IPFS",
                  ].map((s, idx) => (
                    <motion.div
                      key={s}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.02 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`rounded-lg border px-4 py-3 text-sm font-medium text-center transition ${isDark ? "border-blue-400/30 bg-blue-400/10 text-blue-300 hover:bg-blue-400/20" : "border-blue-300 bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
                    >
                      {s}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Certificates */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
                <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                  Certificates
                </h3>
                <ul className="space-y-2">
                  {certificatesList.map((certificate, i) => (
                    <CertificateItem key={i} certificate={certificate} isDark={isDark} />
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className={`mt-16 py-12 border-t transition ${isDark ? "border-white/10 bg-white/5" : "border-blue-100 bg-blue-50/50"}`}>
            <div className={`max-w-6xl mx-auto px-6 text-center text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              <p className="mb-4">
                Crafted with <span className="text-red-500">❤️</span> by {CONTACT.name}
              </p>
              <p>© {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </footer>
        </main>

        {/* Floating Contact Card - Premium Design */}
        <div className="fixed right-6 bottom-6 z-60 transform transition-all">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="group"
          >
            <div className={`rounded-2xl border backdrop-blur shadow-2xl p-4 transition ${isDark ? "bg-navy-900/95 border-blue-500/20" : "bg-blue-50/95 border-blue-300"}`}>
              <div className="flex items-center gap-3 w-72">
                {/* Avatar */}
                <motion.div
                  className="flex-shrink-0 w-14 h-14 rounded-xl font-bold text-white text-lg flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    backgroundImage: 'linear-gradient(to bottom right, rgb(59, 130, 246), rgb(6, 182, 212))'
                  }}
                >
                  VJ
                </motion.div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm ${isDark ? "text-white" : "text-[#0a1428]"}`}>
                    {CONTACT.name}
                  </div>
                  <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {CONTACT.location}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <motion.a
                      href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition ${isDark ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300" : "bg-blue-200 hover:bg-blue-300 text-blue-700"}`}
                    >
                      <Phone className="w-3 h-3" /> Call
                    </motion.a>

                    <motion.a
                      href={`mailto:${CONTACT.email}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition ${isDark ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300" : "bg-blue-200 hover:bg-blue-300 text-blue-700"}`}
                    >
                      <Mail className="w-3 h-3" /> Mail
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Hover Expanded Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -top-16 right-0 flex gap-2 pointer-events-none group-hover:pointer-events-auto"
              >
                <motion.a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full p-2 shadow-lg transition ${isDark ? "bg-navy-900/95 text-slate-300 hover:text-blue-400 hover:bg-navy-900" : "bg-white text-slate-600 hover:text-blue-600 hover:bg-blue-50"}`}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full p-2 shadow-lg transition ${isDark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-100 text-blue-600 hover:bg-blue-200"}`}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}