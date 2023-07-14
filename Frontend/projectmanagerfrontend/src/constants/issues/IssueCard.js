import React, { useState } from 'react';

const IssueCard = ({ issue, handleIssueUpdate, handleIssueDelete, userRole }) => {
  const { id, title, description, assignedUser, status } = issue;
  const [issueStatus, setIssueStatus] = useState(status);

  const updateIssueStatus = (newStatus) => {
    // Update the issue status in the local state or make an API call to update the issue status
    setIssueStatus(newStatus);
    handleIssueUpdate(id, { ...issue, status: newStatus });
  };

  const deleteIssue = () => {
    // Delete the issue from the local state or make an API call to delete the issue
    handleIssueDelete(id);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Assigned User: {assignedUser}</p>
      <p>Status: {issueStatus}</p>
      {userRole === 'manager' && (
        <div className="flex justify-end mt-4">
          <button className="text-blue-500 hover:underline mr-4" onClick={() => updateIssueStatus('In Progress')}>
            Start
          </button>
          <button className="text-green-500 hover:underline" onClick={() => updateIssueStatus('Resolved')}>
            Resolve
          </button>
        </div>
      )}
      {userRole === 'member' && (
        <div className="flex justify-end mt-4">
          <button className="text-red-500 hover:underline" onClick={deleteIssue}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default IssueCard;
