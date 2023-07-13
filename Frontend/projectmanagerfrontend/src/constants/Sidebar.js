import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import TotalTasksChart from './TotalTaskChart';
import ProjectSummaryChart from './Project-summary';
import MilestonesChart from './Milestones';
import TasksChart from './Taskschart';
import ProjectScreen from './Project-list';
import NewDashboard from './NewDashboard';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);

  };
  const milestonesData = [
    { projectName: 'Project A', progress: 60 },
    { projectName: 'Project B', progress: 80 },
    { projectName: 'Project C', progress: 40 },
    { projectName: 'Project D', progress: 90 },
    { projectName: 'Project E', progress: 70 },
  ];
  const projects = [
    {
      id: '1',
      name: 'Project A',
      status: 'In Progress',
      progress: 70,
      managerId: '1',
      teamMembers: ['1', '3']
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
  const totalTasks = 50;
  return (
    <div className="flex  bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`w-64 bg-gray-800 ${isOpen ? 'block' : 'hidden'} md:block`}>
        {/* Sidebar Content */}
        <div className="p-4 ">
   
          {/* Sidebar Menu */}
          <ul className="mt-20">
            <li className="mb-2">
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <span className="mr-2">
                  <FaBars />
                </span>
                Dashboard
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <span className="mr-2">
                  <FaBars />
                </span>
                Projects
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <span className="mr-2">
                  <FaBars />
                </span>
                Tasks
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <span className="mr-2">
                  <FaBars />
                </span>
                Calender
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <span className="mr-2">
                  <FaBars />
                </span>
                Team Members
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <span className="mr-2">
                  <FaBars className="" />
                </span>
                Reports
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <span className="mr-2">
                  <FaBars />
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

        {/* Main Content */}
        <div className="p-4">
          {/* Add your main content here */}
          <div className="container-mx-auto"> 
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <TotalTasksChart totalTasks={totalTasks} />
            </div>
            <div className="flex-1">
                <ProjectSummaryChart />
            </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
            <MilestonesChart milestonesData={milestonesData}/>
            </div>
            <div className="flex-1">
            <TasksChart  tasksData={[
                        { label: 'Project A', assigned: 10, completed: 6 },
                        { label: 'Project B', assigned: 8, completed: 4 },
                        { label: 'Team Member X', assigned: 5, completed: 3 },
                        { label: 'Team Member Y', assigned: 7, completed: 2 },
                    ]}/>
            </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                

            </div> 
            <NewDashboard projects={projects} userId={1}/>
            </div>
            </div> 
           
        </div>
       
      </div>
  
  );
};

export default Sidebar;
