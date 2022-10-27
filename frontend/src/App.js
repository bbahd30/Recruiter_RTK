// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginButton from './Components/LoginComp/LoginButton';
import Login from './Components/LoginComp/Login'
import SeasonScreen from './Components/SeasonScreen';
import Dashboard from './Components/DashboardComponents/Dashboard';
import RTStage from './Components/Stages/RTStage';
import Tests from './Components/Stages/Tests';

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


          <Route path='/seasons/:id'>
            <Route index element={<Dashboard />} />
            <Route path='rtstage' element={<RTStage />} />
            <Route path='rounds/:id' element={<Tests />} />

          </Route>



        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;