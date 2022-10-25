// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginButton from './Components/LoginComp/LoginButton';
import Login from './Components/LoginComp/Login'
import SeasonScreen from './Components/DashboardComponents/SeasonScreen';
import Dashboard from './Components/DashboardComponents/Dashboard';
import RTStage from './Components/Stages/RTStage';

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

          {/* <Route path='/seasons/:id' element={<Dashboard />}>
            <Route path='rtstage' element={<RTStage />} />
          </Route> */}

          <Route path='/seasons/:id'>
            <Route index element={<Dashboard />} />
            <Route path='rtstage' element={<RTStage />} />
          </Route>



        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;