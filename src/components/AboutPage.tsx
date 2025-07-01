import React from 'react';
import ProjectCard from './ProjectCard';
import type {Project} from '../types/project';

const AboutPage: React.FC = () => {
  const skills = [
    'Java', 'Kotlin', 'Android', 'Shell', 'HTML', 'CSS', 'JavaScript', 'TypeScript',
  ];

  const projects: Project[] = [
    {
      name: 'Venixxino',
      description: 'A 3D demonstration to visualize electronic configurations for the first 20 periodic table elements',
      tech: 'HTML',
      link: 'https://github.com/V-Play-Games/Venixxino'
    },
    {
      name: 'Javalovania',
      description: 'A MIDI Cover of Megalovania written in Java',
      tech: 'Java',
      link: 'https://github.com/V-Play-Games/Javalovania'
    },
    {
      name: '2048-Shell',
      description: 'Bash Your Way Through Multipliers, Dividers, and the Forbidden 1!',
      tech: 'Shell',
      link: 'https://github.com/V-Play-Games/2048-Shell'
    },
    {
      name: 'VGM APEX',
      description: 'Video Game Music Audio Player EX - Spotify but for video games',
      tech: 'Kotlin',
      link: 'https://github.com/V-Play-Games/VGM-APEX'
    },
    {
      name: 'VJSON',
      description: 'A simple JSON library to serialize and deserialize JSON text',
      tech: 'Kotlin',
      link: 'https://github.com/V-Play-Games/VJSON'
    }
  ];

  return <div className="container mx-auto max-w-4xl p-8">
    <div className="flex justify-center mb-2">
      <img
        src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&duration=2800&pause=2000&color=6AD3F0&center=true&vCenter=true&width=940&lines=Hey+there!+I'm+Vaibhav+%F0%9F%91%8B;Android+%2F+Game+Dev+Enthusiast;Delivering+Projects+that+Work!"
        alt={""}/>
    </div>

    <div className="flex justify-center mb-6">
      <img src="https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif"
           width="500" alt={""}/>
    </div>
    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">About Me</h1>

    {/* Banner Image */}
    <div className="flex justify-center mb-8">
      <img
        src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif"
        alt="Coding Banner"
        className="w-full max-w-3xl rounded-lg shadow-md"
      />
    </div>

    <div className="mb-8">
      <div className="flex flex-col text-center items-center">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-100">Vaibhav Nargwani</h2>
        <h3 className="text-xl text-blue-600 dark:text-blue-400 mb-6">Android / Game Dev Enthusiast</h3>

        {/* Philosophy Section */}
        <div className="bg-blue-50/40 dark:bg-blue-950/40 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-100">Philosophy</h3>
          <p className="text-gray-600 dark:text-gray-300 italic mb-2">
            "An ugly win is still a win, A beautiful loss is still a loss. Results Matter"
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            I believe in delivering solutions that work, focusing on functionality and user experience over
            perfectionism.
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-700 dark:text-gray-100">About Me</h3>
        <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside">
          <li>🎓 Student passionate about mobile and game development</li>
          <li>📱 Android Developer crafting native and interactive experiences</li>
          <li>💡 Always learning and exploring new technologies</li>
          <li>🎮 Interested in both games and productivity tools</li>
          <li>🌱 Currently exploring 3D visualization & audio programming</li>
        </ul>
      </div>

      {/* Current Focus */}
      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-700 dark:text-gray-100">Current Focus</h3>
        <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside">
          <li>📱 Developing robust Android and game applications</li>
          <li>🧪 Exploring 3D visualization and audio processing</li>
          <li>🔧 Improving code efficiency and user experience</li>
          <li>📚 Expanding knowledge in mobile and interactive development</li>
          <li>🚀 Contributing to open-source projects</li>
        </ul>
      </div>

      {/* Skills */}
      <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-700 dark:text-gray-100">Tech Stack</h3>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
          >
                {skill}
              </span>
        ))}
      </div>

      {/* Projects */}
      <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-700 dark:text-gray-100">Recent Projects</h3>
      <div className="space-y-4 mb-8">
        {projects.map((project, index) =>
          <ProjectCard key={index} project={project}/>
        )}
        <p className="text-sm text-blue-500 dark:text-blue-400 mt-2">
          <a href="https://github.com/V-Play-Games?tab=repositories"
             className="hover:opacity-80 transition-all" target="_blank" rel="noopener noreferrer">
            ... and more
          </a>
        </p>
      </div>

      {/* Contact */}
      <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-700 dark:text-gray-100">Let's Connect!</h3>
      <div className="space-y-2 text-gray-600 dark:text-gray-300">
        <p><strong>Email: </strong>
          <a href="mailto:vaibhavnargwani28@gmail.com"
             className="text-blue-600 dark:text-blue-400 hover:opacity-80 transition-all">
            vaibhavnargwani28@gmail.com
          </a>
        </p>
        <p><strong>GitHub: </strong>
          <a href="https://github.com/V-Play-Games"
             className="text-blue-600 dark:text-blue-400 hover:opacity-80 transition-all">
            github.com/V-Play-Games
          </a>
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg mt-8 mb-6">
        <p className="text-gray-700 dark:text-gray-200 text-lg font-semibold">
          Thanks for visiting! Feel free to explore my repositories and don't hesitate to reach out! 🚀
        </p>
      </div>

      <div className="mt-10 p-4 border-t border-gray-200 dark:border-gray-600">
        <img
          src="https://komarev.com/ghpvc/?username=V-Play-Games&color=6AD3F0&style=for-the-badge&label=Profile+Views"
          alt="Profile Views"
          className="mx-auto"
        />
      </div>
    </div>
  </div>
};

export default AboutPage;
