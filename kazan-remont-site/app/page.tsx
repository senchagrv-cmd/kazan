import AIChat from "@/components/AIChat";
import Calculator from "@/components/Calculator";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Reviews from "@/components/Reviews";
import Team from "@/components/Team";
import Trust from "@/components/Trust";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Projects />
        <Trust />
        <Process />
        <Reviews />
        <Team />
        <FAQ />
        <Calculator />
      </main>
      <Footer />
      <AIChat />
    </>
  );
}
