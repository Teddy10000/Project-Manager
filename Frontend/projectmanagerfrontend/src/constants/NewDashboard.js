import React,{useState,useEffect} from 'react';
import ProjectSection from './ProjectSection';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";  
import ProjectCreationForm from './ProjectCreationForm';
import { PROJECTS_URL } from '../utilities/constant';
import api from '../apis/api-auth';
import Modal from './modal';


///This is the projects dashboard 

const NewDashboard = ({ projects, userId }) => {

  const [showProjectForms,setShowProjectForms] = useState(false);
const [showModal,setShowModal] = useState(false)
const [success,setProjectSuccess] = useState(false)
const [modalMessage,setModalMessage] = useState("") 

const [loading, setLoading] = useState(false);

  const handleProjectCreate = async(newProject) => {
    setLoading(true);
    // Handle project creation logic, such as sending data to the backend or performing validation
    // Reset form fields 

    try{
     
       
      // Send POST request to the backend project create
    const response = await api.post(`${PROJECTS_URL}create/`, newProject);
      if (response.data){
        setShowModal(true)
        setLoading(false);
        setModalMessage('Project Created successfully');
        setProjectSuccess(true)
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
      setLoading(false);
      setShowModal(true)
      setProjectSuccess(false)
    } else {
      setLoading(false);
      setModalMessage(["Something went wrong. Please try again later."]);
      setShowModal(true)
      setProjectSuccess(false)
    }
    
    
    
    }
     
  }; 

  const handleClose = () =>{
      setShowProjectForms(false)
  } 

  const closeModal = () =>{
    setShowModal(false)
  } 

  const handleOpenCreateProjectForms = () =>{
    setShowProjectForms(true);
  }
  
  return (
    <div className="flex flex-col p-4 sm:ml-[290px] sm:mt-[-10px] h-screen  bg-gradient-to-b from-slate-500 to-gray-700 ">
      <h1 className="text-3xl w-full font-bold  text-white">My Projects</h1> 
      <div className="divider"></div>

      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-300">Projects Managed By Me</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  l">
            {projects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <ProjectSummary project={project} />
              </Link>
            ))}
          </div> 
          
        </div>
      )}
      <button
      onClick={handleOpenCreateProjectForms} 
      className="mt-4 text-lg border-2 rounded-lg w-40 h-8 bg-blue-600 hover:bg-blue-700 flex-row flex">
        <IoIosAdd/>Create Project
        </button>
      {showProjectForms && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-500 z-50">
          <div className="bg-white p-8 rounded-md shadow-md">
           {/* Spinner Circle */}
       {/* Overlay and Spinner */}
       {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div className="spinner-circle"></div>
        </div>
      )}
            <ProjectCreationForm handleProjectCreate={handleProjectCreate}  handleClose={handleClose} />
          </div>
          <Modal showModal={showModal} closeModal={closeModal} modalMessage={modalMessage} success={success} />
        </div> 
      
      )}

      <h2 className="text-2xl font-semibold mb-2">Projects I'm a Team Member Of</h2>
      {/*** <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {teamProjects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <ProjectSummary project={project} />
          </Link>
        ))}
        </div>**/}
    </div> 
  );
};

export default NewDashboard;