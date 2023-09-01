import React,{useState,useEffect} from 'react' 
import TaskForm from '../Tasks/TaskForm';
import Modal from '../modal';
import { MdOutlineAddTask } from "react-icons/md";


const Tab1Content = ({projects , tasklist ,teamMembers, handleTaskSubmit ,showModal,closeModal,modalMessage,Added}) => {
  const [showForm,setShowForm] = useState(false) 
  const [notCompletedTasks, setNotCompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const handleShowForm = () =>{
     setShowForm(true);
  }
  
  const handleClose = ()=>{
    setShowForm(false);
} 

useEffect(() => {
  // Filter tasks based on their status
  const notCompleted = tasklist.filter(task => task.status === "not completed");
  const completed = tasklist.filter(task => task.status === "completed");

  // Update state variables with the filtered tasks
  setNotCompletedTasks(notCompleted);
  setCompletedTasks(completed);
  console.log(tasklist);
}, [tasklist]);
function formatDateString(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
}
  return (
    <div className="p-4 ml-10 sm:ml-0">
        <div className="flex md:flex-row gap-1 md:gap-3 flex-col">
          <div className="flex  flex-col bg-gray-300 w-full md:w-1/3">
              <p className="font-bold text-xl "> Pending Task <span className="badge w-5 h-5 badge-primary">{notCompletedTasks.length}</span></p> 
            {notCompletedTasks && notCompletedTasks.map((task) => (
          <div className="card mt-2 bg-gradient-to-br from-white to-blue-500 mb-3" key={task.id}>
            <p className='card-header p-3 ml-5 text-lg md:text-xl font-bold'>{task.name}<div className="flex flex-col">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div></p>
            <span className="badge badge-flat-secondary w-20 ">{task.status} <span className="ml-10 badge  badge-error">{formatDateString(task.deadline)}</span></span>
            <div className="card-body mt-[-20px]">
              <p>{task.description}</p>
              <div className="avatar avatar-md avatar-square">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
              </div>
              <div className="ml-16 lg:ml-16 md:ml-6 mt-[-59px] md:mt-0 lg:mt-[-59px] font-bold lg:text-sm">
                <p>{task.assigned_to}</p>
                <p>NAME TEDD AUIDBIUD</p>
                <p>NAME TEDD AUIDBIUD</p>
              </div>
            </div>
          </div>
        ))}
          </div>
          <div className="flex  flex-col w-full md:w-1/3">
          <p className="font-bold text-xl "> On Going Task <span className="badge w-5 h-5 bg-yellow-300 badge-primary">6</span></p>
          
          <div className="card mt-2 bg-gradient-to-br from-white to-yellow-500">
                <p className='card-header p-3 ml-5 font-semibold'> Task Name <div className="flex flex-col">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                </div></p> 
                <span className=" badge badge-flat-primary w-20">Status <span className="ml-10  badge  badge-error">Due Date</span></span>
                <div className="card-body mt-[-20px]">
                 <p>lorem ipsum dolor sit amet, consectetur adipelore, sed diam nonumy eirmod temporlore</p> 
                 <div className="avatar avatar-md avatar-square">
                      <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
                      
                    </div>
                    <div className="ml-16 lg:ml-16 md:ml-6 mt-[-59px] md:mt-0 lg:mt-[-59px] font-bold lg:text-sm">
                    <p>NAME TEDD AUIDBIUD</p>
                    <p>NAME TEDD AUIDBIUD</p>
                    <p>NAME TEDD AUIDBIUD</p>
                    </div>
                </div>
                

              </div>
          </div>
          <div className="flex  flex-col w-full md:w-1/3">
            <p className="font-bold text-xl "> Completed Task <span className="badge w-5 h-5 bg-green-300 badge-primary">5</span></p>
            <div className="card mt-2 bg-gradient-to-br from-white to-green-500">
                <p className='card-header p-3 ml-5 font-semibold'> Task Name <div className="flex flex-col">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                </div></p> 
                <span class=" badge badge-flat-secondary w-20">Status <span class="  badge ml-10  badge-error">Due Date</span></span>
                <div class="card-body mt-[-20px]">
                 <p>lorem ipsum dolor sit amet, consectetur adiplore, sed diam nonumy eirmod temporlore</p> 
                 <div className="avatar avatar-md avatar-square">
                      <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
                      
                    </div>
                    <div className="ml-16 lg:ml-16 md:ml-6 mt-[-59px] md:mt-0 lg:mt-[-59px] font-bold lg:text-sm">
                    <p>NAME TEDD AUIDBIUD</p>
                    <p>NAME TEDD AUIDBIUD</p>
                    <p>NAME TEDD AUIDBIUD</p>
                    </div>
                
                </div>
                

              </div>
          </div> 
          
        </div>
        <span class="tooltip tooltip-top tooltip-success" data-tooltip="click to assign new task">
        <button onClick={handleShowForm} className="mx-auto mt-20 hover:scale-105 flex justify-center self-center text-4xl">
            <MdOutlineAddTask/>
        </button>
        {showForm && <TaskForm handleClose ={handleClose} handleTaskSubmit={handleTaskSubmit} teamMembers={teamMembers}/>}
        <Modal showModal={showModal} closeModal={closeModal} modalMessage={modalMessage} success={Added} />
        </span>
    </div>
  )
}

export default Tab1Content