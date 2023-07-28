
import React, { useState } from 'react';

const ProjectDetails = ({ project, userRole }) => {
  const [teamMembers, setTeamMembers] = useState(project.teamMembers);
  const [selectedTeamMember, setSelectedTeamMember] = useState('');
  const [tasks, setTasks] = useState(project.tasks);
  const [issues, setIssues] = useState(project.issues);

  const handleTeamMemberAdd = () => {
    // Add selectedTeamMember to teamMembers list
    setTeamMembers([...teamMembers, selectedTeamMember]);
    setSelectedTeamMember('');
  };

  const handleTeamMemberRemove = (memberId) => {
    // Remove member from teamMembers list
    setTeamMembers(teamMembers.filter((member) => member.id !== memberId));
  };

  const handleTaskUpdate = (taskId, updatedTask) => {
    // Update the task in the tasks state
    const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
    setTasks(updatedTasks);
  };

  const handleIssueUpdate = (issueId, updatedIssue) => {
    // Update the issue in the issues state
    const updatedIssues = issues.map((issue) => (issue.id === issueId ? updatedIssue : issue));
    setIssues(updatedIssues);
  };

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p>Timeline: {project.timeline}</p>

      <h2>Team Members:</h2>
      <ul>
        {teamMembers.map((member) => (
          <li key={member.id}>
            {member.name}
            {userRole === 'manager' && (
              <button onClick={() => handleTeamMemberRemove(member.id)}>Remove</button>
            )}
          </li>
        ))}
      </ul>

      {userRole === 'manager' && (
        <div>
          <h2>Add Team Member</h2>
          <select
            value={selectedTeamMember}
            onChange={(e) => setSelectedTeamMember(e.target.value)}
          >
            <option value="">Select Team Member</option>
            {/* Render options for team members */}
          </select>
          <button onClick={handleTeamMemberAdd}>Add</button>
        </div>
      )}

      <h2>Tasks:</h2>
      <ul>
       
      </ul>

      {userRole === 'manager' && (
        <div>
          {/* Task creation form for managers */}
        </div>
      )}

      <h2>Issues:</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            {issue.title}
            {/* Additional issue details */}
          </li>
        ))}
      </ul>

      {/* Additional sections or components for tasks, issues, etc. */}
    </div>
  );
};

export default ProjectDetails;
