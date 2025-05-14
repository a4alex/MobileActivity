import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Download } from 'lucide-react';
import TableOfContents from './TableOfContents';
import SectionContent from './SectionContent';
import ProgressBar from './ProgressBar';
import { Paper } from '../types/paper';
import { useTheme } from './ThemeContext';
import FrontPage from './FrontPage';
import ThankYouPage from './ThankYouPage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ResearchPaperProps {
  paper: Paper;
}

const ResearchPaper: React.FC<ResearchPaperProps> = ({ paper }) => {
  const { isDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState(paper.sections[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement>>({});
  const [readingProgress, setReadingProgress] = useState(0);
  const [exporting, setExporting] = useState(false);
  
  // Register section ref
  const registerSectionRef = (id: string, ref: HTMLDivElement) => {
    sectionRefs.current[id] = ref;
  };

  // Scroll to section when TOC item is clicked
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const sectionRef = sectionRefs.current[id];
    if (sectionRef) {
      sectionRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle scroll to detect current section and show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll-to-top button
      setShowScrollTop(window.scrollY > 300);
      
      // Calculate reading progress
      if (contentRef.current) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
      
      // Determine active section based on scroll position
      if (contentRef.current) {
        const sectionIds = Object.keys(sectionRefs.current);
        
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          const section = sectionRefs.current[id];
          const rect = section.getBoundingClientRect();
          
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle export to PDF
  const handleExport = async () => {
    try {
      setExporting(true);
      
      // Get the elements to export
      const frontPageElement = document.querySelector('.flex.flex-col.items-center.w-full') as HTMLElement;
      const paperElement = document.querySelector('.md\\:w-3\\/4.lg\\:w-4\\/5') as HTMLElement;

      if (!frontPageElement || !paperElement) {
        alert('Could not find content to export');
        setExporting(false);
        return;
      }

      // Create temporary container to hold all content
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '210mm';
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.color = 'black';
      tempContainer.style.padding = '30px';
      tempContainer.style.zIndex = '-1000';
      document.body.appendChild(tempContainer);

      // Clone the front page content
      const frontPageClone = frontPageElement.cloneNode(true) as HTMLElement;
      frontPageClone.querySelectorAll('button').forEach(btn => btn.remove());
      tempContainer.appendChild(frontPageClone);
      
      // Clone the paper content
      const paperClone = paperElement.cloneNode(true) as HTMLElement;
      paperClone.querySelectorAll('button').forEach(btn => btn.remove());
      tempContainer.appendChild(paperClone);

      // Make everything visible
      const allElements = tempContainer.querySelectorAll('*');
      allElements.forEach(el => {
        const element = el as HTMLElement;
        if (element.style) {
          element.style.display = element.tagName.toLowerCase() === 'div' ? 'block' : '';
          element.style.visibility = 'visible';
          element.style.opacity = '1';
          element.style.color = 'black';
          element.style.backgroundColor = element.classList.contains('dark:bg-gray-800') ? 'white' : '';
          element.style.borderColor = '#ccc';
        }
      });

      // Wait for images to load
      const images = tempContainer.querySelectorAll('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      // Use html2canvas with proper options
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: 'white',
        logging: true,
        onclone: (clonedDoc, element) => {
          // Additional visibility fixes for cloned document
          element.style.width = '210mm';
          element.style.padding = '20mm';
          element.style.backgroundColor = 'white';
          element.style.display = 'block';
        }
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Split the canvas into separate pages
      const imgWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Create a temporary canvas for each page
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      if (!tempCtx) {
        throw new Error('Could not create temporary canvas context');
      }
      
      // Set up the temporary canvas
      tempCanvas.width = canvas.width;
      tempCanvas.height = (pageHeight * canvas.width) / imgWidth;
      
      // Calculate the number of pages needed
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pagesCount = Math.ceil(imgHeight / pageHeight);
      
      // Add each page
      for (let i = 0; i < pagesCount; i++) {
        // Add a new page after the first one
        if (i > 0) {
          pdf.addPage();
        }
        
        // Calculate the source area from the original canvas
        const sourceY = i * tempCanvas.height;
        const sourceHeight = Math.min(tempCanvas.height, canvas.height - sourceY);
        
        // Clear the temporary canvas
        tempCtx.fillStyle = 'white';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        // Draw the portion of the original canvas to the temporary canvas
        tempCtx.drawImage(
          canvas,
          0, sourceY, canvas.width, sourceHeight,
          0, 0, tempCanvas.width, sourceHeight
        );
        
        // Add the image to the PDF
        const imgData = tempCanvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, pageHeight);
      }

      // Clean up
      document.body.removeChild(tempContainer);
      
      // Save the PDF
      pdf.save('research-paper.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error exporting PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="relative">
      <ProgressBar progress={readingProgress} />
      <FrontPage />
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-1/4 lg:w-1/5 md:sticky md:top-24 md:self-start">
          <TableOfContents 
            sections={paper.sections} 
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />
        </div>
        
        <div 
          ref={contentRef}
          className="md:w-3/4 lg:w-4/5"
        >
          <div className="mb-8">
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {paper.title}
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {paper.author}
            </p>
          </div>
          
          <div className="space-y-8">
            {paper.sections.map(section => (
              <SectionContent 
                key={section.id}
                section={section}
                registerRef={registerSectionRef}
              />
            ))}
          </div>
          
          {/* Export button */}
          <div className="mt-12 mb-8 flex justify-center">
            <button
              onClick={handleExport}
              aria-label="Export to PDF"
              className={`
                flex items-center px-6 py-3 rounded-lg text-white
                ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'}
                transition-colors duration-200 space-x-2
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <Download size={20} />
              <span>Export to PDF</span>
            </button>
          </div>

          {/* Separator */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
          </div>

          <ThankYouPage />
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-40
            ${isDarkMode 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }
            transition-all duration-300 transform hover:scale-110
          `}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ResearchPaper;