import logo from './logo.svg';
import './App.css';
import SignUpScreen from './screens/signUpScreen'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginScreen from './screens/loginScreen';
import Dashboard from './screens/Dashboard';
import ProjectPage from './screens/ProjectScreens';
import ProjectDetails from './constants/Projectdetails';
import TaskManagerScreen from './constants/Tasks/Tasksection';
import Sidebar from './constants/Sidebar';
import WithSidebar from './constants/WithSidebar';
function App() {
  return (
    <>
     <BrowserRouter>
        <WithSidebar>
          <Routes>
            <Route exact path="/" element={""}/>
            <Route exact path="/signup" element={<SignUpScreen/>}/>
            <Route exact path="/login" element={<LoginScreen/>}/>
            <Route exact path="/project" element={<ProjectPage/>}/>
            <Route exact path="/projects/:id" element={<ProjectDetails/>}/>
            <Route exact path="/tasks" element={<TaskManagerScreen/>}/>
          </Routes>
          </WithSidebar>
      </BrowserRouter>
     


      
      </>
  );
}

export default App;