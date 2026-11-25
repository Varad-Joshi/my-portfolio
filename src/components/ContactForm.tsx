"use client";

import { Mail, Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { contact } from "../data/portfolio";

type SubmissionStatus = {
  type: "success" | "error";
  message: string;
};

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus | null>(null);
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  function openEmailApp() {
    const form = formRef.current;
    if (!form?.reportValidity()) return;

    const formData = new FormData(form);
    const subject = String(formData.get("subject"));
    const body = [
      `Name: ${String(formData.get("name"))}`,
      `Email: ${String(formData.get("email"))}`,
      "",
      String(formData.get("message")),
    ].join("\n");
    const query = `subject=${encodeURIComponent(`Portfolio contact: ${subject}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = `mailto:${contact.email}?${query}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    submitting.current = true;
    setPending(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });
      const result: unknown = await response.json();
      const errorMessage =
        typeof result === "object" &&
        result !== null &&
        "error" in result &&
        typeof result.error === "string"
          ? result.error
          : null;

      if (!response.ok) {
        setStatus({
          type: "error",
          message: errorMessage ?? "Your message could not be sent. Please try again.",
        });
        return;
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Thanks for reaching out. Your message has been sent.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Could not connect to the email service. Please try again shortly.",
      });
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <label>
          <span>Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
          />
        </label>
      </div>
      <label>
        <span>Subject</span>
        <input name="subject" type="text" maxLength={150} required />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows={5} maxLength={5000} required />
      </label>
      <label className="contact-honeypot" aria-hidden="true">
        <span>Leave this field empty</span>
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
      <div className="contact-form-actions">
        <button
          className="button button-primary contact-submit"
          type="submit"
          disabled={pending}
        >
          {pending ? "Sending…" : "Send message"}
          <Send size={15} aria-hidden="true" />
        </button>
        <button
          className="button button-secondary contact-submit"
          type="button"
          onClick={openEmailApp}
          disabled={pending}
        >
          Open in email app
          <Mail size={15} aria-hidden="true" />
        </button>
      </div>
      <p className="contact-form-status" aria-live="polite" role="status">
        {status && (
          <span className={`form-message form-message-${status.type}`}>
            {status.message}
          </span>
        )}
      </p>
    </form>
  );
}
