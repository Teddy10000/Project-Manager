import React ,{useEffect,useState} from 'react'
import ProjectScreen from '../constants/Project-list'
import { useNavigate } from 'react-router-dom';
import NewDashboard from '../constants/NewDashboard';
import ProjectDetails from '../constants/Project-detail';
import TaskSection from '../constants/Tasks/TasksSection';
import { PROJECTS_URL } from '../utilities/constant';
import api from '../apis/api-auth';

const ProjectPage = () => {  
 const [Project, setProjects] = useState([])
 const navigate = useNavigate();

    const projects = [
        {
          id: '1',
          name: 'Project A',
          status: 'In Progress',
          progress: 70,
          managerId: '1',
          teamMembers: ['2', '3']
        },
        {
          id: '2',
          name: 'Project B',
          status: 'Completed',
          progress: 100,
          managerId: '2',
          teamMembers: ['1', '3']
        },
        {
          id: '3',
          name: 'Project C',
          status: 'On Hold',
          progress: 40,
          managerId: '1',
          teamMembers: ['2']
        }
      ];
      const project = {
        id: '1',
        name: 'Project X',
        tasks: [
          {
            id: '1',
            name: 'Task 1',
            assignedUser: '1',
            status: 'In Progress',
            deadline: '2023-07-15'
          },
          {
            id: '2',
            name: 'Task 2',
            assignedUser: '2',
            status: 'Pending',
            deadline: '2023-07-20'
          },
          {
            id: '3',
            name: 'Task 3',
            assignedUser: '1',
            status: 'Completed',
            deadline: '2023-07-10'
          }
        ]
      };
      
      const userRole = 'member'; // Set the user role based on your logic
      const userId = '1'; // Set the user ID based on your logic
    
      useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get(`${PROJECTS_URL}`);
            setProjects(response.data); 
            console.log(response.data);
          } catch (error) {
            if (error.message === 'Token refresh failed') {
              navigate('/login');}
            console.error('Error fetching projects:', error);
          }
        };
      
        fetchProjects();
      }, []);

  return (
    <div >
        <NewDashboard projects={Project} userId={"1"}/>
      
    
    </div>
  )
}

export default ProjectPage