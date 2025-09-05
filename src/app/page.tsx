// // file: components/Portfolio.tsx  (or app/page.tsx)
// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Github,
//   Linkedin,
//   Mail,
//   ArrowDown,
//   Code2,
//   ShieldCheck,
//   Brain,
//   Phone,
// } from "lucide-react";

// /**
//  * Portfolio - merged / enhanced version
//  * - Layout & positioning based on your second file
//  * - Uses the earlier loading splash style (strong spinner + dots),
//  *   but increases the intro splash duration to ~3000ms
//  * - Adds Achievements section and removes large contact page
//  * - Adds compact contact card (fixed) similar to the reference site
//  * - Populates content from the uploaded CV (Varad S Joshi)
//  *
//  * Make sure TailwindCSS, framer-motion and lucide-react are installed.
//  */

// // Color palette (tweakable)
// const COLORS = {
//   richBlack: "#0a2027",
//   prussianBlue: "#003459",
//   cerulean: "#007ea7",
//   pictonBlue: "#00a8e8",
//   white: "#ffffff",
// };

// // Motion helpers
// const fadeUp = {
//   hidden: { opacity: 0, y: 16 },
//   show: { opacity: 1, y: 0 },
// };

// const containerStagger = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08, delayChildren: 0.12 },
//   },
// };

// // Projects & other structured data filled from CV + earlier list
// const projectsData = [
//   {
//     title: "Blockchain based KYC (IPFS)",
//     subtitle: "Decentralized KYC pipeline",
//     description:
//       "Backend developer for a blockchain-based KYC system using IPFS for decentralized storage and permissioned access controls.",
//     tags: ["Blockchain", "IPFS", "Security"],
//     repo: "https://github.com/Varad-Joshi/HashVault",
//   },
//   {
//     title: "Resume Generation & Filtering System",
//     subtitle: "NLP-powered recruiter tool",
//     description:
//       "Built backend and model training pipeline for automated resume generation and filtering using Python & NLP techniques.",
//     tags: ["Python", "NLP", "Streamlit"],
//     repo: "https://github.com/Varad-Joshi/Resume-Matcher",
//   },
//   {
//     title: "ANPR Toll Collection System",
//     subtitle: "Automatic Number Plate Recognition",
//     description:
//       "Model training and API integration for ANPR using OpenCV and Raspberry Pi for edge inference and automation.",
//     tags: ["OpenCV", "Python", "Raspberry Pi"],
//     repo: "https://github.com/Varad-Joshi/ANPR",
//   },
//   {
//     title: "REDACT",
//     subtitle: "Secure redaction & synthetic data",
//     description:
//       "Backend and model work for redaction/anonymization and synthetic data generation across multiple formats.",
//     tags: ["Machine Learning", "Security", "Tauri", "React"],
//     repo: "https://github.com/Varad-Joshi/RE-DACT",
//   },
// ];

// // Achievements extracted from CV
// const achievementsFromCV = [
//   {
//     title: "SIH'2024 Finalist",
//     when: "2024",
//     detail: "Smart India Hackathon finalist.",
//   },
//   {
//     title: "1st Prize — Project Competition (Phoenix Club)",
//     when: "2024",
//     detail: "Won 1st prize in internal college project competition.",
//   },
//   {
//     title: "Selected — Zensor ESD Training Program",
//     when: "2024-2025",
//     detail: "Selected for the Zensor Employability Skill Development program.",
//   },
//   {
//     title: "SunHacks — National Level Hackathon (Participant)",
//     when: "2024",
//     detail: "Participated in SunHacks hosted by Sandip University.",
//   },
//   {
//     title: "DR. HOMI BHABHA BALVAIDNYANIK Competition - Passed",
//     when: "2024",
//     detail: "Selected/passed the Balvaidnyanik competition.",
//   },
// ];

// // Experience entries from CV
// const experienceFromCV = [
//   {
//     title: "CodSoft (Remote) — Intern",
//     period: "Nov 2023",
//     details: [
//       "Worked on Java & Advanced Java, mobile app basics, IoT, and .NET fundamentals.",
//       "Developed a Basic Hotel Management System using Advanced Java.",
//     ],
//   },
//   {
//     title: "Sunanda Infotech (Physical) — Intern",
//     period: "Jul 2023 - Aug 2023",
//     details: [
//       "Worked with Python; developed mini-projects to learn library usage and workflows.",
//     ],
//   },
//   {
//     title: "R&D Member — Innovera National Hackathon",
//     period: "Jan 2025 - Mar 2025",
//     details: ["Contributed to research & development during the Innovera hackathon."],
//   },
// ];

// // Education from CV
// const educationFromCV = [
//   {
//     degree: "B.Tech in AI & Data Science (Honors: Cyber Security)",
//     org: "K.K. Wagh Institute of Engineering and Research, Nashik",
//     period: "2023 - 2026",
//     note: "CGPA: 8.9/10",
//   },
//   {
//     degree: "Diploma in Computer Technology",
//     org: "K.K. Wagh Polytechnic, Nashik",
//     period: "2021 - 2023",
//     note: "Percentage: 92.35%",
//   },
//   {
//     degree: "SSC",
//     org: "Pethe Vidyalaya, Nashik",
//     period: "—",
//     note: "Percentage: 97.40%",
//   },
// ];

// const certificatesList = [
//   {
//     name: "Zensor Employability Skill Development Program - Zensor",
//     file: "Zensor Employability Skill Development Program - Zensor.jpg",
//   },
//   {
//     name: "AWS Cloud Foundation - AWS",
//     file: "AWS Cloud Foundation - AWS.pdf",
//   },
//   {
//     name: "Advanced Prompt Engineering using ChatGPT - UpGrad",
//     file: "Advanced Prompt Engineering using ChatGPT - UpGrad.jpg",
//   },
//   {
//     name: "Data Analysis and Visualization - Udemy",
//     file: "Data Analysis and Visualization - Udemy.pdf",
//   },
//   {
//     name: "Encryption Basics - Great Learning",
//     file: "Encryption Basics - Great Learning.pdf",
//   },

//   {
//     name: "Spoken Tutorial",
//     file: "Spoken Tutorial.pdf",
//   },
// ];

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


// // Basic contact details from CV
// const CONTACT = {
//   name: "Varad S Joshi",
//   phone: "+91 70284 37273",
//   email: "varadjoshi2506@gmail.com",
//   location: "Nashik, Maharashtra",
//   github: "https://github.com/Varad-Joshi",
//   linkedin: "https://www.linkedin.com/in/varad-s-joshi/",
// };

// const navItems = [
//   { label: "About", href: "#about", icon: Brain },
//   { label: "Projects", href: "#projects", icon: Code2 },
//   { label: "Achievements", href: "#achievements", icon: ShieldCheck },
//   { label: "Experience", href: "#experience", icon: Github },
//   { label: "Skills", href: "#skills", icon: Mail },
// ];


// // Reusable small components
// function Badge({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="rounded-full border px-3 py-1 text-xs font-medium shadow-sm border-white/10">
//       {children}
//     </span>
//   );
// }

// function ProjectCard({
//   project,
// }: {
//   project: (typeof projectsData)[0];
// }) {
//   return (
//     <motion.article
//       variants={fadeUp}
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true, amount: 0.2 }}
//       className="group relative overflow-hidden rounded-2xl border bg-white/5 p-5 shadow-sm backdrop-blur transition hover:shadow-lg border-white/10"
//     >
//       <div className="flex items-start gap-4">
//         <div
//           aria-hidden
//           className="rounded-2xl p-3 text-white shadow flex items-center justify-center"
//           style={{
//             background: `linear-gradient(135deg, ${COLORS.pictonBlue}, ${COLORS.cerulean})`,
//             minWidth: 44,
//             minHeight: 44,
//           }}
//         >
//           <Code2 className="h-6 w-6" />
//         </div>
//         <div className="min-w-0 flex-1">
//           <h3 className="text-lg font-semibold leading-tight text-white">
//             {project.title}
//             <span className="ml-2 text-sm font-normal text-slate-300">
//               — {project.subtitle}
//             </span>
//           </h3>
//           <p className="mt-2 text-sm text-slate-200/90">{project.description}</p>
//           <div className="mt-3 flex flex-wrap gap-2">
//             {project.tags.map((t) => (
//               <Badge key={t}>{t}</Badge>
//             ))}
//           </div>
//           <div className="mt-4 flex items-center gap-3">
//             {project.repo && (
//               <a
//                 href={project.repo}
//                 className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow border-white/10 text-white"
//                 aria-label={`View ${project.title} code`}
//               >
//                 Code <Github className="h-4 w-4" />
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.article>
//   );
// }

// // Main component
// export default function Portfolio() {
//   // filter state
//   const [filter, setFilter] = useState<string>("All");

//   // short loading spinner (first-stage), and intro splash (second-stage)
//   const [loadingShort, setLoadingShort] = useState(true);
//   const [introDone, setIntroDone] = useState(false);

//   // init: short loader -> then intro splash (longer)
//   useEffect(() => {
//     // short spinner for immediate UX (1.1s)
//     const t1 = setTimeout(() => setLoadingShort(false), 1100);

//     // intro splash duration increased to ~3000ms as requested
//     const t2 = setTimeout(() => setIntroDone(true), 3100); // 3.1s to leave room for spinner
//     return () => {
//       clearTimeout(t1);
//       clearTimeout(t2);
//     };
//   }, []);

//   // compute tags
//   const allTags = useMemo(() => {
//     const set = new Set<string>();
//     projectsData.forEach((p) => p.tags.forEach((t) => set.add(t)));
//     return ["All", ...Array.from(set).sort()];
//   }, []);

//   const filtered = useMemo(() => {
//     if (filter === "All") return projectsData;
//     return projectsData.filter((p) => p.tags.includes(filter));
//   }, [filter]);

//   // Short loading spinner UI
//   if (loadingShort) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative mx-auto">
//             <div className="w-20 h-20 border-4 border-white/30 rounded-full animate-spin border-t-white mb-4" />
//             <div className="absolute inset-0 rounded-full animate-pulse border border-transparent border-t-sky-300/40" />
//           </div>
//           <div className="text-white text-xl font-semibold tracking-wide mt-2">Loading portfolio...</div>
//           <div className="mt-2 flex justify-center space-x-1">
//             <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
//             <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
//             <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-rich-black text-white min-h-screen">
//       {/* Intro Splash (AnimatePresence) from earlier design, increased duration */}
//       <AnimatePresence>
//         {!introDone && (
//           <motion.div
//             className="fixed inset-0 z-[100] flex items-center justify-center bg-rich-black text-white"
//             style={{
//               background: `radial-gradient(1200px 600px at 10% -10%, ${COLORS.prussianBlue}33, transparent), radial-gradient(1000px 500px at 100% 0%, ${COLORS.pictonBlue}22, transparent), ${COLORS.richBlack}`,
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.6 }}
//             aria-hidden
//           >
//             <motion.div
//               initial={{ scale: 0.94, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.9, ease: "easeOut" }}
//               className="text-center"
//             >
//               <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium border-white/10">
//                 <ShieldCheck className="h-4 w-4" /> AI • NLP/OCR • Blockchain
//               </div>
//               <h1 className="mt-4 text-5xl font-extrabold tracking-tight md:text-6xl">
//                 Hi, I'm{" "}
//                 <span className="bg-gradient-to-r from-[#00a8e8] to-[#007ea7] bg-clip-text text-transparent">
//                   {CONTACT.name}
//                 </span>
//               </h1>
//               <p className="mt-3 text-sm md:text-base text-slate-200/90">
//                 Engineer crafting intelligent, privacy-first experiences.
//               </p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main content */}
//       <main
//         className="relative min-h-screen bg-rich-black text-white antialiased transition-colors"
//         style={{
//           background: `radial-gradient(1200px 600px at 10% -10%, ${COLORS.prussianBlue}33, transparent), radial-gradient(1000px 500px at 100% 0%, ${COLORS.pictonBlue}22, transparent), ${COLORS.richBlack}`,
//         }}
//       >
//         {/* Header */}
//         <header className="sticky top-0 z-50 border-b bg-[#00171f]/60 backdrop-blur border-white/10">
//           <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
//             <a href="#home" className="font-semibold tracking-tight" aria-label="Go to home">
//               {CONTACT.name}
//             </a>

//             <nav className="hidden items-center gap-6 md:flex">
//               {navItems.map(({ label, href, icon: Icon }) => (
//                 <a
//                   key={label}
//                   href={href}
//                   className="flex items-center gap-1 text-sm text-slate-300 transition hover:text-[#00a8e8] dark:text-slate-300 dark:hover:text-[#00a8e8]"
//                 >
//                   <Icon className="w-4 h-4" /> {label}
//                 </a>
//               ))}
//             </nav>

//           </div>
//         </header>

//         {/* Hero */}
//         <section id="home" className="relative flex min-h-[90vh] items-center py-8">
//           <motion.div
//             variants={containerStagger}
//             initial="hidden"
//             animate="show"
//             className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2"
//           >
//              {/* Profile Photo */}
//             <motion.div variants={fadeUp} className="flex justify-center">
//               <img
//                 src="/photo/profile.jpg"
//                 alt="Profile"
//                 className="w-85 h-110 rounded-3xl object-cover shadow-lg border-4 border-[#00a8e8]"
//               />
//             </motion.div>

//             <motion.div variants={fadeUp}>
//               <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium border-white/10">
//                 <ShieldCheck className="h-4 w-4" /> Privacy •  AI/ML •  NLP •  Blockchain
//               </div>

//               <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl text-white">
//                 Hi, I'm{" "}
//                 <span className="bg-gradient-to-r from-[#00a8e8] to-[#007ea7] bg-clip-text text-transparent">
//                   Varad Joshi
//                 </span>
//               </h1>

//                 <p className="mt-4 max-w-xl text-lg font-medium text-white">
//                 <span className="bg-gradient-to-r from-[#00a8e8] to-[#007ea7] bg-clip-text text-transparent">
//                   Building
//                 </span>{" "}
//                 <span className="bg-gradient-to-r from-[#00a8e8] to-[#007ea7] bg-clip-text text-transparent">
//                   intelligent
//                 </span>{" "}
//                 <span className="bg-gradient-to-r from-[#00a8e8] to-[#007ea7] bg-clip-text text-transparent">
//                   and secure experiences.
//                 </span>
//               </p> 

//               <div className="mt-6 flex flex-wrap items-center gap-3">
//                 <a
//                   href="#projects"
//                   className="rounded-xl border px-4 py-2 font-medium transition hover:-translate-y-0.5 hover:shadow border-white/10 text-white"
//                 >
//                   See Projects
//                 </a>  
//               </div>

//               <div className="mt-6 flex items-center gap-4 text-slate-300">
//                 <a href={CONTACT.github} className="inline-flex items-center gap-2 transition hover:opacity-80" aria-label="GitHub">
//                   <Github className="h-5 w-5" /> GitHub
//                 </a>

//                 <a href={CONTACT.linkedin} className="inline-flex items-center gap-2 transition hover:opacity-80" aria-label="LinkedIn">
//                   <Linkedin className="h-5 w-5" /> LinkedIn
//                 </a>

//                 <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 transition hover:opacity-80" aria-label="Email">
//                   <Mail className="h-5 w-5" /> Email
//                 </a>
//               </div>
//             </motion.div>

//             <motion.div variants={fadeUp} className="relative col-span-1 md:col-span-2 flex justify-center">
//               {/* Decorative card */}
//               <div
//                 className="relative overflow-hidden rounded-3xl border p-6 shadow-lg border-white/10"
//                 style={{ background: `linear-gradient(180deg, ${COLORS.prussianBlue}1a, transparent)` }}
//               >
//                 <div
//                   className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
//                   style={{ background: `radial-gradient(closest-side, ${COLORS.pictonBlue}55, transparent)` }}
//                 />
//                 <div
//                   className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full blur-3xl"
//                   style={{ background: `radial-gradient(closest-side, ${COLORS.cerulean}44, transparent)` }}
//                 />
//                 <section >
//                 <div className="relative z-80 text-center">
//                   <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium shadow backdrop-blur">
//                     <Brain className="h-4 w-4" /> AI • Data • Security
//                   </div>

//                   <h3 className="mt-4 text-xl font-semibold text-white">What I love</h3>
//                   <p className="mt-1 text-sm text-slate-200/90">
//                     Engineer crafting intelligent, privacy-first experiences.
//                   </p>

//                   <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
//                     <div className="rounded-2xl border p-3 border-white/10">
//                       <div className="text-xs text-slate-300">Core Focus</div>
//                       <div className="mt-1 font-medium text-white">Software Development, AI/ML, Blockchain</div>
//                     </div>

//                     <div className="rounded-2xl border p-3 border-white/10">
//                       <div className="text-xs text-slate-300">Currently</div>
//                       <div className="mt-1 font-medium text-white">PolicyVault Nexus</div>
//                     </div>

//                     <div className="rounded-2xl border p-3 dark:border-white/10">
//                       <div className="text-xs text-slate-500 dark:text-slate-300">Vision</div>
//                       <div className="mt-1 font-medium">Crafting privacy-first digital solutions
//                         Empowering data-driven decisions</div>
//                     </div>

//                     <div className="rounded-2xl border p-3 dark:border-white/10">
//                       <div className="text-xs text-slate-500 dark:text-slate-300">Future Focus</div>
//                       <div className="mt-1 font-medium">Generative AI • Privacy Driven System</div>
//                     </div>
//                   </div>
//                 </div>
//                 </section>
//               </div>
//             </motion.div>
//           </motion.div>
//           <div className="pointer-events-none absolute left-1/2 bottom-6 hidden -translate-x-1/2 md:block">
//             <ArrowDown className="h-6 w-6 animate-bounce opacity-60 text-white" />
//           </div>
//         </section>

//         {/* About */}
//         <section id="about" className="mx-auto max-w-6xl px-4 py-16">
//           <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-2xl font-bold md:text-3xl text-white">
//             About
//           </motion.h2>

//           <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-3 max-w-3xl text-slate-200/90">
//             passionate about technology and innovation. With a strong foundation in
// software development, I aim to contribute to real-world projects by
// designing, coding, and debugging robust applications., along with strong
// communication and adaptability, I aim to contribute to impactful work in
// environments that value creativity and growth.
//           </motion.p>

//           <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="rounded-2xl border p-4 border-white/10">
//               <div className="text-xs text-slate-300">Location</div>
//               <div className="mt-1 font-medium text-white">{CONTACT.location}</div>
//             </div>

//             <div className="rounded-2xl border p-4 border-white/10">
//               <div className="text-xs text-slate-300">Contact</div>
//               <div className="mt-1 font-medium text-white">{CONTACT.phone}</div>
//               <div className="text-sm text-slate-300 mt-1">{CONTACT.email}</div>
//             </div>

//             <div className="rounded-2xl border p-4 border-white/10">
//               <div className="text-xs text-slate-300">Education</div>
//               <div className="mt-1 font-medium text-white">B.Tech in AI & DS • K.K. Wagh Institute</div>
//             </div>
//           </div>
//         </section>

//         {/* Projects */}
//         <section id="projects" className="mx-auto max-w-6xl px-4 py-8">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold md:text-3xl text-white">Projects</h2>
//             <p className="text-sm text-slate-300">Selected work — backend & ML focused</p>
//           </div>

//           {/* Filter */}
//           <div className="mt-4 flex flex-wrap gap-2">
//             {allTags.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setFilter(t)}
//                 className={`rounded-full border px-3 py-1 text-xs font-medium transition hover:-translate-y-0.5 hover:shadow border-white/10 ${
//                   filter === t ? "ring-2 ring-[#00a8e8] text-white" : "text-slate-300"
//                 }`}
//                 aria-pressed={filter === t}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
//             {filtered.map((p) => (
//               <ProjectCard key={p.title} project={p as any} />
//             ))}
//           </div>
//         </section>

//         {/* Achievements */}
//         <section id="achievements" className="mx-auto max-w-6xl px-4 py-12">
//           <h2 className="text-2xl font-bold md:text-3xl text-white">Achievements & Hackathons</h2>
//           <p className="mt-2 text-sm text-slate-300">Selected awards, hackathon results and recognitions.</p>

//           <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//             {achievementsFromCV.map((a) => (
//               <motion.div
//                 key={a.title}
//                 variants={fadeUp}
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true }}
//                 className="rounded-2xl border p-4 bg-white/5 shadow-sm border-white/10"
//               >
//                 <div className="text-sm text-slate-300">{a.when}</div>
//                 <div className="mt-1 font-semibold text-white">{a.title}</div>
//                 <div className="mt-2 text-sm text-slate-300">{a.detail}</div>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* Experience */}
//         <section id="experience" className="mx-auto max-w-6xl px-4 py-12">
//           <h2 className="text-2xl font-bold md:text-3xl text-white">Experience</h2>

//           <div className="mt-6 space-y-6 border-l pl-6 border-white/10">
//             {experienceFromCV.map((e) => (
//               <motion.div
//                 key={e.title}
//                 variants={fadeUp}
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true, amount: 0.2 }}
//                 className="relative"
//               >
//                 <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border bg-rich-black border-white/10" />
//                 <div className="rounded-2xl border p-5 shadow-sm border-white/10">
//                   <div className="flex flex-wrap items-center justify-between gap-2">
//                     <div className="text-lg font-semibold text-white">{e.title}</div>
//                     <div className="text-sm text-slate-300">{e.period}</div>
//                   </div>
//                   <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200/90">
//                     {e.details.map((p) => (
//                       <li key={p}>{p}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* Skills & Certificates */}
//         <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
//           <h2 className="text-2xl font-bold md:text-3xl text-white">Skills & Certifications</h2>

//           <div className="mt-6 grid md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-lg font-semibold text-white">Skills</h3>
//               <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
//                 {[
//                   "Python",
//                   "FastAPI",
//                   "SQL",
//                   "Java and Advance Java",
//                   "MongoDB",
//                   "NLP",
//                   "OCR",
//                   "Computer Vision",
//                   "React",
//                   "Tauri",
//                   "PHP",
//                   "Flutter",
//                   "Firebase",
//                   "Blockchain",
//                   "IPFS",
//                 ].map((s) => (
//                   <div key={s} className="rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm border-white/10 text-white">
//                     {s}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Certificates */}
//            <div>
//              <h3 className="text-lg font-semibold">Certificates (click to view)</h3>
//              <ul className="mt-4 space-y-2 text-sm">
//                {certificatesList.map((certificate, i) => (
//                  <CertificateItem key={i} certificate={certificate} />
//                ))}
//              </ul>
//            </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="mt-12 bg-transparent py-8">
//           <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-300">
//             © {new Date().getFullYear()} {CONTACT.name}. All rights reserved.
//           </div>
//         </footer>
//       </main>

//       {/* Compact Contact Card (fixed, inspired by reference) */}
//       <div
//         id="contact-card"
//         className="fixed right-6 bottom-6 z-60 transform transition-all"
//         aria-hidden={false}
//       >
//         <div className="group relative">
//           <div className="rounded-2xl bg-[#071026]/95 border border-white/10 p-3 shadow-xl backdrop-blur flex items-center gap-3 w-64">
//             <div className="flex-shrink-0">
//               <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow">
//                 VJ
//               </div>
//             </div>

//             <div className="flex-1">
//               <div className="text-sm font-semibold text-white">{CONTACT.name}</div>
//               <div className="text-xs text-slate-300">{CONTACT.location}</div>
//               <div className="mt-2 flex items-center gap-2">
//                 <a
//                   href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
//                   className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs bg-white/5 hover:bg-white/10 transition text-white"
//                   aria-label="Call"
//                 >
//                   <Phone className="w-4 h-4" /> <span>{CONTACT.phone}</span>
//                 </a>

//                 <a
//                   href={`mailto:${CONTACT.email}`}
//                   className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs bg-white/5 hover:bg-white/10 transition text-white"
//                   aria-label="Email"
//                 >
//                   <Mail className="w-4 h-4" /> <span>Mail</span>
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* hover CTA bar */}
//           <div className="absolute -bottom-12 right-0 hidden group-hover:flex space-x-2">
//             <a
//               href={CONTACT.github}
//               target="_blank"
//               rel="noreferrer"
//               className="rounded-full bg-black/90 text-white p-2 shadow hover:scale-105 transition"
//               aria-label="GitHub"
//             >
//               <Github className="w-4 h-4" />
//             </a>
//             <a
//               href={CONTACT.linkedin}
//               target="_blank"
//               rel="noreferrer"
//               className="rounded-full bg-blue-600 text-white p-2 shadow hover:scale-105 transition"
//               aria-label="LinkedIn"
//             >
//               <Linkedin className="w-4 h-4" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

// Color palette (tweakable)
const COLORS = {
  richBlack: "#0a2027",
  prussianBlue: "#003459",
  cerulean: "#007ea7",
  pictonBlue: "#00a8e8",
  white: "#ffffff",
};

// Motion helpers
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
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

function CertificateItem({ certificate }: { certificate: { name: string; file: string } }) {
  const [open, setOpen] = useState(false);
  const filePath = `/api/certificates/${certificate.file}`;

  return (
    <li className="rounded-md border p-3 bg-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left font-medium hover:underline"
      >
        {certificate.name}
      </button>

      {open && (
        <div className="mt-3 border rounded-lg overflow-hidden">
          <iframe
            src={filePath}
            className="w-full h-64"
            title={certificate.name}
          />
        </div>
      )}
    </li>
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
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-3 py-1 text-xs font-medium shadow-sm border-white/10">
      {children}
    </span>
  );
}

function ProjectCard({
  project,
}: {
  project: typeof projectsData[0];
}) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative overflow-hidden rounded-2xl border bg-white/5 p-5 shadow-sm backdrop-blur transition hover:shadow-lg border-white/10"
    >
      <div className="flex items-start gap-4">
        <div
          aria-hidden
          className="rounded-2xl p-3 text-white shadow flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${COLORS.pictonBlue}, ${COLORS.cerulean})`,
            minWidth: 44,
            minHeight: 44,
          }}
        >
          <Code2 className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold leading-tight text-white">
            {project.title}
            <span className="ml-2 text-sm font-normal text-slate-300">
              — {project.subtitle}
            </span>
          </h3>
          <p className="mt-2 text-sm text-slate-200/90">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            {project.repo && (
              <a
                href={project.repo}
                className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow border-white/10 text-white"
                aria-label={`View ${project.title} code`}
              >
                Code <Github className="h-4 w-4" />
              </a>
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

  // Short loading spinner UI
  if (loadingShort) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto">
            <div className="w-20 h-20 border-4 border-white/30 rounded-full animate-spin border-t-white mb-4" />
            <div className="absolute inset-0 rounded-full animate-pulse border border-transparent border-t-sky-300/40" />
          </div>
          <div className="text-white text-xl font-semibold tracking-wide mt-2">Loading portfolio...</div>
          <div className="mt-2 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-rich-black text-white min-h-screen">
      {/* Intro Splash (AnimatePresence) from earlier design, increased duration */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-rich-black text-white"
            style={{
              background: `radial-gradient(1200px 600px at 10% -10%, ${COLORS.prussianBlue}33, transparent), radial-gradient(1000px 500px at 100% 0%, ${COLORS.pictonBlue}22, transparent), ${COLORS.richBlack}`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            aria-hidden
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium border-white/10">
                <ShieldCheck className="h-4 w-4" /> AI • NLP/OCR • Blockchain
              </div>
              <h1 className="mt-4 text-5xl font-extrabold tracking-tight md:text-6xl">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-[#00a8e8] to-[#007ea7] bg-clip-text text-transparent">
                  {CONTACT.name}
                </span>
              </h1>
              <p className="mt-3 text-sm md:text-base text-slate-200/90">
                Engineer crafting intelligent, privacy-first experiences.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main
        className="relative min-h-screen bg-rich-black text-white antialiased transition-colors"
        style={{
          background: `radial-gradient(1200px 600px at 10% -10%, ${COLORS.prussianBlue}33, transparent), radial-gradient(1000px 500px at 100% 0%, ${COLORS.pictonBlue}22, transparent), ${COLORS.richBlack}`,
        }}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-[#00171f]/60 backdrop-blur border-white/10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <a href="#home" className="font-semibold tracking-tight" aria-label="Go to home">
              {CONTACT.name}
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-1 text-sm text-slate-300 transition hover:text-[#00a8e8]"
                >
                  <Icon className="w-4 h-4" /> {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section id="home" className="relative flex min-h-[90vh] items-center py-8">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate="show"
            className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2"
          >
             {/* Profile Photo */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <Image
                  src="/photo/Profile.jpg"
                  alt="Profile"
                  width={240}       // set your actual width
                  height={340}      // set your actual height
                  priority          // ensures preloading
                  className="rounded-3xl object-cover shadow-lg border-4 border-[#00a8e8]"
                />
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium border-white/10">
                <ShieldCheck className="h-4 w-4" /> Privacy •  AI/ML •  NLP •  Blockchain
              </div>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl text-white">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-[#00a8e8] to-[#007ea7] bg-clip-text text-transparent">
                  Varad Joshi
                </span>
              </h1>

                <p className="mt-4 max-w-xl text-lg font-medium text-white">
                <span className="bg-gradient-to-r from-[#00a8e8] to-[#007ea7] bg-clip-text text-transparent">
                  Building
                </span>{" "}
                <span className="bg-gradient-to-r from-[#00a8e8] to-[#007ea7] bg-clip-text text-transparent">
                  intelligent
                </span>{" "}
                <span className="bg-gradient-to-r from-[#00a8e8] to-[#007ea7] bg-clip-text text-transparent">
                  and secure experiences.
                </span>
              </p> 

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="rounded-xl border px-4 py-2 font-medium transition hover:-translate-y-0.5 hover:shadow border-white/10 text-white"
                >
                  See Projects
                </a>  
              </div>

              <div className="mt-6 flex items-center gap-4 text-slate-300">
                <a href={CONTACT.github} className="inline-flex items-center gap-2 transition hover:opacity-80" aria-label="GitHub">
                  <Github className="h-5 w-5" /> GitHub
                </a>

                <a href={CONTACT.linkedin} className="inline-flex items-center gap-2 transition hover:opacity-80" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" /> LinkedIn
                </a>

                <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 transition hover:opacity-80" aria-label="Email">
                  <Mail className="h-5 w-5" /> Email
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative col-span-1 md:col-span-2 flex justify-center">
              {/* Decorative card */}
              <div
                className="relative overflow-hidden rounded-3xl border p-6 shadow-lg border-white/10"
                style={{ background: `linear-gradient(180deg, ${COLORS.prussianBlue}1a, transparent)` }}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
                  style={{ background: `radial-gradient(closest-side, ${COLORS.pictonBlue}55, transparent)` }}
                />
                <div
                  className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full blur-3xl"
                  style={{ background: `radial-gradient(closest-side, ${COLORS.cerulean}44, transparent)` }}
                />
                <section >
                <div className="relative z-80 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium shadow backdrop-blur">
                    <Brain className="h-4 w-4" /> AI • Data • Security
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-white">What I love</h3>
                  <p className="mt-1 text-sm text-slate-200/90">
                    Engineer crafting intelligent, privacy-first experiences.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-2xl border p-3 border-white/10">
                      <div className="text-xs text-slate-300">Core Focus</div>
                      <div className="mt-1 font-medium text-white">Software Development, AI/ML, Blockchain</div>
                    </div>

                    <div className="rounded-2xl border p-3 border-white/10">
                      <div className="text-xs text-slate-300">Currently</div>
                      <div className="mt-1 font-medium text-white">PolicyVault Nexus</div>
                    </div>

                    <div className="rounded-2xl border p-3 border-white/10">
                      <div className="text-xs text-slate-300">Vision</div>
                      <div className="mt-1 font-medium text-white">Crafting privacy-first digital solutions
                        Empowering data-driven decisions</div>
                    </div>

                    <div className="rounded-2xl border p-3 border-white/10">
                      <div className="text-xs text-slate-300">Future Focus</div>
                      <div className="mt-1 font-medium text-white">Generative AI • Privacy Driven System</div>
                    </div>
                  </div>
                </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
          <div className="pointer-events-none absolute left-1/2 bottom-6 hidden -translate-x-1/2 md:block">
            <ArrowDown className="h-6 w-6 animate-bounce opacity-60 text-white" />
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-16">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-2xl font-bold md:text-3xl text-white">
            About
          </motion.h2>

          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-3 max-w-3xl text-slate-200/90">
            passionate about technology and innovation. With a strong foundation in
software development, I aim to contribute to real-world projects by
designing, coding, and debugging robust applications., along with strong
communication and adaptability, I aim to contribute to impactful work in
environments that value creativity and growth.
          </motion.p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border p-4 border-white/10">
              <div className="text-xs text-slate-300">Location</div>
              <div className="mt-1 font-medium text-white">{CONTACT.location}</div>
            </div>

            <div className="rounded-2xl border p-4 border-white/10">
              <div className="text-xs text-slate-300">Contact</div>
              <div className="mt-1 font-medium text-white">{CONTACT.phone}</div>
              <div className="text-sm text-slate-300 mt-1">{CONTACT.email}</div>
            </div>

            <div className="rounded-2xl border p-4 border-white/10">
              <div className="text-xs text-slate-300">Education</div>
              <div className="mt-1 font-medium text-white">B.Tech in AI & DS • K.K. Wagh Institute</div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl text-white">Projects</h2>
            <p className="text-sm text-slate-300">Selected work — backend & ML focused</p>
          </div>

          {/* Filter */}
          <div className="mt-4 flex flex-wrap gap-2">
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition hover:-translate-y-0.5 hover:shadow border-white/10 ${
                  filter === t ? "ring-2 ring-[#00a8e8] text-white" : "text-slate-300"
                }`}
                aria-pressed={filter === t}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {filtered.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold md:text-3xl text-white">Achievements & Hackathons</h2>
          <p className="mt-2 text-sm text-slate-300">Selected awards, hackathon results and recognitions.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {achievementsFromCV.map((a) => (
              <motion.div
                key={a.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl border p-4 bg-white/5 shadow-sm border-white/10"
              >
                <div className="text-sm text-slate-300">{a.when}</div>
                <div className="mt-1 font-semibold text-white">{a.title}</div>
                <div className="mt-2 text-sm text-slate-300">{a.detail}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold md:text-3xl text-white">Experience</h2>

          <div className="mt-6 space-y-6 border-l pl-6 border-white/10">
            {experienceFromCV.map((e) => (
              <motion.div
                key={e.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="relative"
              >
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border bg-rich-black border-white/10" />
                <div className="rounded-2xl border p-5 shadow-sm border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-lg font-semibold text-white">{e.title}</div>
                    <div className="text-sm text-slate-300">{e.period}</div>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200/90">
                    {e.details.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills & Certificates */}
        <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold md:text-3xl text-white">Skills & Certifications</h2>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Skills</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  "Python",
                  "FastAPI",
                  "SQL",
                  "Java and Advance Java",
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
                ].map((s) => (
                  <div key={s} className="rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm border-white/10 text-white">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
           <div>
             <h3 className="text-lg font-semibold text-white">Certificates (click to view)</h3>
             <ul className="mt-4 space-y-2 text-sm">
               {certificatesList.map((certificate, i) => (
                 <CertificateItem key={i} certificate={certificate} />
               ))}
             </ul>
           </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 bg-transparent py-8">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-300">
            © {new Date().getFullYear()} {CONTACT.name}. All rights reserved.
          </div>
        </footer>
      </main>

      {/* Compact Contact Card (fixed, inspired by reference) */}
      <div
        id="contact-card"
        className="fixed right-6 bottom-6 z-60 transform transition-all"
        aria-hidden={false}
      >
        <div className="group relative">
          <div className="rounded-2xl bg-[#071026]/95 border border-white/10 p-3 shadow-xl backdrop-blur flex items-center gap-3 w-64">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow">
                VJ
              </div>
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{CONTACT.name}</div>
              <div className="text-xs text-slate-300">{CONTACT.location}</div>
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs bg-white/5 hover:bg-white/10 transition text-white"
                  aria-label="Call"
                >
                  <Phone className="w-4 h-4" /> <span>{CONTACT.phone}</span>
                </a>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs bg-white/5 hover:bg-white/10 transition text-white"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" /> <span>Mail</span>
                </a>
              </div>
            </div>
          </div>

          {/* hover CTA bar */}
          <div className="absolute -bottom-12 right-0 hidden group-hover:flex space-x-2">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black/90 text-white p-2 shadow hover:scale-105 transition"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-blue-600 text-white p-2 shadow hover:scale-105 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}