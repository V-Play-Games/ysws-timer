import React, {useEffect, useState} from 'react';
import ProgramCard from './ProgramCard';
import type {Program} from '../types/program';

interface ApiData {
  limitedTime: Program[];
  indefinite: Program[];
  drafts: Program[];
}

// Define filter types
type FilterType = 'All' | 'Active' | 'Ending Soon' | 'Draft' | 'Ended';
type SortType = 'A-Z' | 'By Deadline' | 'By Status' | 'By Category';

const ApiDisplay: React.FC = () => {
  const [data, setData] = useState<ApiData | string | null>(null);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [activeSort, setActiveSort] = useState<SortType>('A-Z');

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
        setFilteredPrograms(apiData.limitedTime);
      })
      .catch(err => {
        setData(err.message);
      });
  }, []);

  // Apply filters and sorting when data, active filter, or active sort changes
  useEffect(() => {
    if (!data || typeof data === 'string') return;

    let filtered = [...data.limitedTime];

    // Apply filters
    switch (activeFilter) {
      case 'Active':
        filtered = filtered.filter(program => program.status === 'active');
        break;
      case 'Ending Soon':
        filtered = filtered.filter(program => {
          if (program.status !== 'active' || !program.deadline) return false;
          const deadlineDate = new Date(program.deadline);
          const now = new Date();
          const twoWeeksFromNow = new Date();
          twoWeeksFromNow.setDate(now.getDate() + 14);
          return deadlineDate <= twoWeeksFromNow && deadlineDate >= now;
        });
        break;
      case 'Draft':
        filtered = filtered.filter(program => program.status === 'active' && !program.website);
        break;
      case 'Ended':
        filtered = filtered.filter(program => program.status === 'ended');
        break;
      case 'All':
      default:
        // No filter needed
        break;
    }

    // Apply sorting
    switch (activeSort) {
      case 'A-Z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'By Deadline':
        filtered.sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });
        break;
      case 'By Status':
        filtered.sort((a, b) => {
          if (a.status === b.status) return a.name.localeCompare(b.name);
          return a.status === 'active' ? -1 : 1;
        });
        break;
      case 'By Category':
        // For demonstration purposes, let's sort by first letter of description
        // In a real app, you would use a category field if available
        filtered.sort((a, b) => a.description.charAt(0).localeCompare(b.description.charAt(0)));
        break;
    }

    setFilteredPrograms(filtered);
  }, [data, activeFilter, activeSort]);

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

  // Filter and sort options
  const filterOptions: FilterType[] = ['All', 'Active', 'Ending Soon', 'Draft', 'Ended'];
  const sortOptions: SortType[] = ['A-Z', 'By Deadline', 'By Status', 'By Category'];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Hack Club Programs</h2>

      {/* Filter and Sort Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Filter By:</label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Sort By:</label>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((sort) => (
              <button
                key={sort}
                onClick={() => setActiveSort(sort)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  activeSort === sort
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredPrograms.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No programs match your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program, index) =>
            <ProgramCard key={index} program={program}/>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiDisplay;
