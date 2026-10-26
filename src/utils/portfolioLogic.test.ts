import test from "node:test";
import assert from "node:assert/strict";
import {
  validateContactForm,
  filterProjects,
  filterLearningEntries,
  getFeaturedProject,
  searchArchive
} from "./portfolioLogic";
import { PROJECTS_DATA } from "../data/projects";
import { LEARNING_DATA } from "../data/learning";
import { INTERESTS_DATA } from "../data/interests";

test("validateContactForm: validates correct inputs and reports missing fields", () => {
  const invalid = validateContactForm({
    name: "S",
    email: "not-an-email",
    subject: "hi",
    message: "too short"
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: "Alex Researcher",
    email: "alex@example.com",
    subject: "Research Collaboration on Local RAG",
    message: "We would love to discuss your MRPL Sovereign Workbench project."
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test("filterProjects: filters correctly by category and search keyword", () => {
  const allProjects = filterProjects(PROJECTS_DATA, "all", "");
  assert.equal(allProjects.length, PROJECTS_DATA.length);

  const aiOnly = filterProjects(PROJECTS_DATA, "artificial intelligence", "");
  assert.ok(aiOnly.length >= 2);
  assert.ok(aiOnly.some((p) => p.id === "mrpl-sovereign-workbench"));

  const keywordOllama = filterProjects(PROJECTS_DATA, "all", "Ollama");
  assert.ok(keywordOllama.length >= 1);
  assert.equal(keywordOllama[0].id, "mrpl-sovereign-workbench");
});

test("filterLearningEntries: filters entries by status", () => {
  const all = filterLearningEntries(LEARNING_DATA, "ALL");
  assert.equal(all.length, LEARNING_DATA.length);

  const experimenting = filterLearningEntries(LEARNING_DATA, "EXPERIMENTING");
  assert.ok(experimenting.length >= 1);
  assert.ok(experimenting.every((e) => e.status === "EXPERIMENTING"));
});

test("getFeaturedProject: returns featured centerpiece correctly", () => {
  const featured = getFeaturedProject(PROJECTS_DATA);
  assert.ok(featured);
  assert.equal(featured.id, "mrpl-sovereign-workbench");
  assert.equal(featured.isFeatured, true);
});

test("searchArchive: returns multi-domain matches", () => {
  const results = searchArchive("Python", PROJECTS_DATA, INTERESTS_DATA, LEARNING_DATA);
  assert.ok(results.length > 0);
  assert.ok(results.some((r) => r.type === "project"));
});
