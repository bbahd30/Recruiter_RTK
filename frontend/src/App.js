// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginButton from './Components/LoginComp/LoginButton';
import Login from './Components/LoginComp/Login'
import SeasonScreen from './Pages/SeasonScreen';
import Dashboard from './Pages/Dashboard';
import RoundScreen from './Pages/RoundScreen';
import SectionScreen from './Pages/SectionScreen';
import InterviewScreen from './Pages/InterviewScreen';

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
            <Route path='interview/' element={<InterviewScreen />} />
          </Route>



        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;