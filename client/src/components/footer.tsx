import { Github, Linkedin, GraduationCap, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-academic-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Research Portfolio</h3>
            <p className="text-blue-100 mb-4">
              Advancing knowledge through innovative research, technical implementation, and scholarly contributions in computer science and emerging technologies.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/Himanshu7921" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
                data-testid="footer-github-link"
              >
                <Github size={24} />
              </a>
              <a 
                href="#" 
                className="text-blue-200 hover:text-white transition-colors"
                data-testid="footer-linkedin-link"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="#" 
                className="text-blue-200 hover:text-white transition-colors"
                data-testid="footer-scholar-link"
              >
                <GraduationCap size={24} />
              </a>
              <a 
                href="#" 
                className="text-blue-200 hover:text-white transition-colors"
                data-testid="footer-orcid-link"
              >
                <ExternalLink size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Research Areas</h4>
            <ul className="space-y-2 text-blue-100">
              <li data-testid="research-area-ml">Machine Learning</li>
              <li data-testid="research-area-cv">Computer Vision</li>
              <li data-testid="research-area-nlp">Natural Language Processing</li>
              <li data-testid="research-area-security">Privacy & Security</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <button
                  onClick={() => scrollToSection("research")}
                  className="hover:text-white transition-colors text-left"
                  data-testid="footer-link-research"
                >
                  Publications
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("progress")}
                  className="hover:text-white transition-colors text-left"
                  data-testid="footer-link-progress"
                >
                  Research Progress
                </button>
              </li>
              <li>
                <a 
                  href="https://github.com/Himanshu7921"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-code"
                >
                  Code Repository
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-white transition-colors text-left"
                  data-testid="footer-link-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p data-testid="footer-copyright">
            &copy; {currentYear} Research Portfolio. All rights reserved. | Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>
    </footer>
  );
}
