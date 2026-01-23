import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { SocialProofBar } from "@/components/sections/social-proof-bar";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { Process } from "@/components/sections/process";
import { About } from "@/components/sections/about";
import { Awards } from "@/components/sections/awards";
import { Locations } from "@/components/sections/locations";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { StickyCTA } from "@/components/ui/sticky-cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>
        <Hero />
        <SocialProofBar />
        <Services />
        <Projects />
        <Testimonials />
        <Process />
        <About />
        <Awards />
        <Locations />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
