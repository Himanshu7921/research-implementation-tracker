import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-academic-blue">Research Portfolio</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-academic-gray hover:text-academic-blue-light transition-colors duration-200 px-3 py-2 text-sm font-medium"
                data-testid="nav-home"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("research")}
                className="text-academic-gray hover:text-academic-blue-light transition-colors duration-200 px-3 py-2 text-sm font-medium"
                data-testid="nav-research"
              >
                Research
              </button>
              <button
                onClick={() => scrollToSection("progress")}
                className="text-academic-gray hover:text-academic-blue-light transition-colors duration-200 px-3 py-2 text-sm font-medium"
                data-testid="nav-progress"
              >
                Progress
              </button>
              <button
                onClick={() => scrollToSection("github")}
                className="text-academic-gray hover:text-academic-blue-light transition-colors duration-200 px-3 py-2 text-sm font-medium"
                data-testid="nav-github"
              >
                GitHub
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-academic-gray hover:text-academic-blue-light transition-colors duration-200 px-3 py-2 text-sm font-medium"
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-academic-gray hover:text-academic-blue-light p-2"
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-200">
              <button
                onClick={() => scrollToSection("home")}
                className="text-academic-gray hover:text-academic-blue-light block px-3 py-2 text-base font-medium w-full text-left"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("research")}
                className="text-academic-gray hover:text-academic-blue-light block px-3 py-2 text-base font-medium w-full text-left"
                data-testid="mobile-nav-research"
              >
                Research
              </button>
              <button
                onClick={() => scrollToSection("progress")}
                className="text-academic-gray hover:text-academic-blue-light block px-3 py-2 text-base font-medium w-full text-left"
                data-testid="mobile-nav-progress"
              >
                Progress
              </button>
              <button
                onClick={() => scrollToSection("github")}
                className="text-academic-gray hover:text-academic-blue-light block px-3 py-2 text-base font-medium w-full text-left"
                data-testid="mobile-nav-github"
              >
                GitHub
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-academic-gray hover:text-academic-blue-light block px-3 py-2 text-base font-medium w-full text-left"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
