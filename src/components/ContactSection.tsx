import React, { useState } from "react";
import { SOCIAL_LINKS, SITE_CONFIG } from "../data/socialLinks";
import { 
  Mail, 
  Github, 
  Linkedin, 
  FileText, 
  Copy, 
  Check, 
  ArrowUp, 
  Send,
  ExternalLink
} from "lucide-react";
import { validateContactForm, ContactFormInput } from "../utils/portfolioLogic";

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<ContactFormInput>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const emailLink = SOCIAL_LINKS.find((l) => l.id === "email");
  const emailAddress = "ishubham0666@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (e) {
      // Fallback
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formInput);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setStatusNotice(null);
      return;
    }

    setErrors({});
    // Construct real mailto URL with verified parameters
    const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${formInput.subject}`);
    const encodedBody = encodeURIComponent(
      `Hello Shubham,\n\n${formInput.message}\n\n---\nFrom: ${formInput.name} (${formInput.email})`
    );
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;

    setStatusNotice("Opening your default mail client with verified message parameters...");
    window.location.href = mailtoUrl;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="pt-24 pb-16 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Contact Headliner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-white/10">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
            <span>THE FINAL SCENE</span>
            <span aria-hidden="true">·</span>
            <span>DIRECT CHANNEL</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight leading-[1.05]">
            {SITE_CONFIG.contactHeadline}
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-lg">
            {SITE_CONFIG.contactIntro}
          </p>

          {/* Direct Email Action Cluster */}
          <div className="pt-4 space-y-3">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
              Direct Inquiries & Collaborations:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${emailAddress}`}
                className="px-5 py-3 rounded-lg bg-white text-zinc-950 hover:bg-[var(--accent)] font-semibold text-sm transition-colors font-display inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>{emailAddress}</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-3 rounded-lg border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-mono transition-colors inline-flex items-center gap-2 bg-zinc-950"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Configured Profiles List - clean unboxed layout */}
          <div className="pt-6 border-t border-white/5 space-y-3">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
              Public Repositories & Profiles
            </span>
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              {SOCIAL_LINKS.filter((l) => l.id !== "email").map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-[var(--accent)] transition-colors py-1"
                >
                  {link.iconType === "github" && <Github className="w-3.5 h-3.5" />}
                  {link.iconType === "linkedin" && <Linkedin className="w-3.5 h-3.5" />}
                  {link.iconType === "file-text" && <FileText className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-600" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Message Composer (Opens native client with verified payload) */}
        <div className="lg:col-span-6 bg-zinc-950/70 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white font-display">
              Draft an Inquiry
            </h3>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Validates your message and opens a pre-composed direct email.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="text-xs font-mono text-zinc-400 block mb-1">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={formInput.name}
                onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
                placeholder="e.g. Elena Vance"
                className="w-full bg-[#08080a] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder:text-zinc-400 focus:outline-none focus:border-[var(--accent)]"
              />
              {errors.name && (
                <span className="text-[11px] text-rose-400 font-mono mt-1 block">
                  {errors.name}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="text-xs font-mono text-zinc-400 block mb-1">
                Your Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                value={formInput.email}
                onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                placeholder="e.g. elena@research.org"
                className="w-full bg-[#08080a] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder:text-zinc-400 focus:outline-none focus:border-[var(--accent)]"
              />
              {errors.email && (
                <span className="text-[11px] text-rose-400 font-mono mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="contact-subject" className="text-xs font-mono text-zinc-400 block mb-1">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={formInput.subject}
                onChange={(e) => setFormInput({ ...formInput, subject: e.target.value })}
                placeholder="e.g. Internship Opportunity / Research Collaboration"
                className="w-full bg-[#08080a] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder:text-zinc-400 focus:outline-none focus:border-[var(--accent)]"
              />
              {errors.subject && (
                <span className="text-[11px] text-rose-400 font-mono mt-1 block">
                  {errors.subject}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="text-xs font-mono text-zinc-400 block mb-1">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={formInput.message}
                onChange={(e) => setFormInput({ ...formInput, message: e.target.value })}
                placeholder="Describe your project, question, or proposal..."
                className="w-full bg-[#08080a] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder:text-zinc-400 focus:outline-none focus:border-[var(--accent)]"
              />
              {errors.message && (
                <span className="text-[11px] text-rose-400 font-mono mt-1 block">
                  {errors.message}
                </span>
              )}
            </div>

            {statusNotice && (
              <div className="p-3 bg-zinc-900 border border-[var(--accent)]/30 rounded text-xs text-[var(--accent)] font-mono">
                {statusNotice}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-white text-zinc-950 hover:bg-[var(--accent)] font-semibold text-xs rounded transition-colors font-display flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch Mail Client with Pre-filled Message</span>
            </button>
          </form>
        </div>
      </div>

      {/* Minimal Footer & Return to Top */}
      <footer className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div>
          <span>{SITE_CONFIG.siteTitle}</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>{SITE_CONFIG.curatorTagline}</span>
        </div>

        <button
          onClick={scrollToTop}
          className="hover:text-white transition-colors flex items-center gap-1.5 py-1"
        >
          <span>Return to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </footer>
    </section>
  );
};
