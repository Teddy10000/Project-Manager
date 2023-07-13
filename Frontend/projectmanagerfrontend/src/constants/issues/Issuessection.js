import React from 'react';
import IssueCard from './IssueCard';

const IssueSection = ({ project }) => {
  const { issues } = project;

  return (
    <div>
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
};

export default IssueSection;
