import React, {useState, useEffect} from 'react';
import type {Program} from '../types/program';
import {format} from 'react-string-format';

interface ProgramCardProps {
  program: Program;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({program}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
  const [formattedDeadline, setFormattedDeadline] = useState<string | null>(null);

  // Calculate time remaining and update it every second
  useEffect(() => {
    if (!program.deadline) return;

    const calculateTimeRemaining = (): TimeRemaining => {
      const now = new Date();
      const deadlineDate = new Date(program.deadline as string);
      const total = Math.max(0, deadlineDate.getTime() - now.getTime());

      // Calculate all time parts
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      return {days, hours, minutes, seconds, total};
    };

    // Format the deadline date
    const deadline = new Date(program.deadline);
    setFormattedDeadline(deadline.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const timerId = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      // Clear interval when deadline has passed
      if (remaining.total <= 0) {
        clearInterval(timerId);
      }
    }, 1000);

    // Clean up on unmount
    return () => clearInterval(timerId);
  }, [program.deadline]);

  // Determine if the program is active and has time remaining
  const isActive = program.status === 'active' && timeRemaining && timeRemaining.total > 0;

  // Determine urgency for styling
  const isUrgent = isActive && (timeRemaining?.days || 0) <= 7;

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden border-l-4 p-5 ${
        isActive
          ? 'border-green-500 bg-white dark:bg-gray-800'
          : 'border-gray-400 bg-gray-50 dark:bg-gray-700'
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{program.name}</h3>
        {isActive ? (
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
        {formattedDeadline && isActive && (
          <>
            <div className="flex items-center text-sm">
              <span className="font-semibold text-gray-700 dark:text-gray-200">Deadline:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-300">{formattedDeadline}</span>
            </div>

            {/* Live Countdown Timer */}
            {timeRemaining && (
              <div className={`mt-2 p-3 rounded-md ${
                isUrgent ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
              }`}>
                <div className="flex justify-center space-x-2 rounded text-center px-2 py-1 text-lg font-bold">
                  {format('{0}d {1}h {2}m {3}s',
                    timeRemaining.days,
                    timeRemaining.hours.toString().padStart(2, '0'),
                    timeRemaining.minutes.toString().padStart(2, '0'),
                    timeRemaining.seconds.toString().padStart(2, '0'))}
                </div>
              </div>
            )}
          </>
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
