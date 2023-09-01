import React, { useState } from 'react';

const TaskForm = ({ teamMembers, handleTaskSubmit,handleClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields if needed

    // Create a new task object
    const newTask = {
      name:title,
      description,
      assigned_to:assignee,
      deadline:dueDate,
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
    <div className="bg-white container md:w-1/2 mx-auto rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="title" className="text-lg font-semibold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-md p-2"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="text-lg font-semibold">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-md p-2"
          required
        ></textarea>
      </div>
      <div className="flex flex-col">
        <label htmlFor="assignee" className="text-lg font-semibold">
          Assignee:
        </label>
        <select
          id="assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="border rounded-md p-2"
          required
        >
          <option value="">Select Assignee</option>
          {teamMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.user.first_name + ' ' + member.user.last_name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="dueDate" className="text-lg font-semibold">
          Due Date:
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded-md p-2"
          required
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl mt-4"
        >
          Add Task
        </button>
        <button
          type="submit"
          onClick={handleClose}
          className="btn btn-error hover:bg-red-700 mt-4"
        >
          Close Task
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default TaskForm;
