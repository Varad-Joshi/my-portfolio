"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from "../data/portfolio";

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState<
    ProjectCategory | "All"
  >("All");

  const visibleProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((project) =>
            project.categories.includes(activeCategory),
          ),
    [activeCategory],
  );

  return (
    <>
      <div className="project-filters" aria-label="Filter projects by area">
        {(["All", ...projectCategories] as const).map((category) => (
          <button
            type="button"
            className={activeCategory === category ? "filter-active" : ""}
            aria-pressed={activeCategory === category}
            key={category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="project-count" aria-live="polite">
        Showing {visibleProjects.length}{" "}
        {visibleProjects.length === 1 ? "project" : "projects"}
      </p>
      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <article
            className="project-card"
            key={project.name}
          >
            <div className="project-card-top">
              <span className="project-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="project-mark" aria-hidden="true">
                {project.name
                  .split(/[\s·-]+/)
                  .filter(Boolean)
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <div className="project-card-content">
              <ul className="project-categories" aria-label="Project areas">
                {project.categories.slice(0, 2).map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              {project.stack.length > 0 && (
                <ul className="tag-list" aria-label="Technologies">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <details className="project-notes">
                <summary>
                  Project notes <ChevronDown size={15} aria-hidden="true" />
                </summary>
                <p>{project.description}</p>
                {project.sourceNote && (
                  <p className="source-note">{project.sourceNote}</p>
                )}
              </details>
              <div className="project-links">
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.name} source on GitHub`}
                  >
                    GitHub <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="link-unavailable">
                    Repository link not supplied
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
