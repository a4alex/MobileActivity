import React from 'react';
import { useTheme } from './ThemeContext';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div 
        className={`h-full ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600'} transition-all duration-300 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;