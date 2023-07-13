import logo from './logo.svg';
import './App.css';
import SignUpScreen from './screens/signUpScreen'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginScreen from './screens/loginScreen';
import Dashboard from './screens/Dashboard';
import ProjectPage from './screens/ProjectScreens';
function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
        <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/signup" element={<SignUpScreen/>}/>
          <Route exact path="/login" element={<LoginScreen/>}/>
          <Route exact path="/project" element={<ProjectPage/>}/>
        </Routes>
      
      </BrowserRouter>


      
      </>
  );
}

export default App;
