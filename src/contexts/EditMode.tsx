import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

// ── Default content ─────────────────────────────────────────────────────────
export const DEFAULT_CONTENT: Record<string, string> = {
  // Hero
  "hero.name.first": "Sajeeb",
  "hero.name.last": "Nandi",
  "hero.role": "Botany Undergraduate · Young Researcher",
  "hero.description":
    "University of Barishal, Bangladesh — Passionate about plant science, sustainable agriculture, and driving research that bridges academia with real-world impact.",
  "hero.status": "Open to Research & Collaboration",
  "hero.badge": "🌿 Plant Scientist",
  "hero.location": "Jashore, Bangladesh",
  "hero.email": "sajeebnandi7@gmail.com",
  "hero.phone": "+8801974-823760",
  "hero.linkedin": "https://www.linkedin.com/in/sajeeb-nandi",

  // About
  "about.title": "About Me",
  "about.para1":
    "Botany undergraduate with hands-on experience in academic research, international research presentation, leadership fellowships, and administrative internships. Currently working as an Admin & HR Intern at the YSSE Social Responsibility Wing, supporting organizational operations and social impact initiatives.",
  "about.para2":
    "Selected OMLAS Fellow with exposure to public policy, sustainability, and leadership development. Completed structured training in governance frameworks, public policy analysis, and sustainable development and leadership skills.",
  "about.para3":
    "Strong team player with research, coordination, and communication skills.",
  "about.tags": "Plant Science,Sustainable Agriculture,Vertical Farming,Leadership,Data Analysis",

  // Education — BSc
  "edu.degree": "Bachelor of Science in Botany",
  "edu.university": "University of Barishal",
  "edu.period": "February 2022 – Present",
  "edu.location": "Barishal, Bangladesh",
  "edu.description":
    "Focused on plant physiology, botany research, and environmental biology. Conducted fieldwork, laboratory experiments, and statistical analysis as part of undergraduate research projects.",
  "edu.group": "",
  "edu.result": "",
  "edu.tags": "Plant Physiology,Field Research,Lab Techniques,Statistical Analysis",

  // Education — HSC
  "hsc.degree": "Higher Secondary School Certificate (HSC)",
  "hsc.university": "Noapara Government College",
  "hsc.period": "2017 – 2019",
  "hsc.location": "Noapara, Jashore",
  "hsc.group": "Group: Science",
  "hsc.result": "GPA 5.00",
  "hsc.description": "",
  "hsc.tags": "",

  // Education — SSC
  "ssc.degree": "Secondary School Certificate (SSC)",
  "ssc.university": "Noapara Shankerpasha Model High School",
  "ssc.period": "2015 – 2017",
  "ssc.location": "Noapara, Jashore",
  "ssc.group": "Group: Science",
  "ssc.result": "GPA 5.00",
  "ssc.description": "",
  "ssc.tags": "",

  // Experience – YSSE
  "exp.0.title": "Admin & HR Intern",
  "exp.0.org": "YSSE Social Responsibility Wing",
  "exp.0.period": "Dec 2025 – Present",
  "exp.0.type": "Internship",
  "exp.0.point0": "Supporting administrative and HR operations within the YSSE Social Responsibility Wing.",
  "exp.0.point1": "Assisting in coordination, documentation, and professional communication.",
  "exp.0.point2": "",

  // Experience – OMLAS
  "exp.1.title": "Fellow — OMLAS Fellowship",
  "exp.1.org": "OMLAS Fellowship",
  "exp.1.period": "Jul 2025 – Oct 2025",
  "exp.1.type": "Fellowship",
  "exp.1.point0": "Selected through a competitive fellowship process focused on leadership development and public policy.",
  "exp.1.point1": "Completed structured training in governance frameworks, public policy analysis, sustainable development and leadership skills.",
  "exp.1.point2": "Collaborated with an international cohort of fellows to discuss, evaluate, and exchange ideas on policy challenges and leadership perspectives.",

  // Experience – Biology Olympiad
  "exp.2.title": "Regional Organizer (Enzyme)",
  "exp.2.org": "Bangladesh Biology Olympiad, Barishal Region",
  "exp.2.period": "May 2026",
  "exp.2.type": "Volunteer",
  "exp.2.point0": "Served as an Enzyme (core organizing member) for the Bangladesh Biology Olympiad 2025, Barishal Reg.",
  "exp.2.point1": "Managed participant coordination, volunteer teams, and on-ground event operations.",
  "exp.2.point2": "",

  // Experience – Botany Club
  "exp.3.title": "Organizer — Botany Club",
  "exp.3.org": "Botany Club",
  "exp.3.period": "Jan 2026",
  "exp.3.type": "Organizing",
  "exp.3.point0": "Organized the seminar \"Generation Green: Voices for Climate Resilience\" focused on climate resilience and youth leadership.",
  "exp.3.point1": "Managed event coordination, participant engagement, and team collaboration.",
  "exp.3.point2": "",

  // Research – Marigold
  "res.0.title": "Plant Growth Regulators & Floral Traits of Marigold",
  "res.0.subtitle": "Research Project (Botany)",
  "res.0.period": "Jan 2025 – Aug 2025",
  "res.0.badge": "Botany Research",
  "res.0.description":
    "Executed an undergraduate research study on plant growth regulators and their impact on growth and floral traits of marigold (Tagetes erecta).",
  "res.0.point0": "Performed fieldwork, data collection, statistical analysis, and research documentation.",
  "res.0.point1": "",
  "res.0.point2": "",
  "res.0.point3": "",
  "res.0.tags": "Plant Biology,Tagetes Erecta,Field Research,Statistical Analysis",

  // Research – Vertical Farming
  "res.1.title": "Soil-less Vertical Farming: Sustainable Fresh Food Production in Urban Areas of Bangladesh",
  "res.1.subtitle": "Research Team Member — International Poster Presentation Competition",
  "res.1.period": "Jul 2025 – Oct 2025",
  "res.1.badge": "🥈 Silver Innovator Award",
  "res.1.description":
    "Co-authored and presented a research study titled \"Soil-less Vertical Farming: Sustainable Fresh Food Production in Urban Areas of Bangladesh\".",
  "res.1.point0": "Awarded Silver Innovator Award for research quality, innovation, and presentation.",
  "res.1.point1": "",
  "res.1.point2": "",
  "res.1.point3": "",
  "res.1.tags": "Vertical Farming,Hydroponics,Urban Agriculture,Sustainability",

  // Skills
  "skill.0.name": "Research & Data Analysis",
  "skill.0.desc": "Fieldwork, statistical methods, and scientific documentation",
  "skill.0.level": "88",
  "skill.1.name": "Scientific Presentation",
  "skill.1.desc": "Poster presentations, seminars, and academic communication",
  "skill.1.level": "82",
  "skill.2.name": "Leadership & Teamwork",
  "skill.2.desc": "Fellowship, organizing, and team coordination",
  "skill.2.level": "85",
  "skill.3.name": "Event Coordination",
  "skill.3.desc": "Biology Olympiad, club seminars, and outreach events",
  "skill.3.level": "80",
  "skill.4.name": "Communication & Documentation",
  "skill.4.desc": "Professional writing, reporting, and stakeholder communication",
  "skill.4.level": "87",

  // Microsoft Office
  "skill.5.name": "MS Word",
  "skill.5.desc": "Document writing, formatting, and academic reporting",
  "skill.5.level": "90",
  "skill.6.name": "MS Excel",
  "skill.6.desc": "Data entry, formulas, charts, and spreadsheet analysis",
  "skill.6.level": "90",
  "skill.7.name": "MS PowerPoint",
  "skill.7.desc": "Presentation design for academic and research purposes",
  "skill.7.level": "90",

  // Achievements
  "ach.0.title": "Silver Innovator Award",
  "ach.0.org": "International Poster Presentation Competition",
  "ach.0.year": "2025",
  "ach.0.description":
    'Awarded the Silver Innovator Award for co-authoring the research "Soil-less Vertical Farming: Sustainable Fresh Food Production in Urban Areas of Bangladesh" at an international level competition.',
  "ach.1.title": "OMLAS Fellow",
  "ach.1.org": "OMLAS Fellowship Program",
  "ach.1.year": "2025",
  "ach.1.description":
    "Competitively selected as an OMLAS Fellow for outstanding leadership potential. Received intensive training in public policy, governance frameworks, sustainability, and global leadership.",
  "ach.2.title": "Regional Organizer",
  "ach.2.org": "Bangladesh Biology Olympiad",
  "ach.2.year": "Ongoing",
  "ach.2.description":
    "Recognized for exceptional organizational leadership in managing the Barishal region of the Bangladesh Biology Olympiad, inspiring hundreds of students toward biological sciences.",

  // Stats
  "stats.0.value": "2",
  "stats.0.label": "Research Projects",
  "stats.0.sub": "Plant science & urban farming",
  "stats.1.value": "1",
  "stats.1.label": "International Award",
  "stats.1.sub": "Silver Innovator Award",
  "stats.2.value": "3",
  "stats.2.label": "Events Organized",
  "stats.2.sub": "Olympiad, seminars & outreach",
  "stats.3.value": "2",
  "stats.3.label": "Fellowships & Internships",
  "stats.3.sub": "OMLAS Fellow · YSSE Intern",

  // Research interests
  "research.interests": "Plant Science Research,Sustainable Agriculture,Vertical & Urban Farming,Environmental Sustainability,Climate Resilience,Plant Growth Regulators",

  // Footer
  "footer.tagline": "Botany Undergraduate & Young Researcher from Bangladesh. Passionate about plant science and sustainable agriculture.",
};

const STORAGE_KEY = "sajeeb_portfolio_content";

// ── Context ──────────────────────────────────────────────────────────────────
interface EditModeContextType {
  isEditing: boolean;
  isOwnerView: boolean;
  content: Record<string, string>;
  get: (key: string) => string;
  set: (key: string, value: string) => void;
  save: () => void;
  cancel: () => void;
  startEditing: () => void;
  hasChanges: boolean;
  setOwnerView: (v: boolean) => void;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const loadSaved = (): Record<string, string> => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_CONTENT, ...JSON.parse(saved) } : { ...DEFAULT_CONTENT };
    } catch {
      return { ...DEFAULT_CONTENT };
    }
  };

  const [content, setContent] = useState<Record<string, string>>(loadSaved);
  const [draft, setDraft] = useState<Record<string, string>>({ ...content });
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isOwnerView, setOwnerView] = useState(false);

  const startEditing = useCallback(() => {
    setDraft({ ...content });
    setIsEditing(true);
    setHasChanges(false);
  }, [content]);

  const set = useCallback((key: string, value: string) => {
    setDraft(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  }, []);

  const get = useCallback((key: string) => {
    return isEditing ? (draft[key] ?? DEFAULT_CONTENT[key] ?? "") : (content[key] ?? DEFAULT_CONTENT[key] ?? "");
  }, [isEditing, draft, content]);

  const save = useCallback(() => {
    setContent({ ...draft });
    const overrides: Record<string, string> = {};
    for (const key of Object.keys(draft)) {
      if (draft[key] !== DEFAULT_CONTENT[key]) overrides[key] = draft[key];
    }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides)); } catch {}
    setIsEditing(false);
    setHasChanges(false);
  }, [draft]);

  const cancel = useCallback(() => {
    setDraft({ ...content });
    setIsEditing(false);
    setHasChanges(false);
  }, [content]);

  return (
    <EditModeContext.Provider value={{ isEditing, isOwnerView, content: isEditing ? draft : content, get, set, save, cancel, startEditing, hasChanges, setOwnerView }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be inside EditModeProvider");
  return ctx;
}
