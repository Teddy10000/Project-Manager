import React, { useState,useEffect } from 'react';
import { useParams,useNavigate ,useLocation} from "react-router-dom";
import api from '../apis/api-auth';
import { PROJECTS_URL } from '../utilities/constant';
import { FaClock, FaEdit } from 'react-icons/fa';
const ProjectDetails = ({ project }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [projectdetails, setProjectDetails] = useState('') 
  
  
  const { id } = useParams();
  
  
  useEffect(() => {
    const fetchProjectsDetails = async () => {
        try {
            const response = await api.get(`${PROJECTS_URL}${id}/`);
        setProjectDetails(response.data); 
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjectsDetails();
    console.log(projectdetails);
  }, [id]);





  const handleAddTeamMember = () => {
    // Logic to add team members to the project
    // Update the teamMembers state with the new team members
    // You can use an input form or a modal to capture the team member details
  };

  return (
    <div className="container flex mx-auto p-4"> 
    <div className="bg-white p-4 w-1/2 text-center justify-center rounded-md shadow-md ">
    <h1 className="text-3xl font-bold mb-4">{projectdetails.name}</h1>
    <p><span className="text-lg justify-center  ml-4 font-medium flex-row flex"><FaClock/>Start Date:</span> {projectdetails.start_date}</p>
    <p className='mt-4'><span className="text-lg justify-center ml-4 font-medium flex-row flex"><FaClock/>End  Date:</span> {projectdetails.end_date}</p>
    
    <p className="text-lg mt-4 flex-col flex"><span className="font-medium">Status of project:</span>{projectdetails.status}</p>

    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6"
      onClick={handleAddTeamMember}
    >
      <FaEdit/>Update Project Info
    </button>
    <p className="text-lg mt-4 flex-col flex"><span className="font-medium">Progress of project:</span>{projectdetails.progress}%</p>
    {projectdetails && projectdetails.project_manager && (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-2">Project Manager:</h2>
    <p className="text-lg mb-1">Name: {projectdetails.project_manager[0]}</p>
    <p className="text-lg mb-1">Email: {projectdetails.project_manager[1]}</p>
  </div>
)}
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Team Members:</h2>
      {projectdetails  && projectdetails.team_members.length  > 0 ? (
        projectdetails.team_members.map((member, index) => (
          <p key={index} className="text-gray-700">{member}</p>
        ))
      ) : (
        <p className="text-gray-500">No team members added</p>
      )}
    </div>

    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6"
      onClick={handleAddTeamMember}
    >
      Add Team Member
    </button>
  </div>
  </div>
);
};

export default ProjectDetails;
