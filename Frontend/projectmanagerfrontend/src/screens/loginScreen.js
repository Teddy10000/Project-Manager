import React,{useState} from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOGIN_URL } from '../utilities/constant';
import Modal from '../constants/modal';
import { isTokenExpired, setTokenExpiration } from '../apis/jwt-decode';


const LoginScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [success, setLoginSuccess] = useState(false);

  const [error, setFormErrors] = useState(null); 
  const [loginerror, setLoginError] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const validateForm = () => {
    const errors = [];


    if (email.trim() === '') {
      errors.push('Email is required');
    }

    if (password.trim() === '') {
      errors.push('Password is required');
    }
   

    setFormErrors(errors);

    return errors.length === 0;
  };    




const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      // Process form submission or API call

      axios.post(`${LOGIN_URL}`, {
        
        email: email,
        password: password,
      
      }).then(response => {
        // Save the token in local storage 
        if (response.status == 200) {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          console.log(response.data)
          setShowModal(true)
          setModalMessage('Logged In successful')
          setLoginSuccess(true)
          //navigate('/dashboard');
          console.log(response.data) 
          const accessToken = localStorage.getItem('access_token') 
          setTokenExpiration(accessToken) 
          isTokenExpired()
        
        }

        console.log()
      
        // Redirect the user to the dashboard or some other page
       // navigate('/dashboard');
      })
      .catch(error => {
        // Handle the error
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
            setLoginError(errorts); 
            setModalMessage(errorts)
            setShowModal(true)
            setLoginSuccess(false)
          } else {
            setLoginError(["Something went wrong. Please try again later."]);
            setModalMessage(["Something went wrong. Please try again later."]);
            setShowModal(true)
            setLoginSuccess(false)
          }
        });
      };
  
    }
  ; 
  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white md:w-1/3  p-8 rounded shadow-md">
        <h2 className="text-3xl text-yellow-600 font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700">Email</label>
            <div className="flex items-center">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input 
              type="email" 
              id="email" 
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded py-2 px-4" />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-gray-700">Password</label>
            <div className="flex items-center">
              <FaLock className="text-gray-500 mr-2" />
              <input 
                type="password"
                 id="password"
                 value = {password}
                 onChange={(e) => setPassword(e.target.value)} 
                 className="w-full border rounded py-2 px-4" />
            </div>
          </div>
          <button type="submit"  className="bg-yellow-500 text-white py-2 px-4 rounded w-full hover:bg-yellow-600">
            Log In
          </button>
        </form>
        <Modal showModal={showModal} closeModal={closeModal} modalMessage={modalMessage} success={success} />
      </div>
    </div>
  );
};

export default LoginScreen;
