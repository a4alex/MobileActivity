import React from 'react';

const References: React.FC = () => (
  <div className="max-w-4xl mx-auto py-8">
    <h2 className="text-2xl font-bold mb-4">References</h2>
    <ul className="list-disc pl-5 space-y-2">
      <li>
        <a href="https://source.android.com/docs/core/permissions?hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Android Permissions Documentation
        </a>
        <button 
          onClick={() => window.open('https://source.android.com/docs/core/permissions?hl=en', '_blank')}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Explore Reference
        </button>
      </li>
      {/* Add more references as needed */}
    </ul>
  </div>
);

export default References; 