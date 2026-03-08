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

interface IndexProps {
  showEdit?: boolean;
}

const Index = ({ showEdit = false }: IndexProps) => {
  return (
    <div className="min-h-screen bg-background font-body">
      {showEdit && <EditBar />}
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
