import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import AlgorithmPage from './components/AlgorithmPage';
import TryItPage from './components/TryItPage';
import AboutPage from './components/AboutPage';
import TeamPage from './components/TeamPage';
import MatrixRain from './components/MatrixRain';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <HomePage />;
      case 'algorithm': return <AlgorithmPage />;
      case 'try': return <TryItPage />;
      case 'about': return <AboutPage />;
      case 'team': return <TeamPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen">
      <MatrixRain />
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <AnimatePresence mode="wait">
        <motion.main key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {renderPage()}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
