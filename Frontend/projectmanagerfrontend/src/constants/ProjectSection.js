import React from 'react';
import ProjectSummary from './ProjectSummary';

const ProjectSection = ({ projects, title }) => {
  return (
    <div>
      <h2 className="text-gray-700 text-xl">{title}</h2>
      {projects.map(project => (
        <ProjectSummary key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectSection;
