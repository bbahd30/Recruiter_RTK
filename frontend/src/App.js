// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginButton from './Components/LoginComp/LoginButton';
import Login from './Components/LoginComp/Login'
import SeasonScreen from './Pages/SeasonScreen';
import Dashboard from './Pages/Dashboard';
import RoundScreen from './Pages/RoundScreen';
import InterviewStage from './Components/Stages/InterviewStage';
import SectionScreen from './Pages/SectionScreen';

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


          <Route path='/seasons/:id/'>
            <Route index element={<RoundScreen />} />
            <Route path='applicants' element={<Dashboard />} />
            <Route path='rounds/:roundId' element={<SectionScreen />} />
            <Route path='interviewstage' element={<InterviewStage />} />
          </Route>



        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;