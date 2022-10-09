// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginButton from './Components/LoginComponent/LoginButton';
import Login from './Components/LoginComponent/Login'

function App()
{
  return (

    <div className="App">
      {/* <LoginButton /> */}
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginButton />} />  
          <Route path="/login/" element={<Login />} />
        </Routes>
    </BrowserRouter>
    
    </div>
  
  );
}

export default App;