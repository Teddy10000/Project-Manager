import React, { useState } from 'react';

const TaskCard = ({ task, handleTaskUpdate, handleTaskComplete, userRole }) => {
  const { id, name, dueDate, assignedUser, status } = task;
  const [taskStatus, setTaskStatus] = useState(status);

  const updateTaskStatus = (newStatus) => {
    // Update the task status in the local state or make an API call to update the task status
    setTaskStatus(newStatus);
    handleTaskUpdate(id, { ...task, status: newStatus });
  };

  const completeTask = () => {
    // Mark the task as complete in the local state or make an API call to update the task status
    setTaskStatus('Completed');
    handleTaskComplete(id);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3>{name}</h3>
      <p>Due Date: {dueDate}</p>
      <p>Assigned User: {assignedUser}</p>
      <p>Status: {taskStatus}</p>
      {userRole === 'manager' && (
        <div className="flex justify-end mt-4">
          <button className="text-blue-500 hover:underline mr-4" onClick={() => updateTaskStatus('In Progress')}>
            Start
          </button>
          <button className="text-green-500 hover:underline" onClick={completeTask}>
            Complete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
