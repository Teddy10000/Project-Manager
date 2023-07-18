import React, { useState } from 'react';

const ProjectCreationForm = ({handleProjectCreate, handleClose}) => {
 
 
  const [projectName, setProjectName] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  const [showAddTeamMembersForm, setShowAddTeamMembersForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);

  
  
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    // Handle project creation logic, such as sending data to the backend or performing validation
    // Reset form fields 

   const newProject = {
    name: projectName,
    start_date: projectStartDate,
    end_date: projectEndDate,
   }
     
    
   handleProjectCreate(newProject)
    setProjectName('');
    setProjectStartDate('');
    setProjectEndDate('');
  };

  const handleAddTeamMembers = () => {
    setShowAddTeamMembersForm(true);
  };

  const handleAddTeamMembersSubmit = (e) => {
    e.preventDefault();
    // Handle adding team members logic, such as sending data to the backend or performing validation
    // Reset form fields


    setSelectedProject('');
    setSelectedTeamMembers([]);
    setShowAddTeamMembersForm(false);
  }; 

  

  return (
    <div>
      <form onSubmit={handleProjectSubmit}>
        <h2>Create New Project</h2>
        <div>
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
          <div>
          <label htmlFor="projectStartDate">Project Start Date</label>
          <input
            id="projectStartDate"
            type="date"
            value={projectStartDate}
            onChange={(e) => setProjectStartDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Create Project
        </button> 
        <button
          type="submit"
          onclick={handleClose()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Close Project
        </button> 
        
        </form>
      
      

      {showAddTeamMembersForm && (
        <form onSubmit={handleAddTeamMembersSubmit} className="mt-4">
          <h2>Add Team Members</h2>
          <div>
            <label htmlFor="selectedProject">Select Project</label>
            <select
              id="selectedProject"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              required
            >
              <option value="">Select Project</option>
              {/* Render options for projects */}
            </select>
          </div>
          <div>
            <label htmlFor="selectedTeamMembers">Select Team Members</label>
            <select
              id="selectedTeamMembers"
              value={selectedTeamMembers}
              onChange={(e) => setSelectedTeamMembers(Array.from(e.target.selectedOptions, (option) => option.value))}
              multiple
              required
            >
              {/* Render options for team members */}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2"
          >
            Add Team Members
          </button>
        </form>
      )}
    </div>
  );
};

export default ProjectCreationForm;
