import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../apis/api-auth';
import { PROJECTS_URL } from '../../utilities/constant';

const TaskManagerScreen = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskManager, setShowTaskManager] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`${PROJECTS_URL}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = async (projectId) => {
    setSelectedProjectId(projectId); 
    setShowTaskManager(true);

    try {
      const response = await api.get(`${PROJECTS_URL}${projectId}/tasks/`);
      setTasks(response.data);
    } catch (error) {
        //APPLY MODAL HERE WHEN I GET AN ERROR
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold mb-4">Manage Tasks Related to Your Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className={`project-card bg-white rounded-lg shadow-md p-6 cursor-pointer hover:bg-gray-100 transition-colors duration-300 ${
                project.id === selectedProjectId ? 'selected' : 'blurred'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-600">Status: {project.status}</p>
            </div>
          ))}
        </div>
      </div>
      {showTaskManager && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Tasks for Selected Project</h2>
            <div className="tasks-container">
              <h3>Tasks:</h3>
              {tasks.map((task) => (
                <div key={task.id}>
                  <h4>{task.title}</h4>
                  <p>Status: {task.status}</p>
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
              onClick={() => setShowTaskManager(false)}
            >
              Close Task Manager
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagerScreen;
