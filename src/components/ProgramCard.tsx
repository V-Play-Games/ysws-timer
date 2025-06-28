import React from 'react';
import type {Program} from '../types/program';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({program}) => {
  let daysRemaining = -1;
  let formattedDeadline = null;

  if (typeof program.deadline === 'string') {
    const now = new Date();
    const deadlineDate = new Date(program.deadline);
    const differenceMs = deadlineDate.getTime() - now.getTime();
    daysRemaining = Math.ceil(differenceMs / (1000 * 3600 * 24));

    formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden border-l-4 p-5 ${
        program.status === 'active'
          ? 'border-green-500 bg-white dark:bg-gray-800'
          : 'border-gray-400 bg-gray-50 dark:bg-gray-700'
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{program.name}</h3>
        {program.status === 'active' && daysRemaining >= 0 ? (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
              Active
            </span>
        ) : (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 font-medium">
              Ended
            </span>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>

      {program.detailedDescription && (
        <div className="mb-4">
          <details className="cursor-pointer">
            <summary className="text-blue-600 dark:text-blue-400 font-medium">More details</summary>
            <p className="mt-2 text-gray-600 dark:text-gray-300 pl-2 border-l-2 border-blue-200">
              {program.detailedDescription}
            </p>
          </details>
        </div>
      )}

      <div className="flex flex-col space-y-2 mb-4">
        {formattedDeadline && daysRemaining >= 0 && (
          <div className="flex items-center text-sm">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Deadline:</span>
            <span
              className="ml-2 text-gray-600 dark:text-gray-300">{formattedDeadline}</span>

            {program.status === 'active' && (
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                daysRemaining <= 7
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                  {daysRemaining} days left
                </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {program.website && (
          <a
            href={program.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm py-1 px-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded transition-colors duration-200"
          >
            Visit Website
          </a>
        )}
        {program.slack && (
          <a
            href={program.slack}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm py-1 px-3 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded transition-colors duration-200"
          >
            {program.slackChannel || 'Join Slack'}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProgramCard;
