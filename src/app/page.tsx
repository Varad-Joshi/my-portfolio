import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BrainCircuit,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import CertificatePreviews from "../components/CertificatePreviews";
import ContactForm from "../components/ContactForm";
import InitialLoader from "../components/InitialLoader";
import ProjectGallery from "../components/ProjectGallery";
import ScrollReveal from "../components/ScrollReveal";
import SiteHeader from "../components/SiteHeader";
import {
  achievements,
  certificates,
  contact,
  education,
  experience,
  skillGroups,
} from "../data/portfolio";

const socialLinks = [
  { label: "GitHub", href: contact.github, icon: Github },
  { label: "LinkedIn", href: contact.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${contact.email}`, icon: Mail },
];

function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-heading-main">
        <p className="eyebrow">
          <span>{index}</span> {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Varad Joshi",
    jobTitle: "Software Engineer",
    description:
      "Software engineer interested in AI, Generative AI, intelligent automation, privacy and enterprise technology.",
    email: contact.email,
    image: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-varadjoshi.vercel.app"}/photo/Profile.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nashik",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: [contact.github, contact.linkedin],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <InitialLoader />
      <SiteHeader />

      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" aria-hidden="true" />
              Software Engineer <span aria-hidden="true">/</span> AI &amp; GenAI
            </p>
            <h1 className="hero-title">
              Building intelligent systems.
              <br />
              <span>
                Engineering
                <br />
                real-world solutions.
              </span>
            </h1>
            <p className="hero-summary">
              I&apos;m Varad Joshi, an engineer exploring AI, Generative AI,
              software engineering, automation, data privacy and enterprise
              technology. I turn complex problems into practical products
              through experimentation and thoughtful engineering.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore projects <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a
                className="button button-secondary"
                href={`mailto:${contact.email}?subject=Resume%20request`}
              >
                Request resume <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <p className="resume-note">
              A resume PDF was not included in the repository. This link opens
              an email request instead.
            </p>
            <div className="hero-meta">
              <span>
                <MapPin size={15} aria-hidden="true" />
                {contact.location}
              </span>
              <div className="social-links" aria-label="Social profiles">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    href={href}
                    key={label}
                    aria-label={label}
                    target={label === "Email" ? undefined : "_blank"}
                    rel={label === "Email" ? undefined : "noreferrer"}
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-orbit orbit-a" aria-hidden="true" />
            <div className="visual-orbit orbit-b" aria-hidden="true" />
            <div className="portrait-frame">
              <Image
                src="/photo/Profile.jpg"
                alt="Varad Joshi"
                fill
                priority
                sizes="(max-width: 760px) 78vw, 430px"
                className="portrait-image"
              />
              <div className="portrait-overlay">
                <span>Curious by nature.</span>
                <span>Builder by practice.</span>
              </div>
            </div>
            <div className="visual-caption">
              <span className="caption-icon">
                <BrainCircuit size={17} aria-hidden="true" />
              </span>
              <span>
                <strong>People-first technology</strong>
                <small>Built with intention</small>
              </span>
            </div>
            <span className="visual-index">VJ / 01</span>
          </div>
          <a className="scroll-cue" href="#about">
            Scroll to explore <ArrowDown size={15} aria-hidden="true" />
          </a>
        </section>

        <ScrollReveal>
          <section className="about-section section-wrap" id="about">
            <SectionHeading
              index="01"
              eyebrow="About me"
              title="Curiosity, shaped into useful technology."
              description="My work sits across software, intelligent systems, privacy and enterprise technology."
            />
            <div className="about-grid">
              <div className="about-copy">
                <p>
                  I&apos;ve Completed  B.Tech in Artificial Intelligence and Data
                  Science at K.K. Wagh Institute. I enjoy taking ideas from
                  models and prototypes to practical software people can use.
                </p>
                <p>
                  From decentralized identity and privacy-first tools to
                  computer vision and automation, I&apos;m motivated by
                  thoughtful engineering, collaborative teams and technology
                  that respects the people behind the data.
                </p>
                <a className="inline-link" href="#experience">
                  Explore my experience{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="focus-grid">
                <article className="focus-card">
                  <BrainCircuit size={20} aria-hidden="true" />
                  <h3>Applied AI</h3>
                  <p>Machine learning, GenAI and evaluation.</p>
                </article>
                <article className="focus-card">
                  <ShieldCheck size={20} aria-hidden="true" />
                  <h3>Privacy &amp; trust</h3>
                  <p>Secure systems built with data privacy in mind.</p>
                </article>
                <article className="focus-card">
                  <Sparkles size={20} aria-hidden="true" />
                  <h3>Engineering</h3>
                  <p>Useful software, automation and reliable services.</p>
                </article>
                <article className="focus-card">
                  <GraduationCap size={20} aria-hidden="true" />
                  <h3>Always learning</h3>
                  <p>Learning by building and testing real ideas.</p>
                </article>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="experience-section section-wrap" id="experience">
            <SectionHeading
              index="02"
              eyebrow="Experience"
              title="Learning by doing."
              description="A mix of enterprise exposure, internships and research work."
            />
            <div className="experience-list">
              {experience.map((item) => (
                <article
                  className="experience-card"
                  key={item.organization}
                >
                  <div className="experience-marker" aria-hidden="true" />
                  <div className="experience-topline">
                    <p className="experience-period">{item.period}</p>
                    <h3>{item.role}</h3>
                    <p className="experience-org">{item.organization}</p>
                  </div>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  {item.sourceNote && (
                    <p className="source-note">{item.sourceNote}</p>
                  )}
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="projects-section section-wrap" id="projects">
            <SectionHeading
              index="03"
              eyebrow="Selected work"
              title="Ideas, built into systems."
              description="Browse projects by engineering area. Repository links are included when available."
            />
            <ProjectGallery />
            <a
              className="all-work-link"
              href={contact.github}
              target="_blank"
              rel="noreferrer"
            >
              More on GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="skills-section" id="skills">
            <div className="section-wrap">
              <SectionHeading
                index="04"
                eyebrow="Technical skills"
                title="A broad engineering toolkit."
                description="Skills are grouped by area; no arbitrary rating scales."
              />
              <div className="skills-grid">
                {skillGroups.map((group, index) => (
                  <details
                    className="skill-card"
                    key={group.label}
                    open
                  >
                    <summary>
                      <span className="skill-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{group.label}</span>
                      <ArrowDown size={15} aria-hidden="true" />
                    </summary>
                    <ul>
                      {group.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="education-section section-wrap" id="education">
            <SectionHeading
              index="05"
              eyebrow="Education"
              title="The foundations."
              description="Academic information present in the supplied profile."
            />
            <div className="education-card">
              <span className="education-icon">
                <GraduationCap size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="education-period">
                  {education[0].period || "Dates not provided"}
                </p>
                <h3>{education[0].qualification}</h3>
                <p>{education[0].institution}</p>
                <small>{education[0].note}</small>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="recognition-section section-wrap" id="recognition">
            <SectionHeading
              index="06"
              eyebrow="Recognition & learning"
              title="Milestones along the way."
              description="Competition results and certificates available in the project materials."
            />
            <div className="recognition-grid">
              <div className="achievement-list">
                <h3 className="subsection-title">Achievements</h3>
                {achievements.map((achievement) => (
                  <article className="achievement-card" key={achievement.title}>
                    <span className="achievement-year">
                      {achievement.period}
                    </span>
                    <div>
                      <h4>{achievement.title}</h4>
                      <p>{achievement.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="certificate-list">
                <h3 className="subsection-title">Certificates</h3>
                <CertificatePreviews certificates={certificates} />
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="contact-section" id="contact">
            <div className="section-wrap contact-inner">
              <div className="contact-copy">
                <p className="eyebrow">07 / Contact</p>
                <h2>
                  Let&apos;s build something <span>meaningful.</span>
                </h2>
                <p>
                  Open to thoughtful projects, collaborations and
                  conversations about AI and software.
                </p>
              </div>
              <div className="contact-card">
                <p>Send a note directly to my inbox.</p>
                <ContactForm />
                <a className="contact-email" href={`mailto:${contact.email}`}>
                  Or email me at {contact.email}
                </a>
                <span className="contact-location">
                  <MapPin size={15} aria-hidden="true" />
                  {contact.location}
                </span>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-inner">
          <a className="wordmark" href="#home" aria-label="Back to top">
            <Image
              src="/image_2725b09a.jpg"
              alt=""
              width={1024}
              height={1024}
              className="wordmark-logo"
            />
          </a>
          <p>Designed with care. Built by Varad Joshi.</p>
          <div className="footer-socials">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                href={href}
                key={label}
                aria-label={label}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noreferrer"}
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            ))}
            <a className="back-to-top" href="#home">
              Back to top <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
