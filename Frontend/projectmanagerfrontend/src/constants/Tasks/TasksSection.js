import React, { useState } from 'react';
import TaskCard from './Taskcard';

const TaskSection = ({ project, userRole, userId }) => {
  const [tasks, setTasks] = useState(project.tasks);

  const handleTaskUpdate = (taskId, updatedTask) => {
    // Update the task in the tasks state or make an API call to update the task in the backend
    const updatedTasks = tasks.map(task => task.id === taskId ? updatedTask : task);
    setTasks(updatedTasks);
  };

  const handleTaskComplete = (taskId) => {
    // Mark the task as complete in the tasks state or make an API call to update the task status
    const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, status: 'Completed' } : task);
    setTasks(updatedTasks);
  };

  return (
    <div>
      {userRole === 'member' ? (
        <div>
          <h2>My Tasks</h2>
          {tasks
            .filter(task => task.assignedUser === userId)
            .map(task => (
              <TaskCard
                key={task.id}
                task={task}
                handleTaskUpdate={handleTaskUpdate}
                handleTaskComplete={handleTaskComplete}
                userRole={userRole}
              />
            ))}
        </div>
      ) : (
        <div>
          <h2>All Tasks</h2>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              handleTaskUpdate={handleTaskUpdate}
              handleTaskComplete={handleTaskComplete}
              userRole={userRole}
            />
          ))}
          {/* Additional UI for assigning tasks, setting deadlines, and tracking progress */}
        </div>
      )}
    </div>
  );
};

export default TaskSection;
