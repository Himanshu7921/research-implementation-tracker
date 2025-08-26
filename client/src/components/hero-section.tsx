import { FlaskConical, Code, GraduationCap, Users } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="academic-gradient text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                Hi, I'm Himanshu Singh
              </h2>
              <p className="text-xl lg:text-2xl text-blue-100 mb-6">
                2nd Year B.Tech CSE-AIML Student
              </p>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Research Implementation Tracker
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-blue-100 leading-relaxed">
              This site serves as a research tracker where I document all the research papers I've implemented in Machine Learning, Deep Learning, and Quantum Computing, along with live demos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("research")}
                className="bg-white text-academic-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
                data-testid="button-view-research"
              >
                View Research
              </button>
              <a
                href="https://himanshu-singh-ml-engineer.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-academic-blue transition-all duration-200 text-center"
                data-testid="button-view-portfolio"
              >
                View Full Portfolio
              </a>
            </div>
          </div>
          
          <div className="lg:text-right animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/20 rounded-lg p-4 text-center" data-testid="stat-papers">
                  <FlaskConical className="mx-auto text-3xl mb-2" size={32} />
                  <p className="text-sm font-medium">4 Research Papers Read</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center" data-testid="stat-implementations">
                  <Code className="mx-auto text-3xl mb-2" size={32} />
                  <p className="text-sm font-medium">2 Implemented</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center" data-testid="stat-conferences">
                  <GraduationCap className="mx-auto text-3xl mb-2" size={32} />
                  <p className="text-sm font-medium">Research Areas</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center" data-testid="stat-collaborations">
                  <Users className="mx-auto text-3xl mb-2" size={32} />
                  <p className="text-sm font-medium">0 Collaborations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
