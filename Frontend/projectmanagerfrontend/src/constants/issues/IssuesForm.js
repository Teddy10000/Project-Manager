import React, { useState } from 'react';

const IssueForm = ({ projectId, userId, handleIssueCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new issue object
    const newIssue = {
      id: generateUniqueId(), // You can use a library or generate a unique ID using your own logic
      projectId,
      userId,
      title,
      description,
      assignedUser: '',
      status: 'Open'
    };

    // Pass the new issue to the parent component
    handleIssueCreate(newIssue);

    // Reset form fields
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h3>Create New Issue</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Issue</button>
      </form>
    </div>
  );
};

export default IssueForm;
