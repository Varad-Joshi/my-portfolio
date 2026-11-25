"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "../data/portfolio";

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleSections[0]?.target.id) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#home" aria-label="Varad Joshi, home">
          <Image
            src="/image_2725b09a.jpg"
            alt=""
            width={1024}
            height={1024}
            priority
            className="wordmark-logo"
          />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ label, href }) => {
            const id = href.slice(1);
            return (
              <a
                href={href}
                key={id}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {label}
              </a>
            );
          })}
        </nav>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? "mobile-navigation" : undefined}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
          {menuOpen ? (
            <X size={18} aria-hidden="true" />
          ) : (
            <Menu size={18} aria-hidden="true" />
          )}
        </button>
        {menuOpen && (
          <nav
            className="mobile-nav-panel"
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {navigation.map(({ label, href }) => {
              const id = href.slice(1);
              return (
                <a
                  href={href}
                  key={id}
                  aria-current={activeSection === id ? "location" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
