import React, { useState,useEffect } from 'react';
import TaskCard from './Taskcard';

const TasksSection = ({ project, userRole, userId }) => {
  const [tasks, setTasks] = useState(project.tasks); 
  

  const handleTaskUpdate = (taskId, updatedTask) => {
    // Update the task in the tasks state or make an API call to update the task in the backend
    const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
    setTasks(updatedTasks);
  };

  const handleTaskComplete = (taskId) => {
    // Mark the task as complete in the tasks state or make an API call to update the task status
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'Completed' } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      {userRole === 'member' ? (
        <div>
          <h2 className="text-lg font-semibold">My Tasks</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {tasks
             
              .map((task) => (
                <div key={task.id} className="bg-white rounded-md shadow-md p-4">
                  <TaskCard
                    task={task}
                    handleTaskUpdate={handleTaskUpdate}
                    handleTaskComplete={handleTaskComplete}
                    userRole={userRole}
                  />
                  <div className="mt-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 w-full"
                      onClick={() => console.log('Update task status')}
                    >
                      Update Status
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mt-2 w-full"
                      onClick={() => console.log('Raise issue')}
                    >
                      Raise Issue
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold">All Tasks</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleTaskUpdate={handleTaskUpdate}
                handleTaskComplete={handleTaskComplete}
                userRole={userRole}
              />
            ))}
          </div>
          {/* Additional UI for assigning tasks, setting deadlines, and tracking progress */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4"
            onClick={() => console.log('Assign new task')}
          >
            Assign New Task
          </button>
        </div>
      )}
    </div>
  );
  
};

export default TasksSection;
