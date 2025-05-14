import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { PaperSection } from '../types/paper';

interface TableOfContentsProps {
  sections: PaperSection[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  sections, 
  activeSection, 
  onSectionClick 
}) => {
  const { isDarkMode } = useTheme();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  // Initialize with main sections expanded
  useEffect(() => {
    const initialExpandedState: Record<string, boolean> = {};
    sections.forEach(section => {
      // Expand the section containing the active subsection
      if (typeof section.id === 'string') {
        const mainSectionId = section.id.split('.')[0];
        initialExpandedState[mainSectionId] = true;
      }
    });
    setExpandedSections(initialExpandedState);
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const isMainSection = (id: string) => typeof id === 'string' && id.split('.').length === 1;
  const isSubSection = (id: string) => typeof id === 'string' && id.split('.').length === 2;
  const getMainSectionId = (id: string) => typeof id === 'string' ? id.split('.')[0] : '';

  return (
    <nav className={`rounded-lg p-4 mb-8 md:mb-0 ${
      isDarkMode 
        ? 'bg-slate-800 border border-slate-700' 
        : 'bg-white border border-gray-200 shadow-sm'
    }`}>
      <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
      <ul className="space-y-1">
        {sections.filter(section => isMainSection(section.id)).map(section => {
          const isExpanded = expandedSections[section.id];
          const subsections = sections.filter(s => 
            !isMainSection(s.id) && getMainSectionId(s.id) === section.id
          );
          
          return (
            <li key={section.id} className="mb-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onSectionClick(section.id)}
                  className={`text-left py-1 transition-colors duration-200 ${
                    activeSection === section.id
                      ? isDarkMode
                        ? 'text-indigo-400 font-medium'
                        : 'text-indigo-600 font-medium'
                      : 'hover:text-indigo-500'
                  }`}
                >
                  {section.id}. {section.title}
                </button>
                {subsections.length > 0 && (
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`p-1 rounded-full hover:${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}
                    aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                  >
                    {isExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                )}
              </div>
              
              {/* Subsections */}
              {isExpanded && subsections.length > 0 && (
                <ul className="mt-1 ml-4 space-y-1 border-l-2 pl-2 border-gray-300">
                  {subsections.map(subsection => (
                    <li key={subsection.id}>
                      <button
                        onClick={() => onSectionClick(subsection.id)}
                        className={`text-left py-1 text-sm transition-colors duration-200 ${
                          activeSection === subsection.id
                            ? isDarkMode
                              ? 'text-indigo-400 font-medium'
                              : 'text-indigo-600 font-medium'
                            : 'hover:text-indigo-500'
                        }`}
                      >
                        {subsection.id} {subsection.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;