/**
 * Central configuration and profile metadata for Shubham Jha's Portfolio
 * Fully editable.
 */

export interface ProfileData {
  name: string;
  pronouns?: string;
  role: string;
  headline: string;
  subIntro: string;
  educationLabel: string;
  university: string;
  degree: string;
  specialization: string;
  expectedGraduation: string;
  location: string;
  status: string;
  statusOpen: boolean;
  avatarImage: string;
  bioParagraphs: string[];
  subsections: {
    id: string;
    title: string;
    content: string;
  }[];
}

export const PROFILE_DATA: ProfileData = {
  name: "SHUBHAM JHA",
  pronouns: "he/him",
  role: "CSE + AI/ML Student & Systems Builder",
  headline: "Curious by nature. Building through code.",
  subIntro: "I’m a CSE + AI/ML student exploring intelligent systems, software engineering, and the creative possibilities of technology.",
  educationLabel: "SRM University–AP · Computer Science & Engineering",
  university: "SRM University–AP",
  degree: "B.Tech in Computer Science and Engineering",
  specialization: "Artificial Intelligence and Machine Learning",
  expectedGraduation: "Class of 2027",
  location: "Andhra Pradesh, India",
  status: "Open to Summer 2026 Internships & Technical Collaborations",
  statusOpen: true,
  avatarImage: "/src/assets/images/shubham_portrait_editorial_1793023997644.jpg",
  bioParagraphs: [
    "I’m a Computer Science and Engineering student specializing in AI/ML at SRM University–AP. I enjoy understanding how software works, experimenting with intelligent systems, and turning ideas into things people can actually use.",
    "My interests move between artificial intelligence, software engineering, web development, and the creative possibilities of technology.",
    "I like exploring the systems behind the interface, learning through experimentation, and discovering what becomes possible when engineering meets creativity.",
    "I’m still learning, building, and figuring out what I want to create next. This portfolio documents that journey."
  ],
  subsections: [
    {
      id: "background",
      title: "My Background",
      content: "Growing up fascinated by how digital tools operate under the hood, I began writing code to solve concrete problems. At SRM University–AP, my coursework and self-directed experiments focus on machine learning algorithms, discrete mathematics, and systems programming."
    },
    {
      id: "why-cs",
      title: "Why I Chose Computer Science",
      content: "Computer science offers immediate creative leverage. You can sit with an abstract concept, write deterministic instructions, and construct a functional reality from first principles that can impact thousands of users globally."
    },
    {
      id: "why-ai",
      title: "Why AI Interests Me",
      content: "Artificial intelligence transforms software from static rule-following engines into adaptive reasoning partners. I am particularly drawn to local model inference and agentic workflows—understanding how compact, self-hosted models can perform reliable industrial tasks without external telemetry leaks."
    },
    {
      id: "what-i-build",
      title: "What I Enjoy Building",
      content: "Systems where backend rigor meets tactile frontend interaction. I enjoy building multimodal retrieval pipelines, full-stack web platforms, and experimental digital tools where performance, clear typography, and architecture feel unified."
    },
    {
      id: "philosophy",
      title: "My Learning Philosophy",
      content: "True understanding comes from building from scratch. Rather than relying on superficial abstractions, I prefer diving into the tokenizers, embedding math, socket connections, and memory allocation to verify how systems truly behave."
    },
    {
      id: "next-horizons",
      title: "What I Want to Explore Next",
      content: "Exploring low-latency inference runtimes, speculative decoding, multi-agent evaluation frameworks with verifiable guardrails, and distributed data systems."
    }
  ]
};
