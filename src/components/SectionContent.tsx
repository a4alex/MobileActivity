import React from 'react';
import { useTheme } from './ThemeContext';
import { PaperSection } from '../types/paper';

interface SectionContentProps {
  section: PaperSection;
  registerRef: (id: string, ref: HTMLDivElement) => void;
}

const SectionContent: React.FC<SectionContentProps> = ({ section, registerRef }) => {
  const { isDarkMode } = useTheme();
  const isMainSection = section.id.split('.').length === 1;
  const level = section.id.split('.').length;
  
  return (
    <section 
      id={`section-${section.id}`}
      ref={(ref) => ref && registerRef(section.id, ref as HTMLDivElement)}
      className={`
        py-4 ${isMainSection ? 'border-b' : ''}
        ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}
        transition-opacity duration-300 hover:opacity-100
        ${isMainSection ? 'opacity-100' : 'opacity-90'}
      `}
    >
      <h2 
        className={`
          ${level === 1 ? 'text-2xl font-bold mb-4' : 'text-xl font-semibold mb-3'}
          ${isDarkMode ? 'text-white' : 'text-slate-900'}
          flex items-center
        `}
      >
        <span className={`
          inline-block mr-3 px-2 py-1 rounded text-sm
          ${isDarkMode ? 'bg-slate-700 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}
        `}>
          {section.id}
        </span>
        {section.title}
      </h2>
      
      {section.content && (
        <div className={`
          prose max-w-none 
          ${isDarkMode ? 'prose-invert prose-slate' : 'prose-slate'} 
          ${isMainSection ? 'pl-0' : 'pl-4 border-l-2'} 
          ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}
        `}>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
            {section.content.split('\n').map((line, index) => {
              // Check if line starts with an emoji (subheading)
              if (line.match(/^[^\w\s]/) && !line.startsWith('•')) {
                return (
                  <span key={index} className="block text-xl font-semibold my-4">
                    {line}
                  </span>
                );
              }
              // For bullet points, add block display
              if (line.startsWith('•')) {
                return (
                  <span key={index} className="block my-1">
                    {line}
                  </span>
                );
              }
              return <span key={index}>{line}</span>;
            })}
          </p>
        </div>
      )}
      
      {/* Render chart if it exists */}
      {section.chart && (
        <div className="w-full max-w-md mx-auto my-8">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2">{section.chart.title}</h3>
            <img 
              src={section.chart.image} 
              alt={section.chart.title}
              className="w-full max-w-md"
            />
          </div>
        </div>
      )}
      
      {/* If this is a placeholder without content, show a representative content block */}
      {!section.content && (
        <div className={`
          ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'} 
          rounded-lg p-4 my-2
          ${isMainSection ? 'pl-4' : 'pl-4 ml-4 border-l-2'} 
          ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}
        `}>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} italic`}>
            This section will contain detailed information about {section.title.toLowerCase()}.
          </p>
        </div>
      )}
    </section>
  );
};

export default SectionContent;