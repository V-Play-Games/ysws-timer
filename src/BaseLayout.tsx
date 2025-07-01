import React from "react";
import {Link, Outlet} from "react-router-dom";

const BaseLayout: React.FC = () => (
  <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-800 font-[Exo_2]">
    <header className="flex items-center justify-between px-8 py-4">
      <img src="/vpg.png" alt="VPG Icon" className="w-10 h-10 mr-3"/>
      <nav className="space-x-6">
        <Link to="/" className="text-white no-underline hover:text-blue-400 transition-colors">Timer</Link>
        <Link to="/about" className="text-white no-underline hover:text-blue-400 transition-colors">About Me</Link>
        <Link to="/cat" className="text-white no-underline hover:text-blue-400 transition-colors">Cat</Link>
      </nav>
    </header>
    <Outlet/>
  </div>
);

export default BaseLayout;