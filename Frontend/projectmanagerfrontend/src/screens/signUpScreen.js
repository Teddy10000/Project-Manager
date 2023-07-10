import React,{useState} from 'react'
import { FaUser, FaEnvelope, FaLock, FaCalendar, FaPhoneAlt } from 'react-icons/fa';
const SignUpScreen = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [date_of_birth, setDateOfBirth] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [formErrors, setFormErrors] = useState([]);    
    
    
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
          // ...
        }
      };

    return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label htmlFor="first_name" className="text-gray-700">
                First Name
                </label>
              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-2" />
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
                <FaUser className="text-gray-500 mr-2" />
                <input type="text" id="lastName" className="w-full border rounded py-2 px-4" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700">Email</label>
            <div className="flex items-center">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input type="email" id="email" className="w-full border rounded py-2 px-4" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="text-gray-700">Gender</label>
            <select id="gender" className="w-full border rounded py-2 px-4">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="text-gray-700">Phone Number</label>
            <div className="flex items-center">
              <FaPhoneAlt className="text-gray-500 mr-2" />
              <input type="tel" id="phone" className="w-full border rounded py-2 px-4" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-700">Password</label>
            <div className="flex items-center">
              <FaLock className="text-gray-500 mr-2" />
              <input type="password" id="password" className="w-full border rounded py-2 px-4" />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</label>
            <div className="flex items-center">
              <FaLock className="text-gray-500 mr-2" />
              <input type="password" id="confirmPassword" className="w-full border rounded py-2 px-4" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="text-gray-700">Date of Birth</label>
            <div className="flex items-center">
              <FaCalendar className="text-gray-500 mr-2" />
              <input type="date" id="dob" className="w-full border rounded py-2 px-4" />
            </div>
          </div>
         
          <button type="submit" className="bg-gold text-white py-2 px-4 rounded w-full">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}; 

export default SignUpScreen;


