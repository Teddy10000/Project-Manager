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
  
  //PROJECT MILESTONE FETCH
  const [projectMilestones, setProjectMilestones] = useState([]);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [milestoneDetails, setMilestoneDetails] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const [createForm, setShowCreateForm] = useState(false);
  const { id } = useParams();
  
  
  useEffect(() => {
    const fetchProjectsDetails = async () => {
      try {
        const [ProjectDetailresponse, ProjectMilestoneListresponse] = await Promise.all([
          api.get(`${PROJECTS_URL}${id}/`),
          api.get(`${PROJECTS_URL}${id}/milestones/`)
        ]);
  
        setProjectDetails(ProjectDetailresponse.data);
        setProjectMilestones(ProjectMilestoneListresponse.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjectsDetails();
  }, [id]);

//handles when you click on update prodcut info, must send a patch request
 const handleUpdateProjectinfo = () => {

 }

 //Onclick on Add forms makes the form visible by changing the state variable to true
 const handleshowprojectteamform = () =>{
    setShowFormsAddteam(true);

 } 
// onclick closes the modal , modal appears after a post request has been made to the server
 const closeModal = () =>{
    setShowModal(false)
 }

// Fucntin that does the posting of new member to the backend
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
      console.log(projectdetails)
   
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

  //when click on a particualr project milestone , sends a get request and updates the milestone detailed view state vatiables
  const handleMilestoneClick = async (milestoneId) => {
    try {
      const response = await api.get(`/projects/project_id/milestones/${milestoneId}/`);
      setMilestoneDetails(response.data);
      setSelectedMilestoneId(milestoneId);
      setShowDetailView(true);
    } catch (error) {
      console.error('Error fetching milestone details:', error);
    }
  }; 
  
  //Closes the Milestones Detailed view when clicked on
  const handleCloseDetailView = () => {
    setShowDetailView(false);
    setSelectedMilestoneId(null);
    setMilestoneDetails(null);
  }

  const handleClose = () => {
    setShowFormsAddteam(false);
  };  

  // OPEN PROJECT UPDATE FORM
  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  //UPDATE PROJECT MILESTONE FORM
  const handleUpdateFormClose = () => {
    setShowUpdateForm(false);
  }; 

  //FUNCTION TP DELETE PROJECT MILESTONE 
  const handleDeleteClick = async (milestoneId) => {
    // Implement the delete functionality using the milestoneId
    try {
      await api.delete(`${PROJECTS_URL}${id}/milestones/${milestoneId}/delete`);
      // Update the projectMilestones state after successful deletion
      setProjectMilestones((prevMilestones) =>
        prevMilestones.filter((milestone) => milestone.id !== milestoneId)
      );
    } catch (error) {
      console.error('Error deleting milestone:', error);
    }
  };


  return (
    <div className=" sm:ml-[290px] flex flex-col mx-auto p-4"> 
     {/*This takes care of the head section*/}
    <div className=" mx-auto  font-bold flex md:flex-row flex-col ">
     <div className="text-4xl md:text-6xl ">
      {projectdetails.name} 
      </div>
      <div class="avatar-group mt-4 flex mx-14">
     
     {projectdetails && projectdetails.team_members.length > 0 ? (
  projectdetails.team_members.map((member) => (
    <div class="avatar">
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
      </div>
  ))
) : (
  <p className="text-gray-500">No team members added</p>
)}
     
      <div class="avatar">
            <div>+000</div> 
      </div>  
     
    </div>
    <span class="badge text-sm md:h-10 md:mt-4 badge-secondary badge-sm flex">{projectdetails.type}</span> 
 

    </div>
    <div class="divider w-full"></div>
    {/** This will take care of the middle section */}
    <div className="flex flex-col md:flex-row">
      <ol class="steps">
      <li className={`step step-primary  ${projectdetails.status === 'On hold' ? 'step-active' : ''} ${projectdetails.status === 'In Progress' ? 'step-done' : ''} ${projectdetails.status === 'Completed' ? 'step-done' : ''} `}>
          <div class="step-circle">1</div>
          <h3>On hold</h3>
        </li>
        <li className={`step step-primary ${projectdetails.status === 'In Progress' ? 'step-active' : ''} ${projectdetails.status === 'Completed' ? 'step-done' : ''}`}>
          <div class="step-circle">2</div>
          <h3>In progress</h3>
        </li>
        <li className={`step step-primary  ${projectdetails.status === 'Completed' ? 'step-active' : ''}`}>
          <div class="step-circle">3</div>
          <h3>Completed</h3>
        </li>
      </ol> 
      <button class="btn btn-primary w-52 mx-auto">Edit the Project status</button>

    </div>
   
    
    {/**<div className="bg-white p-4 w-full md:w-1/2 text-center justify-center rounded-md shadow-md ">
      <h2 className="text-2xl font-semibold ">DETAILS ABOUT PROJECT</h2>
    <h1 className="text-3xl text-black font-bold mb-4">{projectdetails.name}</h1>
    <p><span className="text-lg justify-center  ml-4 font-medium flex-row flex"><FaClock/>Start Date:</span> {projectdetails.start_date}</p>
    <p className='mt-4'><span className="text-lg justify-center ml-4 font-medium flex-row flex"><FaClock/>End  Date:</span> {projectdetails.end_date}</p>
        
    <div className="mt-4 flex items-center">
        <div className={`w-4 h-4 rounded-full ${projectdetails.status === 'In Progress' ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <p className={`ml-2 font-semibold ${projectdetails.status === 'In Progress' ? 'text-green-500' : 'text-red-500'}`}>{projectdetails.status}</p>
      </div> 

      <div className="flex flex-col items-end">
          <div className="relative mt-4 h-4 w-20 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-4 bg-blue-500 rounded-full"
              style={{ width: `${projectdetails.percentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{projectdetails.percentage}% Complete</p>
        </div>


    <button
      className="bg-blue-500 flex-col hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6"
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
  </div> */}
{/*
  <div className="bg-white p-4 w-full md:w-1/2 text-center justify-center rounded-md shadow-md">
    <h2 className="text-3xl text-black">PROJECT MILESTONE</h2>
    <ul>
        {projectMilestones.map((milestone) => (
          <li key={milestone.id}>
            <h3>{milestone.title}</h3>
            <p>{milestone.description}</p>
            <button onClick={() => handleMilestoneClick(milestone.id)}>View Details</button>
            <button onClick={handleUpdateClick}>Update</button>
            <button onClick={() => handleDeleteClick(milestone.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {showDetailView && milestoneDetails && (
        <div>
      
          <h2>Project Milestone Details</h2>
          /* Display the details of the selected milestone using milestoneDetails 
          <button onClick={handleCloseDetailView}>Close</button>
        </div>
         )}  
            {showUpdateForm && (
        <div>
          {/* Render the update form component 
          <h2>Update Project Milestone</h2>
          {/* Add the form to update the selected milestone 
          <button onClick={handleUpdateFormClose}>Cancel</button>
        </div>
      )} 

      {/* Render the create form component 
      <button onClick={() => setShowCreateForm(true)}>Create Project Milestone</button>
    </div> */}
    
  </div>
  
);
};

export default ProjectDetails;
