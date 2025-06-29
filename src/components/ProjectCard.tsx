import React from 'react';
import type {Project} from '../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project}) => {
  const {name, description, tech, link} = project;

  return <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
      <a href={link} className="hover:opacity-80 transition-all" target="_blank" rel="noopener noreferrer">
        {name}
      </a>
      <span
        className="inline-block mt-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs">
          ({tech})
        </span>
    </h4>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
};

export default ProjectCard;
