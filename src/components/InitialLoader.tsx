"use client";

import { useEffect, useState, type CSSProperties } from "react";

export default function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let finished = false;
    let exitTimer: number | undefined;
    let hideTimer: number | undefined;
    const startedAt = performance.now();

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearInterval(progressTimer);
      setProgress(100);
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const minimumVisibleMs = reducedMotion ? 900 : 1800;
      const fadeDurationMs = reducedMotion ? 60 : 420;
      const remainingVisibleMs = Math.max(
        0,
        minimumVisibleMs - (performance.now() - startedAt),
      );

      exitTimer = window.setTimeout(() => {
        setExiting(true);
        hideTimer = window.setTimeout(
          () => setVisible(false),
          fadeDurationMs,
        );
      }, remainingVisibleMs);
    };

    const progressTimer = window.setInterval(() => {
      setProgress((current) =>
        current >= 92 ? current : Math.min(92, current + Math.max(0.5, (92 - current) * 0.06)),
      );
    }, 45);

    window.addEventListener("load", finish, { once: true });
    const fallbackTimer = window.setTimeout(finish, 2500);
    if (document.readyState === "complete") finish();

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(fallbackTimer);
      if (exitTimer) window.clearTimeout(exitTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`initial-loader${exiting ? " is-exiting" : ""}`}
      role="status"
      aria-label={`Loading portfolio, ${Math.round(progress)} percent`}
      style={{ "--loader-progress": `${progress}%` } as CSSProperties}
    >
      <div className="loader-orbit loader-orbit-one" aria-hidden="true" />
      <div className="loader-orbit loader-orbit-two" aria-hidden="true" />
      <div className="loader-content">
        <p className="loader-kicker">Portfolio / 2026</p>
        <h2>VARAD JOSHI</h2>
        <div className="loader-progress-track" aria-hidden="true">
          <span />
        </div>
        <div className="loader-progress-meta">
          <span>Building something thoughtful</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
