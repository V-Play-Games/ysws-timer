import React from 'react';
import ApiDisplay from './components/ApiDisplay';

const TopBar: React.FC = () => (
  <header className="flex items-center justify-between px-8 py-4 bg-gray-800 text-white">
    <div className="flex items-center">
      <img src="/vpg.png" alt="VPG Icon" className="w-10 h-10 mr-3"/>
    </div>
    <div className="flex items-center space-x-6">
      <nav className="flex space-x-6">
        <a href="/aboutme" className="text-white no-underline hover:text-blue-400 transition-colors">Time</a>
        <a href="/" className="text-white no-underline hover:text-blue-400 transition-colors">About Me</a>
        <a href="/cat" className="text-white no-underline hover:text-blue-400 transition-colors">Cat</a>
      </nav>
    </div>
  </header>
);

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-800 font-['Exo 2', sans-serif]">
      <TopBar/>
      <ApiDisplay/>
    </div>
  );
}

export default App;