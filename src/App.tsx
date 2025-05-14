import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Layout from './components/Layout';
import ResearchPaper from './components/ResearchPaper';
import paperData from './data/paperData';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <ResearchPaper paper={paperData} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;