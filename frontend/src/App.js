// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginButton from './Components/LoginComp/LoginButton';
import Login from './Components/LoginComp/Login'
import SeasonScreen from './Components/DashboardComponents/SeasonScreen';
import Dashboard from './Components/DashboardComponents/Dashboard';

function App()
{
  return (

    <div className="App">
      {/* <LoginButton /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginButton />} />
          <Route path="/login/" element={<Login />} />
          <Route path='/seasons/' element={<SeasonScreen />} />
          <Route path='/seasons/:id' element={<Dashboard />} />


        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;