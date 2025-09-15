import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Locations } from "@/components/sections/locations";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>
        <Hero />
        <Services />
        <Locations />
        <Projects />

        <section
          id="contact"
          className="min-h-screen bg-gray-50 flex items-center justify-center px-4 md:px-6 lg:px-12 xl:px-16"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-600">Contact section coming soon...</p>
          </div>
        </section>
      </main>
    </div>
  );
}
