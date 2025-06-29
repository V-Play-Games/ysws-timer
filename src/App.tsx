import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import ApiDisplay from './components/ApiDisplay';
import AboutMe from './components/AboutMe';

const TopBar: React.FC = () => (
  <header className="flex items-center justify-between px-8 py-4 bg-gray-800 text-white">
    <div className="flex items-center">
      <img src="/vpg.png" alt="VPG Icon" className="w-10 h-10 mr-3"/>
    </div>
    <div className="flex items-center space-x-6">
      <nav className="flex space-x-6">
        <Link to="/" className="text-white no-underline hover:text-blue-400 transition-colors">Timer</Link>
        <Link to="/aboutme" className="text-white no-underline hover:text-blue-400 transition-colors">About Me</Link>
        <Link to="/cat" className="text-white no-underline hover:text-blue-400 transition-colors">Cat</Link>
      </nav>
    </div>
  </header>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-800 font-[Exo_2]">
        <TopBar/>
        <Routes>
          <Route path="/" element={<ApiDisplay/>}/>
          <Route path="/aboutme" element={<AboutMe/>}/>
          <Route path="/cat" element={<div className="container mx-auto p-6 text-center">Coming Soon: Cat Page</div>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;