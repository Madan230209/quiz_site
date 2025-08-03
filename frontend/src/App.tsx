import { Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import NavBar from './components/NavBar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  
  return(
    <> 
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path='/about' element={<AboutUsPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </>
  );
}

export default App
