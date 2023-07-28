import React, { useState } from 'react';
import IssueCard from './IssueCard';
import IssueForm from './IssueForm';

const IssueSection = ({ project, userRole, userId }) => {
  const [issues, setIssues] = useState(project.issues);

  const handleIssueCreate = (issue) => {
    // Create a new issue and update the issues state or make an API call to create the issue in the backend
    const updatedIssues = [...issues, issue];
    setIssues(updatedIssues);
  };

  const handleIssueUpdate = (issueId, updatedIssue) => {
    // Update the issue in the issues state or make an API call to update the issue in the backend
    const updatedIssues = issues.map(issue => issue.id === issueId ? updatedIssue : issue);
    setIssues(updatedIssues);
  };

  const handleIssueDelete = (issueId) => {
    // Remove the issue from the issues state or make an API call to delete the issue from the backend
    const updatedIssues = issues.filter(issue => issue.id !== issueId);
    setIssues(updatedIssues);
  };

  return (
    <div>
      <h2>Issue Tracking</h2>
      {userRole === 'member' && (
        <IssueForm projectId={project.id} userId={userId} handleIssueCreate={handleIssueCreate} />
      )}
      {issues.map(issue => (
        <IssueCard
          key={issue.id}
          issue={issue}
          handleIssueUpdate={handleIssueUpdate}
          handleIssueDelete={handleIssueDelete}
          userRole={userRole}
        />
      ))}
    </div>
  );
};

export default IssueSection;
