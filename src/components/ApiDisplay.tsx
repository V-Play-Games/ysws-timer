import React, {useEffect, useState} from 'react';
import ProgramCard from './ProgramCard';
import type {Program} from '../types/program';

interface ApiData {
  limitedTime: Program[];
}

const ApiDisplay: React.FC = () => {
  const [data, setData] = useState<ApiData | string | null>(null);

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
      })
      .catch(err => {
        setData(err.message);
      });
  }, []);

  if (data === null) return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (typeof data === 'string') return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <p className="font-bold">Error</p>
      <p>{data}</p>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Hack Club Programs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.limitedTime.map((program, index) =>
          <ProgramCard key={index} program={program}/>
        )}
      </div>
    </div>
  );
};

export default ApiDisplay;
