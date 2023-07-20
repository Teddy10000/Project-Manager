import React, { useState,useEffect } from 'react';
import { useParams,useNavigate ,useLocation} from "react-router-dom";
import api from '../apis/api-auth';
import { PROJECTS_URL } from '../utilities/constant';
import { FaClock, FaEdit } from 'react-icons/fa';
import TeamMemberForm from './teammembers/TeammemberForm';
import Modal from './modal';
const ProjectDetails = ({ project }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [projectdetails, setProjectDetails] = useState('') 
  const [showFormsAddteam ,setShowFormsAddteam] = useState(false)
  const [showSuccesMessage,setShowSuccesMessage] = useState(false)
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState('');
  const [success, setAddedSuccess] = useState(false); 
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


 const handleUpdateProjectinfo = () => {


 }

 const handleshowprojectteamform = () =>{
    setShowFormsAddteam(true);

 } 

 const closeModal = () =>{
    setShowModal(false)
 }


  const handleAddTeamMember = async(newTeamMember) => {
    try{
      const projectId = projectdetails.id; // Get the current project's ID
       
      // Send POST request to the backend team create endpoint with the project ID in the URL
    const response = await api.post(`${PROJECTS_URL}${projectId}/team/create/`, newTeamMember);
      if (response.data){
        setShowModal(true)
        setShowSuccesMessage(true);
        setModalMessage('Team Member added successfully');
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
  };



    // Logic to add team members to the project
    // Update the teamMembers state with the new team members
    // You can use an input form or a modal to capture the team member details
  };

  const handleClose = () => {
    setShowFormsAddteam(false);
  };


  return (
    <div className=" md:ml-56 flex flex-col md:flex-row mx-auto p-4">
    
    <div className="bg-white p-4 w-full md:w-1/2 text-center justify-center rounded-md shadow-md ">
      <h2 className="text-2xl font-semibold ">DETAILS ABOUT PROJECT</h2>
    <h1 className="text-3xl font-bold mb-4">{projectdetails.name}</h1>
    <p><span className="text-lg justify-center  ml-4 font-medium flex-row flex"><FaClock/>Start Date:</span> {projectdetails.start_date}</p>
    <p className='mt-4'><span className="text-lg justify-center ml-4 font-medium flex-row flex"><FaClock/>End  Date:</span> {projectdetails.end_date}</p>
    
    <p className="text-lg mt-4 flex-col flex"><span className="font-medium">Status of project:</span>{projectdetails.status}</p>

    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6"
      onClick={handleUpdateProjectinfo}
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
      {projectdetails && projectdetails.team_members.length > 0 ? (
  projectdetails.team_members.map((member) => (
    <div key={member.id} className="text-gray-700 border p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition duration-300">
      <p className="mt-2  text-xl font-semibold"> {member.user.first_name} {member.user.last_name}</p>
   
      {/* Add any other properties you want to display */}
    </div>
  ))
) : (
  <p className="text-gray-500">No team members added</p>
)}
    </div>

    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6"
      onClick={handleshowprojectteamform}
    >
      Add Team Member
    </button>
    {showFormsAddteam && <TeamMemberForm />}  {showFormsAddteam && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-500 z-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <TeamMemberForm handleAddTeamMember={handleAddTeamMember} handleClose={handleClose} />
          </div>
          <Modal showModal={showModal} closeModal={closeModal} modalMessage={modalMessage} success={success} />
        </div> 
        
        
        


      
      )}
  </div> 
  <div className="bg-white p-4 w-full md:w-1/2 text-center justify-center rounded-md shadow-md">
    <h2 className="text-3xl text-black">PROJECT MILESTONE</h2>
  </div>
  </div>
);
};

export default ProjectDetails;
