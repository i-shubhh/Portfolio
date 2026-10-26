/**
 * Pure decoupled business logic for portfolio data filtering,
 * search indexing, architecture inspection, and contact validation.
 */

import { ProjectData } from "../data/projects";
import { LearningEntry, LearningStatus } from "../data/learning";
import { InterestItem } from "../data/interests";

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates the contact draft form inputs
 */
export function validateContactForm(input: ContactFormInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = "Please provide your name (at least 2 characters).";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = "Please provide a valid email address.";
  }

  if (!input.subject || input.subject.trim().length < 3) {
    errors.subject = "Please include a subject (at least 3 characters).";
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Filter projects by category and text search
 */
export function filterProjects(
  projects: ProjectData[],
  categoryFilter: string,
  searchQuery: string
): ProjectData[] {
  return projects.filter((project) => {
    const matchesCategory =
      categoryFilter === "all" ||
      project.category.toLowerCase().includes(categoryFilter.toLowerCase());

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const matchesTitle = project.title.toLowerCase().includes(query);
    const matchesTagline = project.tagline.toLowerCase().includes(query);
    const matchesTech = project.technologies.some((t) =>
      t.toLowerCase().includes(query)
    );
    const matchesDesc = project.starterDescription.toLowerCase().includes(query);

    return matchesTitle || matchesTagline || matchesTech || matchesDesc;
  });
}

/**
 * Filter learning archive by status
 */
export function filterLearningEntries(
  entries: LearningEntry[],
  status: LearningStatus | "ALL"
): LearningEntry[] {
  if (status === "ALL") return entries;
  return entries.filter((entry) => entry.status === status);
}

/**
 * Extract featured project or fallback to first
 */
export function getFeaturedProject(projects: ProjectData[]): ProjectData | null {
  if (!projects.length) return null;
  const featured = projects.find((p) => p.isFeatured);
  return featured || projects[0];
}

/**
 * Unified archive search across projects and interests
 */
export interface SearchResultItem {
  id: string;
  title: string;
  type: "project" | "interest" | "learning";
  subtitle: string;
  matchedField: string;
}

export function searchArchive(
  query: string,
  projects: ProjectData[],
  interests: InterestItem[],
  learning: LearningEntry[]
): SearchResultItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean || clean.length < 2) return [];

  const results: SearchResultItem[] = [];

  // Search projects
  for (const p of projects) {
    if (
      p.title.toLowerCase().includes(clean) ||
      p.technologies.some((t) => t.toLowerCase().includes(clean)) ||
      p.category.toLowerCase().includes(clean)
    ) {
      results.push({
        id: p.id,
        title: p.title,
        type: "project",
        subtitle: p.category,
        matchedField: p.technologies.join(", ")
      });
    }
  }

  // Search interests
  for (const item of interests) {
    if (
      item.title.toLowerCase().includes(clean) ||
      item.summary.toLowerCase().includes(clean) ||
      item.relatedTechnologies.some((t) => t.toLowerCase().includes(clean))
    ) {
      results.push({
        id: item.id,
        title: item.title,
        type: "interest",
        subtitle: item.domainLabel,
        matchedField: item.summary
      });
    }
  }

  // Search learning
  for (const l of learning) {
    if (
      l.topic.toLowerCase().includes(clean) ||
      l.description.toLowerCase().includes(clean) ||
      l.category.toLowerCase().includes(clean)
    ) {
      results.push({
        id: l.id,
        title: l.topic,
        type: "learning",
        subtitle: `${l.category} · ${l.status}`,
        matchedField: l.description
      });
    }
  }

  return results;
}
