import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ResearchSection from "@/components/research-section";
import ProgressSection from "@/components/progress-section";
import GithubSection from "@/components/github-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="font-academic bg-slate-50 text-gray-900">
      <Navigation />
      <HeroSection />
      <ResearchSection />
      <ProgressSection />
      <GithubSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
