"use client";

import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import type { certificates } from "../data/portfolio";

type Certificate = (typeof certificates)[number];

export default function CertificatePreviews({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [closingFile, setClosingFile] = useState<string | null>(null);

  return (
    <div className="certificate-items">
      {certificates.map((certificate, index) => {
        const isOpen = activeFile === certificate.file;
        const hasPreviewContent = isOpen || closingFile === certificate.file;
        const previewId = `certificate-preview-${index}`;
        const source = `/certificates/${encodeURIComponent(certificate.file)}`;

        return (
          <article className="certificate-item" key={certificate.file}>
            <button
              className="certificate-card"
              type="button"
              aria-expanded={isOpen}
              aria-controls={previewId}
              onClick={() => {
                if (isOpen) {
                  setClosingFile(certificate.file);
                  setActiveFile(null);
                } else {
                  setClosingFile(activeFile);
                  setActiveFile(certificate.file);
                }
              }}
            >
              <span className="certificate-type">
                {certificate.format === "PDF" ? "PDF" : "IMG"}
              </span>
              <span className="certificate-info">
                <small>{certificate.issuer}</small>
                <strong>{certificate.name}</strong>
              </span>
              <ChevronDown
                className={isOpen ? "certificate-chevron is-open" : "certificate-chevron"}
                size={17}
                aria-hidden="true"
              />
            </button>
            <div
              className={`certificate-preview${isOpen ? " is-open" : ""}`}
              id={previewId}
              aria-hidden={!isOpen}
              onTransitionEnd={(event) => {
                if (
                  event.target === event.currentTarget &&
                  event.propertyName === "grid-template-rows" &&
                  !isOpen &&
                  closingFile === certificate.file
                ) {
                  setClosingFile(null);
                }
              }}
            >
              <div className="certificate-preview-inner">
                {hasPreviewContent && (
                  <div className="certificate-preview-content">
                    <button
                      className="certificate-close"
                      type="button"
                      aria-label={`Close ${certificate.name} preview`}
                      onClick={() => {
                        setClosingFile(certificate.file);
                        setActiveFile(null);
                      }}
                    >
                      <X size={15} aria-hidden="true" />
                      Close preview
                    </button>
                    {certificate.format === "PDF" ? (
                      <iframe
                        className="certificate-pdf"
                        src={`${source}#toolbar=0&navpanes=0`}
                        title={`${certificate.name} certificate`}
                      />
                    ) : (
                      <div className="certificate-image-frame">
                        <Image
                          src={source}
                          alt={`${certificate.name} certificate`}
                          fill
                          unoptimized
                          sizes="(max-width: 600px) 90vw, 520px"
                          className="certificate-image"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
