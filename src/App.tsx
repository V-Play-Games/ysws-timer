import React from 'react';

const TopBar: React.FC = () => (
    <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        background: '#222',
        color: '#fff'
    }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/vpg.png" alt="VPG Icon" style={{ width: 40, height: 40, marginRight: 12 }} />
        </div>
        <nav>
            <a href="/" style={{ color: '#fff', margin: '0 12px', textDecoration: 'none' }}>Home</a>
            <a href="/timer" style={{ color: '#fff', margin: '0 12px', textDecoration: 'none' }}>Timer</a>
            <a href="/cat" style={{ color: '#fff', margin: '0 12px', textDecoration: 'none' }}>Cat</a>
        </nav>
    </header>
);

const MainContent: React.FC = () => (
    <main style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
        <h1>Hack Club YSWS Timer</h1>
        <p>
            This project helps you track which Hack Club YSWS (Your Ship, We Ship) programs are currently running, with live timers for each event.
        </p>
        <p>
            <a href="https://hackclub.com/" target="_blank" rel="noopener noreferrer">Visit Hack Club</a> &nbsp;|&nbsp;
            <a href="https://hackclub.com/" target="_blank" rel="noopener noreferrer">Official Website</a>
        </p>
        <h2>What is Hack Club?</h2>
        <p>
            Hack Club is a global community of high school makers and coders. It empowers students to build projects, learn new skills, and collaborate with peers through events, clubs, and online programs.
        </p>
        <h2>About Me</h2>
        <p>
            <strong>Vaibhav Nargwani</strong>, 17<br />
            A passionate programmer
        </p>
        <blockquote>
            🎯 <strong>Philosophy</strong><br />
            "An ugly win is still a win, A beautiful loss is still a loss. Results Matter"
        </blockquote>
        <p>
            I believe in delivering solutions that work, focusing on functionality and user experience over perfectionism.
        </p>
        <ul>
            <li>🎓 Student passionate about mobile development</li>
            <li>📱 Android Developer crafting native mobile experiences</li>
            <li>💡 Always learning and exploring new technologies</li>
            <li>🎮 Interest in game-related projects and interactive applications</li>
        </ul>
    </main>
);

function App() {
    return (
        <>
            <TopBar />
            <MainContent />
        </>
    );
}

export default App;