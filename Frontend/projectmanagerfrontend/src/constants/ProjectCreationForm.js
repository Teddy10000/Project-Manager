import React, { useState } from 'react';

const ProjectCreationForm = () => {
  const [projectName, setProjectName] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  const [projectProgress, setProjectTimeline] = useState('');
  const [showAddTeamMembersForm, setShowAddTeamMembersForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);

  const handleProjectCreate = (e) => {
    e.preventDefault();
    // Handle project creation logic, such as sending data to the backend or performing validation
    // Reset form fields 

    setProjectName('');
    setProjectDescription('');
    setProjectTimeline('');
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
      <form onSubmit={handleProjectCreate}>
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
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="projectTimeline">Project Timeline</label>
          <input
            type="text"
            id="projectTimeline"
            value={projectTimeline}
            onChange={(e) => setProjectTimeline(e.target.value)}
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
          type="button"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded ml-2"
          onClick={handleAddTeamMembers}
        >
          Add Team Members
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
