// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginButton from './Components/LoginComp/LoginButton';
import Login from './Components/LoginComp/Login'
import SeasonScreen from './Pages/SeasonScreen';
import Dashboard from './Pages/Dashboard';
import RTStage from './Pages/RTStage';
import TestOfRound from './Components/Stages/TestOfRound';
import InterviewStage from './Components/Stages/InterviewStage';

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
            <Route path='rounds/:id' element={<TestOfRound />} />
            <Route path='interviewstage' element={<InterviewStage />} />
          </Route>



        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;