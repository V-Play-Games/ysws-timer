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
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>();
  const [formattedDeadline, setFormattedDeadline] = useState<string>();

  // Calculate time remaining and update it every second
  useEffect(() => {
    if (!program.deadline) return;

    const date = new Date(program.deadline);
    if (!isNaN(date.getTime())) {
      setFormattedDeadline(date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        hour12: false,
        timeZone: 'UTC'
      }));
    }

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
  const isActive = (timeRemaining?.total || 0) > 0;

  // Determine urgency for styling
  const isUrgent = isActive && timeRemaining!.days <= 7;

  return <div
    className={`rounded-lg shadow-md overflow-hidden border-l-4 pl-5 pr-5 pt-2 pb-2 ${
      isUrgent
        ? 'border-red-800 bg-red-50 dark:bg-red-900/30'
        : isActive || program.deadline === 'undefined'
          ? 'border-green-500 bg-blue-50 dark:bg-blue-900/30'
          : program.deadline === 'indefinite'
            ? 'border-green-500 bg-white dark:bg-green-800'
            : program.deadline === 'draft'
              ? 'border-gray-400 bg-gray-50 dark:bg-gray-700'
              : program.deadline === 'ditched'
                ? 'border-gray-400 bg-black-50 dark:bg-gray-900'
                : 'border-gray-400 bg-red-50 dark:bg-red-800/50'
    }`}
  >
    {/* 2x2 Grid BaseLayout */}
    <div className="text-xs font-medium mb-2 grid grid-cols-2 gap-4">
      {/* Cell 0,0: Name + Description - Center-Left aligned */}
      <div className="flex flex-col items-start justify-center">
        <details className="cursor-pointer w-full">
          <summary
            className="text-lg font-bold text-blue-500 hover:opacity-80 rounded transition-all duration-200 mb-2">
            <span className="text-gray-800 dark:text-white">{program.name}</span>
          </summary>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{program.description}</p>
        </details>
      </div>

      {/* Cell 0,1: Countdown - Center-Right aligned */}
      <div className="flex justify-end items-center">
        {timeRemaining && isActive ? (
          <div
            className={`rounded-md px-3 py-1 text-center text-base font-bold font-[JetBrains_Mono] ${
              isUrgent ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
            }`}
          >
            {format('{0}d {1}:{2}:{3}',
              timeRemaining.days.toString().padStart(2, '0'),
              timeRemaining.hours.toString().padStart(2, '0'),
              timeRemaining.minutes.toString().padStart(2, '0'),
              timeRemaining.seconds.toString().padStart(2, '0'))}
          </div>
        ) : program.deadline === 'indefinite' ? (
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">Indefinite</span>
        ) : program.deadline === 'undefined' ? (
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">Undefined</span>
        ) : program.deadline === 'draft' ? (
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">Draft</span>
        ) : program.deadline === 'ditched' ? (
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-900">Ditched</span>
        ) : (
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">Ended</span>
        )}
      </div>

      {/* Cell 1,0: Website + HC Slack - Center-Left aligned */}
      <div className="flex items-center">
        <div className="flex gap-2 text-sm">
          {program.website
            ? <a href={program.website} target="_blank" rel="noopener noreferrer"
                 className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded transition-colors duration-200"
            >
              Website
            </a>
            : <a className="p-1 bg-gray-700 text-gray-300 rounded">
              Website
            </a>
          }
          <a href={program.slack} target="_blank" rel="noopener noreferrer"
             className="p-1 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded transition-colors duration-200">
            Slack
          </a>
        </div>
      </div>

      {/* Cell 1,1: Deadline - Center-Right aligned */}
      <div className="flex justify-end items-center text-right">
        {formattedDeadline && (
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-200">Deadline:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-300 font-[JetBrains_Mono]">{formattedDeadline}</span>
          </div>
        )}
      </div>
    </div>
  </div>
};

export default ProgramCard;
export type {TimeRemaining};
