import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../apis/api-auth';
import { PROJECTS_URL, TASK_DELETE_URL } from '../../utilities/constant';
import TaskForm from './TaskForm';
import Modal from '../modal';

const TaskManagerScreen = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskManager, setShowTaskManager] = useState(false); 
  const [showTaskForm, setShowTaskForm] = useState(false); 
  const [teamMembers,setTeamMembers] = useState([])
  const [showModal,setShowModal] = useState(false);
  const [modalMessage,setModalMessage] = useState('')
  const [successMessage,setShowSuccesMessage] = useState(false) 
  const [Added,setAddedSuccess] = useState(false)
  const [individualtask,setIndividualTask] = useState(false)

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
      const [tasksResponse, teamMembersResponse, individualtasks] = await Promise.all([
        api.get(`${PROJECTS_URL}${projectId}/tasks/`),
        api.get(`${PROJECTS_URL}${projectId}/`), 
        api.get(`${PROJECTS_URL}user/tasks/`)
      ]);
  
      setSelectedProjectId(projectId);
      setShowTaskManager(true);
      setTasks(tasksResponse.data);
      setTeamMembers(teamMembersResponse.data.team_members);
      setIndividualTask(individualtasks.data)
    } catch (error) {
      // Apply modal or error handling logic here
      console.error('Error fetching tasks or team members:', error);
    }
  };

  const handleClose = ()=>{
      setShowTaskForm(false);
  } 

 const handleTaskSubmit = async(newTask) =>{
    try{
      const projectId = selectedProjectId; // Get the current project's ID
       
      // Send POST request to the backend team create endpoint with the project ID in the URL
    const response = await api.post(`${PROJECTS_URL}${projectId}/tasks/create/`,newTask); 
    
      if (response.data){ 
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setShowModal(true)
        setShowSuccesMessage(true);
        setModalMessage('Task Assigned to member successfully');
        setAddedSuccess(true)
      };
   
    }
   catch (error) {
    if (error.response) {
      const errorData = error.response.data;
      let errorts = [];
      for (let key in errorData) {
        if (Array.isArray(errorData[key])) {
          errorts.push(...errorData[key].map((errorMessage) => {
            return `${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}: ${errorMessage}\t`;
          }));
        } else {
          errorts.push(`${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}: ${errorData[key]}\t`);
        }
      }
     
      setModalMessage(errorts)
      setShowModal(true)
      setAddedSuccess(false)
    } else {
      
      setModalMessage(["Something went wrong. Please try again later."]);
      setShowModal(true)
      setAddedSuccess(false)
    }
  }; }

  const closeModal = ()=>{
     setShowModal(false);
  }
  const handleNewTaskClick = ()=>{
    setShowTaskForm(true)
  } 

  const handleDeleteTask = async (id)=>{
    
      try {
      const response =  await api.delete(`${TASK_DELETE_URL}${id}/delete/`); // Replace with your API endpoint for deleting a task
        ; // Refresh the tasks after deletion 
        console.log(response.ok,response.status)
        if (200 >= response.status < 300 ){
          setShowModal(true)
          setShowSuccesMessage(true);
          setModalMessage('Task Deleted Succesfully');
          setAddedSuccess(true)  
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        }; 

      } catch (error) {
        if (error.response) {
          const errorData = error.response.data;
          let errorts = [];
          for (let key in errorData) {
            if (Array.isArray(errorData[key])) {
              errorts.push(...errorData[key].map((errorMessage) => {
                return `${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}: ${errorMessage}\t`;
              }));
            } else {
              errorts.push(`${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}: ${errorData[key]}\t`);
            }
          }
          handleProjectClick(id)
         
          setModalMessage(errorts)
          setShowModal(true)
          setAddedSuccess(false)
        } else {
          
          setModalMessage(["Something went wrong. Please try again later."]);
          setShowModal(true)
          setAddedSuccess(false)
        }
      }
    }; 

    function formatDate(inputDate) {
      const date = new Date(inputDate);
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
    
      return `${month}/${day}/${year}`;
    }

   
  

  return (
    <div className="flex flex-col">
      <div className="sm:ml-[290px] bg-gradient-to-b from-slate-500 to-gray-700  h-screen p-4">
        <h2 className="text-3xl font-bold mb-4 text-white">Manage Tasks Related to Your Projects</h2>
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
        <div className="fixed md:ml-56 container mx-auto inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"> 
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-full">
            <h2 className="text-2xl font-bold mb-4">Tasks for Selected Project</h2>
            <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Tasks:</h3>
                    <div className="grid gap-4">
          <div className="grid grid-cols-7 gap-2 bg-gray-200 p-4 font-semibold hidden md:grid">
            <div className="text-center">Task Name</div>
            <div className="text-center">Assignee</div>
            <div className="text-center">Status</div>
            <div className="text-center">Description</div>
            <div className="text-center">Deadline</div>
            <div className="text-center">Actions</div>
          </div>
          {tasks.map((task) => (
            
            <div key={task.id} className="flex flex-wrap md:grid grid-cols-7 gap-2 bg-blue-100 rounded-lg shadow-md p-4">
              <div className="w-full text-center md:w-auto md:col-span-1 md:hidden font-semibold">Task Name:</div>
              <div className="w-full text-center md:w-auto md:col-span-1">{task.name}</div>
              <div className="w-full md:w-auto md:col-span-1 text-center md:hidden font-semibold">Assignee:</div>
              <div className="w-full md:w-auto text-center md:col-span-1">{task.assigned_to}</div>
              <div className={`w-full md:w-auto md:col-span-1 text-center md:hidden font-semibold text-${task.status === 'complete' ? 'green' : 'gray-600'}`}>
                Status:
              </div>
              <div className={`w-full md:w-auto text-center md:col-span-1`}>{task.status}</div>
              <div className="w-full md:w-auto text-center md:col-span-2 md:hidden font-semibold">Description:</div>
              <div className="w-full md:w-auto text-center md:col-span-1">{task.description}</div>
              <div className="w-full md:w-auto text-center md:col-span-1 md:hidden font-semibold">Deadline:</div>
              <div className="w-full md:w-auto text-center md:col-span-1">{formatDate(task.deadline)}</div>
              <div className="w-full md:w-auto text-center md:col-span-1">
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

          </div> 
          <h2 className="text-2xl font-bold mb-4">Tasks Assigned to you</h2>
            <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Tasks:</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              { individualtask && individualtask.map((task) => (
                <div key={task.id} className="mr-2 p-4 bg-gray-100 items-center justify-between border-b border-gray-200 py-2">
                 <div className="flex flex-wrap">
                      <h4 className="w-full text-xl font-semibold mb-1">{task.name}</h4>
                      <h5 className="w-full text-lg mb-1">
                        <span className="font-semibold">Assigned to:</span> {task.assigned_to}
                      </h5>
                      <p className="w-full text-gray-600">
                        <span className="font-semibold">Status:</span> {task.status}
                      </p>
                      <p className="w-full text-gray-600">
                        <span className="font-semibold">Description:</span> {task.description}
                      </p>
                      <p className="w-full text-gray-600 font-semibold">
                        <span className="font-semibold">Deadline:</span> {task.deadline}
                      </p>
                    </div>
                  <div className="flex space-x-4">
                    {/* Add any buttons or actions related to the task here */}
                  <button onClick={handleDeleteTask(task.id)} className="bg-red-500 hover:bg-red-600 ml-4 text-white font-semibold py-2 px-4 rounded mt-4" >Delete Task</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
              onClick={() => setShowTaskManager(false)}
            >
              Close Task Manager
            </button>
            <button
            className="bg-green-500 hover:bg-green-600 ml-4 text-white font-semibold py-2 px-4 rounded mt-4"
            onClick={handleNewTaskClick} // Update the click handler to show TaskForm
          >
            Assign New Task
          </button>
          {/* Render the TaskForm component if needed */}
          
          {showTaskForm && <TaskForm teamMembers={teamMembers} handleTaskSubmit={handleTaskSubmit} handleClose={handleClose} />}
          <Modal showModal={showModal} closeModal={closeModal} modalMessage={modalMessage} success={Added} />
          </div>
        </div>
        
      </div>
      )}
    </div>
      
  );
};

export default TaskManagerScreen;
