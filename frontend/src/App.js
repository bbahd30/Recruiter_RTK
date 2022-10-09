// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginButton from './Components/LoginComp/LoginButton';
import Login from './Components/LoginComp/Login'
import MainScreen from './Components/DashboardComponents/MainScreen';

function App()
{
  return (

    <div className="App">
      {/* <LoginButton /> */}
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginButton />} />  
          <Route path="/login/" element={<Login />} />
          <Route path='/dashboard/' element={<MainScreen />} />
        </Routes>
    </BrowserRouter>
    
    </div>
  
  );
}

export default App;