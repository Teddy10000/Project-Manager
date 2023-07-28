import React, { useState } from 'react';

const ProjectScreen = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Project 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'ongoing',
    },
    {
      id: 2,
      name: 'Project 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'completed',
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div>
      {/* Project List */}
      <div>
        <h2 className="text-lg font-bold mb-2">Project List</h2>
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className={`cursor-pointer ${
                selectedProject?.id === project.id ? 'font-bold' : ''
              }`}
              onClick={() => handleProjectClick(project)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Project Details */}
      {selectedProject && (
        <div>
          <h2 className="text-lg font-bold mb-2">Project Details</h2>
          <h3 className="font-bold">{selectedProject.name}</h3>
          <p>{selectedProject.description}</p>
          <p>Status: {selectedProject.status}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectScreen;
