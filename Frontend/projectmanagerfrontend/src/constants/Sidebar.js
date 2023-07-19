import React, { useState } from 'react';
import { FaBars, FaTimes , FaCog, FaClipboardList,  FaChartLine,FaProjectDiagram,FaTasks,FaCalendarAlt,FaUsersCog } from 'react-icons/fa';
import TotalTasksChart from './TotalTaskChart';
import ProjectSummaryChart from './Project-summary';
import MilestonesChart from './Milestones';
import TasksChart from './Taskschart';
import ProjectScreen from './Project-list';
import NewDashboard from './NewDashboard';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);

  };
  
  return (
    <div className="flex  bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`w-56 bg-gray-800 fixed inset-y-0 left-0 z-50 ${isOpen ? 'block' : 'hidden'} md:block `}> 
      <h2 className="mt-5 p-4 text-3xl">Project Manager</h2>
        <div className="p-4 ">
   
          {/* Sidebar Menu */}
          <ul className="mt-20">
       <Link to={"/"} >   
      <li className="mb-5 text-2xl">
        <a href="#" className="flex items-center text-gray-300 hover:text-white">
          <span className="mr-3">
            <FaChartLine className="text-white" />
          </span>
          Dashboard
        </a>
      </li>
      </Link>  
      <Link to={"/project"}>
      <li className="mb-5 text-2xl">
        <a href="#" className="flex items-center text-gray-300 hover:text-white">
          <span className="mr-3">
            <FaProjectDiagram className="text-white" />
          </span>
          Projects
        </a>
      </li>
      </Link> 
      <Link to={'/tasks'}>
      <li className="mb-5 text-2xl">
        <a href="#" className="flex items-center text-gray-300 hover:text-white">
          <span className="mr-3">
            <FaTasks className="text-white" />
          </span>
          Tasks
        </a>
      </li>
      </Link>
      <li className="mb-5 text-2xl">
        <a href="#" className="flex items-center text-gray-300 hover:text-white">
          <span className="mr-3">
            <FaCalendarAlt className="text-white" />
          </span>
          Calendar
        </a>
      </li>
      <li className="mb-5 text-2xl">
        <a href="#" className="flex items-center text-gray-300 hover:text-white">
          <span className="mr-3">
            <FaUsersCog className="text-white" />
          </span>
          Team Members
        </a>
      </li>
      <li className="mb-5 text-2xl">
        <a href="#" className="flex items-center text-gray-300 hover:text-white">
          <span className="mr-3">
            <FaClipboardList className="text-white" />
          </span>
          Reports
        </a>
      </li>
      <li className="mb-5 text-2xl">
        <a href="#" className="flex items-center text-gray-300 hover:text-white">
          <span className="mr-3">
            <FaCog className="text-white" />
          </span>
          Settings
        </a>
      </li>
      {/* Add more menu items here */}
    </ul>
        </div>
      </div>

      {/* Navbar */}
      <div className="flex flex-col flex-1">
        {/* Navbar Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800">
          <h1 className="text-2xl font-bold">Project Manager</h1>
          {/* Navbar Menu Icon */}
          <button className="md:hidden" onClick={toggleSidebar}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

    
    
       
           
        </div>
       
      </div>
  
  );
};

export default Sidebar;
