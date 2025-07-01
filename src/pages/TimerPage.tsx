import React, {useEffect, useState} from 'react';
import ProgramCard, {type TimeRemaining} from '../components/ProgramCard.tsx';
import type {Program} from '../types/program.ts';

type ProgramCategory = {
  title: string;
  filter: (program: Program, calculateTimeRemaining: (deadline?: string) => TimeRemaining) => boolean;
};

const TimerPage: React.FC = () => {
  const [data, setData] = useState<Program[] | string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch API data');
        }
        return response.json();
      })
      .then((apiData: Program[]) => {
        apiData.sort((a, b) =>
          calculateTimeRemaining(a.deadline).total - calculateTimeRemaining(b.deadline).total
        );
        setData(apiData);
      })
      .catch(err => {
        setData(err.message);
      })
      .finally(() => {
        setIsLoading(false);
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

  const programCategories: ProgramCategory[] = [
    {
      title: "Limited Time Programs",
      filter: (program, calcTime) =>
        program.status === 'active' && calcTime(program.deadline).total > 0
    },
    {
      title: "Undefined Deadline Programs",
      filter: program => program.status === 'undefined'
    },
    {
      title: "Indefinite Programs",
      filter: program => program.status === 'indefinite'
    },
    {
      title: "Draft Programs",
      filter: program => program.status === 'draft'
    },
    {
      title: "Expired Programs",
      filter: (program, calcTime) =>
        program.status !== 'indefinite' &&
        program.status !== 'draft' &&
        program.status !== 'active' &&
        program.status !== 'undefined' &&
        program.status !== 'ditched' &&
        (program.status === 'ended' || calcTime(program.deadline).total <= 0)
    },
    {
      title: "Ditched Programs",
      filter: program => program.status === 'ditched'
    }
  ];

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (typeof data === 'string') return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert">
      <p className="font-bold">Error</p>
      <p>{data}</p>
    </div>
  );

  return <div className="container mx-auto p-4 max-w-4xl">
    {programCategories.map((category, categoryIndex) => {
      const filteredPrograms = data?.filter(program =>
        category.filter(program, calculateTimeRemaining)
      );

      if (!filteredPrograms || filteredPrograms.length === 0) return null;

      return <section key={categoryIndex} className="mb-8 transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2">
          {category.title} ({filteredPrograms.length})
        </h2>
        <div className="flex flex-col space-y-6 transition-all duration-300">
          {filteredPrograms.map((program, index) =>
            <div key={index} className="transform transition-all duration-300 hover:scale-[1.01]">
              <ProgramCard program={program} calculateTimeRemaining={calculateTimeRemaining}/>
            </div>
          )}
        </div>
      </section>
    })}
  </div>
};

export default TimerPage;