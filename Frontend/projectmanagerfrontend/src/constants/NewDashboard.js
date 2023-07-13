import React from 'react';
import ProjectSection from './ProjectSection';
import ProjectSummary from './ProjectSummary';


const NewDashboard = ({projects,userId}) => {
    const managedProjects = projects.filter(project => project.managerId === userId);
    const teamProjects = projects.filter(project => project.teamMembers.includes(userId));
  
    return (
        <div className="p-4 container mx-auto">
        <h1 className="text-3xl font-bold mb-4">My Projects</h1>
        {managedProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Projects Managed By Me</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {managedProjects.map(project => (
                <ProjectSummary key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-2">Projects I'm a Team Member Of</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {teamProjects.map(project => (
            <ProjectSummary key={project.id} project={project} />
          ))}
        </div>
      </div>
    );
  };
export default NewDashboard