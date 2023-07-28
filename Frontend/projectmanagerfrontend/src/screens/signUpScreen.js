import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCalendar, FaPhoneAlt } from 'react-icons/fa';
import { REGISTRATION_URL } from '../utilities/constant';
import Modal from '../constants/modal';
const SignUpScreen = () => {
  const navigate = useNavigate()
   const [Signuperror, setSignupError] = useState(null);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [date_of_birth, setDateOfBirth] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [formErrors, setFormErrors] = useState([]); 
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [success, setLoginSuccess] = useState(false);
    
    
    const validateForm = () => {
        const errors = [];
    
        if (first_name.trim() === '') {
          errors.push('First name is required');
        }
        if (last_name.trim() === '') {
          errors.push('Last name is required');
        }
        if (email.trim() === '') {
          errors.push('Email is required');
        }
        if (phone_number.trim() === '') {
            errors.push('Phone Number is required');
          }
        if (password.trim() === '') {
          errors.push('Password is required');
        }  
        if (confirmPassword.trim() === '') {
          errors.push('Confirm password is required');
        }
        if (password !== confirmPassword) {
          errors.push('Passwords do not match');
        }
    
        setFormErrors(errors);
    
        return errors.length === 0;
      };    
    
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const isValid = validateForm();
    
        if (isValid) {
          // Process form submission or API call

          axios.post(`${REGISTRATION_URL}`, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number:phone_number,
            password1: password,
            password2: confirmPassword,
            date_of_birth: date_of_birth,
            gender: gender
          }).then(response => {
            // Save the token in local storage
            console.log(response.data)
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            console.log(response.data)
            setShowModal(true)
            setModalMessage('Logged In successful')
            setLoginSuccess(true) 
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setGender('')
            setPhoneNumber('')
            setDateOfBirth('')
            // Redirect the user to the dashboard or some other page
           // navigate('/dashboard');
          })
          .catch(error => {
            // Handle the error
            if (error.response) {
                const errorData = error.response.data;
                let errors = [];
                for (let key in errorData) {
                  if (Array.isArray(errorData[key])) {
                    errors.push(...errorData[key].map((errorMessage) => {
                      return `${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}: ${errorMessage}\t`;
                    }));
                  } else {
                    errors.push(`${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}: ${errorData[key]}\t`);
                  }
                }
                
            setModalMessage(errors)
            setShowModal(true)
            setLoginSuccess(false)
              } else {
                setSignupError(["Something went wrong. Please try again later."]);
              }
            });
          };
      
        }
      ;

      const closeModal = () => {
        setShowModal(false);
      }

    return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl text-yellow-600 font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label htmlFor="first_name" className="text-gray-700">
                First Name
                </label>
              <div className="flex items-center">
                <FaUser className="text-yellow-500 mr-2" />
                <input 
                type="text" 
                id="first_name" 
                value = {first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded py-2 px-4" />
              </div>
            </div>
            <div className="w-1/2 ml-2">
              <label htmlFor="lastName" className="text-gray-700">Last Name</label>
              <div className="flex items-center">
                <FaUser className="text-yellow-500 mr-2" />
                <input 
                type="text"
                 id="last_name" 
                 value = {last_name}
                 onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded py-2 px-4" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700">Email</label>
            <div className="flex items-center">
              <FaEnvelope className="text-yellow-500 mr-2" />
              <input type="email" 
              id="email" 
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded py-2 px-4" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="text-gray-700">Gender</label>
            <select id="gender" 
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded py-2 px-4">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="text-gray-700">Phone Number</label>
            <div className="flex items-center">
              <FaPhoneAlt className="text-yellow-500 mr-2" />
              <input 
              type="tel" 
              id="phone" 
              value={phone_number}
              onChange={(e) =>setPhoneNumber(e.target.value)}
              className="w-full border rounded py-2 px-4" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-700">Password</label>
            <div className="flex items-center">
              <FaLock className="text-yellow-500 mr-2" />
              <input  
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value) }
              className="w-full border rounded py-2 px-4" />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</label>
            <div className="flex items-center">
              <FaLock className="text-yellow-500 mr-2" />
              <input type="password"
               id="confirmPassword" 
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value) }
               className="w-full border rounded py-2 px-4" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="text-gray-700">Date of Birth</label>
            <div className="flex items-center">
              <FaCalendar className="text-yellow-500 mr-2" />
              <input type="date" id="dob" 
                value={date_of_birth}
                onChange={(e) => setDateOfBirth(e.target.value) }
              className="w-full border rounded py-2 px-4" />
            </div>
          </div>
         
          <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded w-full">
            Sign Up
          </button>
        </form> 
        <Modal showModal={showModal} closeModal={closeModal} modalMessage={modalMessage} success={success} />
      </div>
    </div>
  );
}; 

export default SignUpScreen;


