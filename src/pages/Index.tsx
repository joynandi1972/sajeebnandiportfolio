import { useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import StatsBar from "@/components/portfolio/StatsBar";
import About from "@/components/portfolio/About";
import Education from "@/components/portfolio/Education";
import Experience from "@/components/portfolio/Experience";
import Research from "@/components/portfolio/Research";
import Skills from "@/components/portfolio/Skills";
import Achievements from "@/components/portfolio/Achievements";
import Gallery from "@/components/portfolio/Gallery";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import EditBar from "@/components/portfolio/EditBar";
import VisitorStats from "@/components/portfolio/VisitorStats";
import { useEditMode } from "@/contexts/EditMode";
import { supabase } from "@/integrations/supabase/client";

interface IndexProps {
  showEdit?: boolean;
}

/** Detect browser name from userAgent */
function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera/")) return "Opera";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Safari/") && !ua.includes("Chrome")) return "Safari";
  return "Other";
}

/** Detect device type */
function getDevice(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
    if (/iPad/i.test(ua)) return "Tablet";
    return "Mobile";
  }
  return "Desktop";
}

const Index = ({ showEdit = false }: IndexProps) => {
  const { setOwnerView } = useEditMode();

  useEffect(() => {
    setOwnerView(showEdit);
  }, [showEdit, setOwnerView]);

  // Content protection for visitors (not owner/edit mode)
  useEffect(() => {
    if (showEdit) return;

    const blockContextMenu = (e: MouseEvent) => e.preventDefault();
    const blockKeyboard = (e: KeyboardEvent) => {
      const blocked = (
        (e.ctrlKey || e.metaKey) && ["c", "s", "a", "u", "p"].includes(e.key.toLowerCase())
      ) || e.key === "F12" || (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase()));
      if (blocked) e.preventDefault();
    };
    const blockDrag = (e: DragEvent) => e.preventDefault();

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockKeyboard);
    document.addEventListener("dragstart", blockDrag);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockKeyboard);
      document.removeEventListener("dragstart", blockDrag);
    };
  }, [showEdit]);

  // Track unique visitor (ip + browser + device fingerprint)
  useEffect(() => {
    const browser = getBrowser();
    const device = getDevice();
    supabase.functions
      .invoke("track-visitor", {
        body: { browser, device },
      })
      .catch(() => {});
  }, []);

  return (
    <div className={`min-h-screen bg-background font-body${!showEdit ? " no-select" : ""}`}>
      {showEdit && <EditBar />}
      {showEdit && <VisitorStats />}
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Education />
        <Experience />
        <Research />
        <Achievements />
        <Skills />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
