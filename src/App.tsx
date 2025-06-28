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

const MainContent: React.FC = () => (
    <main className="max-w-2xl mx-auto my-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Welcome to My Page</h1>
        <p className="text-gray-700 dark:text-gray-300">
            This is a simple React application with a top bar and main content area. You can navigate using the links in the top bar.
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
            Feel free to explore the links provided in the top bar.
        </p>
    </main>
);

function App() {
    return (
        <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-800 font-['Exo 2', sans-serif]">
            <TopBar />
            <MainContent />
            <ApiDisplay />
        </div>
    );
}

export default App;