/**
 * Social and Contact Links Configuration
 * Configurable with realistic endpoints. Unconfigured links are automatically hidden.
 */

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  iconType: "github" | "linkedin" | "mail" | "file-text" | "globe";
  isPrimary?: boolean;
  actionType?: "link" | "copy" | "download";
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "email",
    label: "ishubham0666@gmail.com",
    url: "mailto:ishubham0666@gmail.com",
    iconType: "mail",
    isPrimary: true,
    actionType: "copy"
  },
  {
    id: "github",
    label: "github.com/i-shubhh",
    url: "https://github.com/i-shubhh",
    iconType: "github",
    isPrimary: true,
    actionType: "link"
  },
  {
    id: "linkedin",
    label: "linkedin.com/in/shubham jha",
    url: "https://www.linkedin.com/in/shubham-jha-416928302/?isSelfProfile=true",
    iconType: "linkedin",
    isPrimary: true,
    actionType: "link"
  },
  {
    id: "resume",
    label: "Curriculum Vitae (PDF)",
    url: "#resume",
    iconType: "file-text",
    isPrimary: false,
    actionType: "download"
  }
];

export interface SiteConfig {
  siteTitle: string;
  curatorTagline: string;
  defaultAccent: "amber" | "cyan" | "emerald" | "crimson";
  contactHeadline: string;
  contactIntro: string;
  footerNote: string;
}

export const SITE_CONFIG: SiteConfig = {
  siteTitle: "SHUBHAM JHA — ARCHIVE & PORTFOLIO",
  curatorTagline: "SRM University–AP · CSE + AI/ML",
  defaultAccent: "amber",
  contactHeadline: "LET’S BUILD SOMETHING INTERESTING.",
  contactIntro: "If you’re working on an interesting problem, want to collaborate on AI systems, or simply want to exchange ideas about technology, let’s connect.",
  footerNote: "Designed & engineered with architectural intent · SRM University–AP"
};
