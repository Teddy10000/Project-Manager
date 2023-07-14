import React, { useState } from 'react';

const TaskForm = ({ teamMembers, handleTaskSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields if needed

    // Create a new task object
    const newTask = {
      title,
      description,
      assignee,
      dueDate,
      // Add additional properties as needed
    };

    // Pass the new task object to the handleTaskSubmit function
    handleTaskSubmit(newTask);

    // Reset form fields
    setTitle('');
    setDescription('');
    setAssignee('');
    setDueDate('');
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="assignee">Assignee:</label>
          <select
            id="assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
          >
            <option value="">Select Assignee</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
