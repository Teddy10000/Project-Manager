import React from 'react';
import ProjectSection from './ProjectSection';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';

const NewDashboard = ({ projects, userId }) => {
  
  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1> 

      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Projects Managed By Me</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <ProjectSummary project={project} />
              </Link>
            ))}
          </div>
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-2">Projects I'm a Team Member Of</h2>
      {/*** <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {teamProjects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <ProjectSummary project={project} />
          </Link>
        ))}
        </div>**/}
    </div> 
  );
};

export default NewDashboard;