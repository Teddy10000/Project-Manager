import React, { useState } from 'react';

const TeamMembersSection = ({ project, handleTeamMemberAdd, handleTeamMemberRemove }) => {
  const [selectedTeamMember, setSelectedTeamMember] = useState('');

  const handleAddClick = () => {
    handleTeamMemberAdd(selectedTeamMember);
    setSelectedTeamMember('');
  };

  return (
    <div>
      <h2>Team Members</h2>
      <ul>
        {project.teamMembers.map((teamMember) => (
          <li key={teamMember.id}>
            {teamMember.name}
            <button onClick={() => handleTeamMemberRemove(teamMember.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h2>Add Team Member</h2>
      <select
        value={selectedTeamMember}
        onChange={(e) => setSelectedTeamMember(e.target.value)}
      >
        <option value="">Select Team Member</option>
        {/* Render options for team members */}
      </select>
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
};

export default TeamMembersSection;
