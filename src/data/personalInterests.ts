/**
 * Personal Interests & Influences ("Beyond The Code")
 * Reflecting the human behind the engineering: cinema, architecture, essays, and chess.
 */

export interface PersonalInterest {
  id: string;
  category: string;
  title: string;
  reflection: string;
  itemsOrFavorites?: string[];
}

export const PERSONAL_INTERESTS_DATA: PersonalInterest[] = [
  {
    id: "cinema",
    category: "CINEMATOGRAPHY & FILM",
    title: "Atmospheric Visual Pacing & Framing",
    reflection: "Great cinema teaches you that what you withhold is as impactful as what you display. I draw inspiration from directors who command negative space, deliberate long takes, and controlled lighting—principles that translate directly into digital interface design.",
    itemsOrFavorites: ["Blade Runner 2049", "Oppenheimer", "Ex Machina", "Interstellar"]
  },
  {
    id: "architecture",
    category: "SPATIAL ARCHITECTURE",
    title: "Brutalist Forms & Structural Honesty",
    reflection: "An appreciation for exposed concrete, clean structural load paths, and designs that don't disguise how they stand up. In software engineering, structural honesty means avoiding leaky abstractions and celebrating explicit data flows.",
    itemsOrFavorites: ["High-contrast forms", "Honest materials", "Unobstructed circulation", "Negative space"]
  },
  {
    id: "reading",
    category: "LITERATURE & ESSAYS",
    title: "Technical History & Engineering Philosophy",
    reflection: "Reading classic computing papers, memoirs of systems architects, and essays on the sociology of technology. Understanding how early Unix pioneers and distributed systems thinkers navigated constraints provides timeless clarity.",
    itemsOrFavorites: ["Mythical Man-Month", "Designing Data-Intensive Applications", "Structure and Interpretation of Computer Programs"]
  },
  {
    id: "chess",
    category: "STRATEGY & CALCULATION",
    title: "Positional Play & Branching Trees",
    reflection: "Playing chess trains patience: calculating candidate moves, evaluating positional imbalances, and recognizing that short-term tactical attacks fail against solid structural defenses.",
    itemsOrFavorites: ["Positional harmony", "Pawn structure integrity", "Endgame precision"]
  }
];
