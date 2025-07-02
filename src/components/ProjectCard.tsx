import React from 'react';
import type {Project} from '../types/project';
import BlueLink from "./BlueLink";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project}) =>
  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
    <h4 className="font-semibold text-blue-600 dark:text-blue-400">
      <BlueLink href={project.link}>{project.name}</BlueLink>
      <span
        className="inline-block mt-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs">
          ({project.tech})
        </span>
    </h4>
    <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
  </div>

export default ProjectCard;
