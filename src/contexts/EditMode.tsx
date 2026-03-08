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
    "I'm Sajeeb Nandi, a Botany undergraduate at the University of Barishal, Bangladesh. My academic journey has taken me from the laboratory to international research stages, driven by a deep curiosity about plant science and sustainable agriculture.",
  "about.para2":
    "Currently serving as an Admin & HR Intern at the YSSE Social Responsibility Wing, I support organizational operations and social impact initiatives. As a selected OMLAS Fellow, I received training in governance frameworks, public policy analysis, and sustainability — collaborating with an international cohort of emerging leaders.",
  "about.para3":
    "My research focuses on plant growth regulators, floral biology, and vertical farming for urban food security. I am a strong team player with a passion for bridging research, coordination, and communication to create real-world environmental impact.",
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
  "exp.0.point0": "Supporting administrative and HR operations for the social responsibility wing",
  "exp.0.point1": "Assisting in coordination, documentation, and professional communication",
  "exp.0.point2": "Contributing to social impact initiatives and organizational development",

  // Experience – OMLAS
  "exp.1.title": "OMLAS Fellow",
  "exp.1.org": "OMLAS Fellowship",
  "exp.1.period": "Jul 2025 – Oct 2025",
  "exp.1.type": "Fellowship",
  "exp.1.point0": "Training in governance frameworks, public policy analysis, and sustainability",
  "exp.1.point1": "Leadership development through hands-on policy simulation exercises",
  "exp.1.point2": "Collaboration with an international cohort of fellows from diverse backgrounds",

  // Experience – Biology Olympiad
  "exp.2.title": "Regional Organizer",
  "exp.2.org": "Bangladesh Biology Olympiad — Barishal Region",
  "exp.2.period": "Ongoing",
  "exp.2.type": "Volunteer",
  "exp.2.point0": "Managed participant coordination and volunteer teams across the region",
  "exp.2.point1": "Oversaw event logistics and operations for the Biology Olympiad",
  "exp.2.point2": "Fostered engagement of young students in biological sciences",

  // Experience – Botany Club
  "exp.3.title": "Organizer — Botany Club Seminar",
  "exp.3.org": "Event: \"Generation Green: Voices for Climate Resilience\"",
  "exp.3.period": "2024",
  "exp.3.type": "Organizing",
  "exp.3.point0": "Coordinated event management and logistical planning",
  "exp.3.point1": "Led team collaboration and participant engagement activities",
  "exp.3.point2": "Championed climate awareness and environmental advocacy through the event",

  // Research – Marigold
  "res.0.title": "Plant Growth Regulators & Floral Traits of Marigold",
  "res.0.subtitle": "Undergraduate Research Project — Botany",
  "res.0.period": "Jan 2025 – Aug 2025",
  "res.0.badge": "Botany Research",
  "res.0.description":
    "Investigated the effects of plant growth regulators on the floral traits and development of Tagetes erecta (African Marigold). Conducted systematic fieldwork, morphological measurements, and statistical analysis to derive insights into PGR-mediated growth responses.",
  "res.0.point0": "Designed and executed field experiments with controlled PGR treatments",
  "res.0.point1": "Collected morphological and phenological data over the growing season",
  "res.0.point2": "Performed statistical analysis and prepared comprehensive research documentation",
  "res.0.tags": "Plant Biology,Tagetes Erecta,Field Research,Statistical Analysis",

  // Research – Vertical Farming
  "res.1.title": "Soil-less Vertical Farming: Sustainable Fresh Food Production in Urban Areas",
  "res.1.subtitle": "International Poster Presentation Competition",
  "res.1.period": "Jul 2025 – Oct 2025",
  "res.1.badge": "🥈 Silver Innovator Award",
  "res.1.description":
    "Co-authored and presented research on hydroponic and aeroponic vertical farming as a solution to urban food security challenges in Bangladesh. The research received the prestigious Silver Innovator Award at the international competition.",
  "res.1.point0": "Co-authored research on vertical farming for urban Bangladesh context",
  "res.1.point1": "Developed research poster and presentation for international audience",
  "res.1.point2": "Explored hydroponics, aeroponics, and nutrient film technique (NFT) systems",
  "res.1.point3": "Received Silver Innovator Award at the international competition",
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
