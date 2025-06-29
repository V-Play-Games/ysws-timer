import React, {useEffect, useState} from 'react';
import ProgramCard, {type TimeRemaining} from './ProgramCard';
import type {Program} from '../types/program';

const ApiDisplay: React.FC = () => {
  const [data, setData] = useState<Program[] | string | null>(null);

  useEffect(() => {
    fetch('/api.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch API data');
        }
        return response.json();
      })
      .then((apiData) => {
        const fetchedData: Program[] = apiData.data;
        fetchedData.sort((a, b) =>
          calculateTimeRemaining(a.deadline).total - calculateTimeRemaining(b.deadline).total
        )
        setData(fetchedData);
      })
      .catch(err => {
        setData(err.message);
      });
  }, []);

  const calculateTimeRemaining = (deadline?: string): TimeRemaining => {
    if (!deadline) {
      return {days: 0, hours: 0, minutes: 0, seconds: 0, total: 0};
    }
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const total = Math.max(0, deadlineDate.getTime() - now.getTime());

    // Calculate all time parts
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {days, hours, minutes, seconds, total};
  };

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
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Limited Time Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data
          ?.filter(program => program.status === 'active' && (calculateTimeRemaining(program.deadline)?.total || 0) > 0)
          ?.map((program, index) =>
            <ProgramCard key={index} program={program} calculateTimeRemaining={calculateTimeRemaining}/>
          )}
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Limited Time but Undefined Deadline Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data
          ?.filter(program => program.status === 'undefined')
          ?.map((program, index) =>
            <ProgramCard key={index} program={program} calculateTimeRemaining={calculateTimeRemaining}/>
          )}
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Indefinite Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data
          ?.filter(program => program.status === 'indefinite')
          ?.map((program, index) =>
            <ProgramCard key={index} program={program} calculateTimeRemaining={calculateTimeRemaining}/>
          )}
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Draft Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data
          ?.filter(program => program.status === 'draft')
          ?.map((program, index) =>
            <ProgramCard key={index} program={program} calculateTimeRemaining={calculateTimeRemaining}/>
          )}
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Expired Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data
          ?.filter(program =>
            program.status !== 'indefinite' &&
            program.status !== 'draft' &&
            program.status !== 'active' &&
            (program.status === 'ended' || (calculateTimeRemaining(program.deadline)?.total || 0) <= 0))
          ?.map((program, index) =>
            <ProgramCard key={index} program={program} calculateTimeRemaining={calculateTimeRemaining}/>
          )}
      </div>
    </div>
  );
};

export default ApiDisplay;
