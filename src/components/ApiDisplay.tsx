import React, {useEffect, useState} from 'react';

// Define TypeScript interface for the program objects
interface Program {
  name: string;
  description: string;
  detailedDescription?: string | null;
  website?: string | null;
  slack?: string | null;
  slackChannel?: string | null;
  status: "active" | "ended";
  deadline?: string;
  participants?: number;
}

interface ApiData {
  limitedTime: Program[];
}

const ApiDisplay: React.FC = () => {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch API data');
        }
        return response.json();
      })
      .then((apiData: ApiData) => {
        setData(apiData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Function to format the deadline date
  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate days remaining
  const getDaysRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const differenceMs = deadlineDate.getTime() - now.getTime();
    return Math.ceil(differenceMs / (1000 * 3600 * 24));
  };

  if (loading) return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <p className="font-bold">Error</p>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Hack Club Programs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.limitedTime.map((program, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md overflow-hidden border-l-4 ${
              program.status === 'active' 
                ? 'border-green-500 bg-white dark:bg-gray-800' 
                : 'border-gray-400 bg-gray-50 dark:bg-gray-700'
            }`}
          >
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{program.name}</h3>
                {program.status === 'active' ? (
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
                {program.deadline && (
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Deadline:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-300">{formatDeadline(program.deadline)}</span>

                    {program.status === 'active' && (
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        getDaysRemaining(program.deadline) <= 7 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {getDaysRemaining(program.deadline)} days left
                      </span>
                    )}
                  </div>
                )}

                {program.participants && (
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Participants:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-300">{program.participants.toLocaleString()}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiDisplay;
