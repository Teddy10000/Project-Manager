import React, { useState,useEffect } from 'react';
import { useParams,useNavigate ,useLocation,Link} from "react-router-dom";
import api from '../../apis/api-auth';
import { PROJECTS_URL, PROJECT_TASKLIST_URL, TASK_DELETE_URL } from '../../utilities/constant';
import { FaClock, FaEdit } from 'react-icons/fa';
import TeamMemberForm from '../teammembers/TeammemberForm';
import Modal from '../modal';
import { MdAdd } from "react-icons/md";
import TaskForm from './TaskForm';
import Tab1Content from './Tab1Content'; // Import your tab content components
import Tab2Content from './Tab2Content';
import Tab3Content from './Tab3Content';
import { BsListTask } from "react-icons/bs"; 
import { MdTaskAlt } from "react-icons/md";

const Taskdetail = () => {
  const [tasklist, setTaskList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projects,setProject] = useState([]);
  const [showTaskManager, setShowTaskManager] = useState(false); 
  const [showTaskForm, setShowTaskForm] = useState(false); 
  const [teamMembers,setTeamMembers] = useState([])
  const [showModal,setShowModal] = useState(false);
  const [modalMessage,setModalMessage] = useState('')
  const [successMessage,setShowSuccesMessage] = useState(false) 
  const [Added,setAddedSuccess] = useState(false)
  const [individualtask,setIndividualTask] = useState(false)
  const [loading, setLoading] = useState(false); 
  const [teamMember , setTeamMember] = useState([])
  const { id } = useParams();
  
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (tabIndex) => {
      setActiveTab(tabIndex);
    };
  
  const closeModal = () => {
      setShowModal(false)
   }
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const [TaskListresponse, Projectsresponse] = await Promise.all([
          api.get(`${PROJECTS_URL}${id}/tasks/`),
          api.get(`${PROJECTS_URL}${id}/`)
        ]);
  
        setTaskList(TaskListresponse.data);
        setProject(Projectsresponse.data);
        setTeamMembers(Projectsresponse.data.team_members); 
    
        console.log(tasklist)
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchTaskDetails();
  }, [id]);
  const handleTaskSubmit = async(newTask) =>{
    try{
      // Get the current project's ID
       
      // Send POST request to the backend team create endpoint with the project ID in the URL
    const response = await api.post(`${PROJECTS_URL}${id}/tasks/create/`,newTask); 
    
      if (response.data){ 
        setTaskList((prevTasks) => [...prevTasks, response.data]);
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

  
  return (
    <>
      <div className="flex flex-col sm:ml-[290px]">
        <div className="flex-col flex md:flex-row p-4 ml-10 md:ml-0 font-bold text-3xl md:text-5xl justify-center md:self-center">
           {projects.name}
           <span className="badge text-lg w-40 badge-outline-success">{projects.status}</span>
          
        </div>
        <p className="font-bold w-40 ml-56 p-1 md:p-0 md:ml-4 mt-[-52px] md:mt-0 text-xl md:self-center bg-gray-400">Total Tasks: {tasklist.length}</p> 
       
        <div className="">
        <div className=" py-8">
      <div className=" w-full ">
        <div className="tabs w-full">
          <input
            type="radio"
            id="tab-1"
            name="tabs"
            className="tab-toggle hidden"
            checked={activeTab === 0}
            onChange={() => handleTabClick(0)}
          />
          <label htmlFor="tab-1" className={`tab w-1/3 md:text-xl  tab-bordered px-6 cursor-pointer ${activeTab === 0 ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}>
             Task Issued <MdTaskAlt className='text-xl ml-1 mt-[2px]'/>
          </label>

          <input
            type="radio"
            id="tab-2"
            name="tabs"
            className="tab-toggle hidden"
            checked={activeTab === 1}
            onChange={() => handleTabClick(1)}
          />
          <label htmlFor="tab-2" className={`tab w-1/3 md:text-xl tab-bordered px-6 cursor-pointer ${activeTab === 1 ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}>
            Manage  Issues
          </label>

          <input
            type="radio"
            id="tab-3"
            name="tabs"
            className="tab-toggle hidden"
            checked={activeTab === 2}
            onChange={() => handleTabClick(2)}
          />
          <label htmlFor="tab-3" className={`tab w-1/3 md:text-xl md:mt-[-2px] tab-bordered px-6 cursor-pointer ${activeTab === 2 ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}>
              Manage my Tasks <BsListTask className='text-xl md:text-3xl ml-2 mt-[1px]'/>
          </label>
        </div>

        <div className="mt-4">
          <div className="tab-content">
            {activeTab === 0 && <Tab1Content tasklist={tasklist} handleTaskSubmit={handleTaskSubmit} teamMembers={teamMembers} showModal={showModal} closeModal={closeModal} modalMessage={modalMessage} Added={Added}/>}
            {activeTab === 1 && <Tab2Content />}
            {activeTab === 2 && <Tab3Content />}
          </div>
        </div>
      </div>
    </div>
        </div>






        </div>

      
    </>
  )
}

export default Taskdetail