import React, { useState,useEffect } from 'react';
import { useParams,useNavigate ,useLocation,Link} from "react-router-dom";
import api from '../../apis/api-auth';
import { PROJECTS_URL, PROJECT_TASKLIST_URL, TASK_DELETE_URL } from '../../utilities/constant';
import { FaClock, FaEdit } from 'react-icons/fa';
import TeamMemberForm from '../teammembers/TeammemberForm';
import Modal from '../modal';
import { MdAdd } from "react-icons/md";
import TaskForm from './TaskForm';



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
  const { id } = useParams();
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const [TaskListresponse, Projectsresponse] = await Promise.all([
          api.get(`${PROJECTS_URL}${id}/tasks/`),
          api.get(`${PROJECTS_URL}${id}/`)
        ]);
  
        setTaskList(TaskListresponse.data);
        setProject(Projectsresponse.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchTaskDetails();
  }, [id]);
  return (
    <div>
        
    </div>
  )
}

export default Taskdetail