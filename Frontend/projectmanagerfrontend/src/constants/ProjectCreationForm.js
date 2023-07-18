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
      <form onSubmit={handleProjectSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-md px-8 py-6">
  <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
  <div className="mb-4">
    <label htmlFor="projectName" className="block text-gray-700 font-semibold mb-2">Project Name</label>
    <input
      type="text"
      id="projectName"
      value={projectName}
      onChange={(e) => setProjectName(e.target.value)}
      required
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="projectStartDate" className="block text-gray-700 font-semibold mb-2">Project Start Date</label>
    <input
      id="projectStartDate"
      type="date"
      value={projectStartDate}
      onChange={(e) => setProjectStartDate(e.target.value)}
      required
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="projectEndDate" className="block text-gray-700 font-semibold mb-2">Project End Date</label>
    <input
      id="projectEndDate"
      type="date"
      value={projectEndDate}
      onChange={(e) => setProjectEndDate(e.target.value)}
      required
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="flex justify-between">
    <button
      type="submit"
      className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      Create Project
    </button> 
    <button
      type="submit"
      onClick={handleClose}
      className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      Close Project
    </button> 
  </div>
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
