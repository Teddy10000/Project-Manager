import React, { useEffect, useState } from 'react';
import { USERS_LIST_URL } from '../../utilities/constant';
import api from '../../apis/api-auth';
import { MdCancel,MdAdd } from "react-icons/md";
const TeamMemberForm = ({ handleAddTeamMember, handleClose }) => {
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVisible, setIsVisible] = useState(true); 
  const [users,setUsers] = useState([])

 
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await api.get(`${USERS_LIST_URL}`);
        setUsers(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error('Error Rendering Users:', error);
      }
    };
  
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data
    if (user.trim() === '' || role.trim() === '') {
      // Display an error message or handle invalid input
      return;
    }

    // Create the team member object
    const newTeamMember = {
      user:user,
      phonenumber:phoneNumber,
      role:role,
      
    }; 
    handleAddTeamMember(newTeamMember)

  

    // Clear the form inputs
    setUser('');
    setRole('');
    setPhoneNumber('');
  }; 


 


  return (

      <form onSubmit={handleSubmit}>
      <h2>Add Team Member</h2>
      <div className="">
      <label className="" htmlFor="name">Name:</label>
      <select className="select select-primary" value={user} onChange={(e) => setUser(e.target.value)}>
        <option value="">Select Team Member</option>
        {/* Render options for team members */}
        {users.map((userr) => (
          <option key={userr.id} value={userr.id}>
            {userr.name}
          </option>
        ))}
      </select>
    </div>
    <div class="form-field">
			<label class="form-label">Role:</label>

			<input placeholder="Type here" type="role" className="input max-w-full" value={role} onChange={(e) => setRole(e.target.value)}  />
			<label class="form-label">
				<span class="form-label-alt">Please enter the users role.</span>
			</label>
		</div>
    <div class="form-field">
			<label class="form-label">Phone Number:</label>

			<input placeholder="Type Phone Number here" type="role" className="input max-w-full" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  />
			<label class="form-label">
				<span class="form-label-alt">Please enter the users Phone Number.</span>
			</label>
		</div>
      <button className="btn btn-primary hover:bg-blue-600 mr-4" onClick= {handleAddTeamMember} type="submit"><MdAdd/>Add</button>
      <button className="btn btn-primary hover:bg-blue-600 mr-4" onClick = {handleClose}  type="submit"><MdCancel/>Close</button>
    </form>
   
  );
};

export default TeamMemberForm;