import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Activities from "@/components/Activities";
import Projects from "@/components/Projects";
import NotionArchive from "@/components/NotionArchive";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <About />
      <Activities />
      <Projects />
      <NotionArchive />
      <JoinSection />
      <Footer />
    </main>
  );
}
