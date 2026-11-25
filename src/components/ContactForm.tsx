"use client";

import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { contact } from "../data/portfolio";

export default function ContactForm() {
  const [validationMessage, setValidationMessage] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationMessage("");
    setFallbackUrl(null);

    const form = event.currentTarget;
    const nameField = form.elements.namedItem("name") as HTMLInputElement;
    const emailField = form.elements.namedItem("email") as HTMLInputElement;
    const subjectField = form.elements.namedItem("subject") as HTMLInputElement;
    const messageField = form.elements.namedItem("message") as HTMLTextAreaElement;
    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const subject = subjectField.value.trim();
    const message = messageField.value.trim();

    if (!name) {
      setValidationMessage("Please enter your name.");
      nameField.focus();
      return;
    }
    if (!email || !emailField.validity.valid) {
      setValidationMessage("Please enter a valid email address.");
      emailField.focus();
      return;
    }
    if (!subject) {
      setValidationMessage("Please enter a subject.");
      subjectField.focus();
      return;
    }
    if (!message) {
      setValidationMessage("Please enter a message.");
      messageField.focus();
      return;
    }

    const body = `Hello Varad,\n\n${message}\n\nRegards,\n${name}\nEmail: ${email}`;
    const composeUrl = new URL("https://mail.google.com/mail/");
    composeUrl.searchParams.set("view", "cm");
    composeUrl.searchParams.set("fs", "1");
    composeUrl.searchParams.set("to", contact.email);
    composeUrl.searchParams.set("su", subject);
    composeUrl.searchParams.set("body", body);

    const composeWindow = window.open(composeUrl.toString(), "_blank");
    if (composeWindow) {
      composeWindow.opener = null;
    } else {
      setFallbackUrl(composeUrl.toString());
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      onChange={() => {
        setValidationMessage("");
        setFallbackUrl(null);
      }}
    >
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
      <div className="contact-form-actions">
        <button className="button button-primary contact-submit" type="submit">
          Send Message
          <Mail size={15} aria-hidden="true" />
        </button>
      </div>
      <p className="contact-form-note">
        Your message will open in Gmail with your details prefilled. Review and
        click Send in Gmail to complete delivery.
      </p>
      {(validationMessage || fallbackUrl) && (
        <p
          className="contact-form-status"
          aria-live="polite"
          role={validationMessage ? "alert" : "status"}
        >
          {validationMessage ? (
            <span className="form-message form-message-error">
              {validationMessage}
            </span>
          ) : (
            <span className="form-message form-message-error">
              Gmail could not be opened automatically.{" "}
              <a href={fallbackUrl ?? undefined} target="_blank" rel="noreferrer">
                Open your prepared Gmail draft
              </a>
              .
            </span>
          )}
        </p>
      )}
    </form>
  );
}
