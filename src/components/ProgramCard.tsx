import React, {useState, useEffect} from 'react';
import type {Program} from '../types/program';
import {format} from 'react-string-format';

interface ProgramCardProps {
  program: Program;
  calculateTimeRemaining: (deadline: string) => TimeRemaining;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({program, calculateTimeRemaining}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
  const [formattedDeadline, setFormattedDeadline] = useState<string | null>(null);

  // Calculate time remaining and update it every second
  useEffect(() => {
    if (!program.deadline) return;

    setFormattedDeadline(new Date(program.deadline).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }));

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining(program.deadline));

    // Update every second
    const timerId = setInterval(() => {
      const remaining = calculateTimeRemaining(program.deadline!);
      setTimeRemaining(remaining);

      // Clear interval when deadline has passed
      if (remaining.total <= 0) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [calculateTimeRemaining, program]);

  // Determine if the program is active and has time remaining
  const isActive = program.status === 'active' && (timeRemaining?.total || 0) > 0;

  // Determine urgency for styling
  const isUrgent = isActive && timeRemaining!.days <= 7;

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden border-l-4 pl-5 pr-5 pt-2 pb-2 ${
        isUrgent
          ? 'border-green-500 bg-red-50 dark:bg-red-900/30'
          : isActive || program.status === 'undefined'
            ? 'border-green-500 bg-blue-50 dark:bg-blue-900/30'
            : program.status === 'indefinite'
              ? 'border-green-500 bg-white dark:bg-green-800'
              : program.status === 'draft'
                ? 'border-gray-400 bg-gray-50 dark:bg-gray-700'
                : 'border-gray-400 bg-red-50 dark:bg-red-800/50'
      }`}
    >
      <div className="text-xs font-medium mb-2 flex justify-between items-start">
        <details className="cursor-pointer">
          <summary
            className="text-lg font-bold text-blue-500 hover:opacity-80 rounded transition-all duration-200 mb-2">
            <span className="text-gray-800 dark:text-white">{program.name}</span>
          </summary>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
        </details>
        {timeRemaining && isActive ? (
          <div
          className={`rounded-md flex justify-center space-x-2 pt-1 text-center text-base font-bold font-[JetBrains_Mono] ${
            isUrgent ? 'text-red-800 dark:text-red-300' : 'text-blue-800 dark:text-blue-300'
          }`}>
          {format('{0}d {1}:{2}:{3}',
            timeRemaining.days,
            timeRemaining.hours.toString().padStart(2, '0'),
            timeRemaining.minutes.toString().padStart(2, '0'),
            timeRemaining.seconds.toString().padStart(2, '0'))}
        </div>
        ) : program.status === 'indefinite' ? (
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">Indefinite</span>
        ) : program.status === 'undefined' ? (
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">Undefined</span>
        ) : program.status === 'draft' ? (
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">Draft</span>
        ) : (
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">Ended</span>
        )}
      </div>

      <div className="flex flex-wrap space-y-2">
        <div className="inline-flex items-center text-sm">
          {program.website
            ? <a href={program.website} target="_blank" rel="noopener noreferrer"
                 className="p-1 mr-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded transition-colors duration-200"
            >
              Website
            </a>
            : <span className="p-1 mr-2 bg-gray-700 text-gray-300 rounded">
              Website
            </span>
          }
          {program.slack
            ? <a href={program.slack} target="_blank" rel="noopener noreferrer"
                 className="p-1 mr-5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded transition-colors duration-200"
            >
              HC Slack
            </a>
            : <span className="p-1 mr-5 bg-gray-700 text-gray-300 rounded">
              HC Slack
            </span>
          }
          {formattedDeadline && (
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-200">Deadline:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-300 font-[JetBrains_Mono]">{formattedDeadline}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
export type {TimeRemaining};
