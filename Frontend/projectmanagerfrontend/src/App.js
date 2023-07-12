import logo from './logo.svg';
import './App.css';
import SignUpScreen from './screens/signUpScreen'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginScreen from './screens/loginScreen';
function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route exact path="/signup" element={<SignUpScreen/>}/>
          <Route exact path="/login" element={<LoginScreen/>}/>
        </Routes>
      
      </BrowserRouter>


      
      </>
  );
}

export default App;
