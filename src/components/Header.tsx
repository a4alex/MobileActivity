import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToReferences = () => {
    const referencesSection = document.getElementById('section-13');
    if (referencesSection) {
      const offset = 100; // Adjust this value as needed
      const elementPosition = referencesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.error('References section not found');
    }
  };

  const scrollToIntroduction = () => {
    const introductionSection = document.getElementById('section-1');
    if (introductionSection) {
      const offset = 230; // Adjust this value as needed
      const elementPosition = introductionSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.error('Introduction section not found');
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? `${isDarkMode ? 'bg-slate-800/95 shadow-lg shadow-slate-900/20' : 'bg-white/95 shadow-lg shadow-slate-200/50'} backdrop-blur-sm` 
          : `${isDarkMode ? 'bg-slate-900' : 'bg-white'}`
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-2">
            <FileText className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <span className="text-xl font-semibold tracking-tight">Mobile Security Research</span>
          </div>
          <div className="mb-0">
            <h2 className="text-5xl font-bold">Research Paper</h2>
          </div>
          
          <div className="hidden md:flex items-center justify-center space-x-8">
            <nav className="flex items-center space-x-6">
              <a href="#" onClick={scrollToIntroduction} className={`hover:${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} transition-colors duration-200`}>Overview</a>
              <a href="#" onClick={scrollToReferences} className={`hover:${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} transition-colors duration-200`}>References</a>
              <a href="#" className={`hover:${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} transition-colors duration-200`}>Export</a>
            </nav>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'} transition-colors duration-200`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-slate-800' : 'bg-white'} border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-100'}`}>
          <nav className="flex flex-col py-4 px-4 space-y-4">
            <a href="#" onClick={scrollToIntroduction} className={`py-2 px-4 rounded ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>Overview</a>
            <a href="#" className={`py-2 px-4 rounded ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>Research Paper</a>
            <a href="#" onClick={scrollToReferences} className={`py-2 px-4 rounded ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>References</a>
            <a href="#" className={`py-2 px-4 rounded ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>Export</a>
            <div className="flex items-center">
              <button 
                onClick={toggleTheme}
                className={`flex items-center px-4 py-2 rounded ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
              >
                {isDarkMode ? (
                  <>
                    <Sun size={20} className="mr-2 text-yellow-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={20} className="mr-2" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;