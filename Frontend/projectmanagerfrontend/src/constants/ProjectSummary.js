import React from 'react';

const ProjectSummary = ({ project }) => {
  const { name, status, progress, metrics } = project;

  return (

    <div className="bg-gradient-to-b from-gray-200 to-gray-500 rounded-md shadow-md p-4 flex flex-col">
    <h3 className="text-black text-lg font-semibold mb-2">{name}</h3>
    <p className="text-gray-600 mb-2">Status: {status}</p>
    <div className="flex items-center mb-2">
      <div className="h-2 bg-gray-200 rounded-full flex-grow">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-sm text-gray-500 ml-2">{progress}%</p>
    </div>
    {/* Display other key metrics */}
  </div>
);
};

export default ProjectSummary;