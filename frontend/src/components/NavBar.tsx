import "../NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  const accessToken = localStorage.getItem("accessToken");

  const LogoutHandler = () => {
    localStorage.removeItem("accessToken");
    alert("Logged out successfully");
  };
  return (
    <nav>
      <NavLink className='navlink' to="/">Home</NavLink>
      <NavLink className='navlink' to="/about">About Us</NavLink>
      {accessToken ?(
    <>
      <NavLink className='navlink' to="/profile">Profile</NavLink>
      <button onClick={LogoutHandler}>Logout</button>
    </>): 
    (
    <>
      <NavLink className='navlink' to="/login">Login</NavLink>
    </>
    )}
    </nav>
  );
}
export default NavBar;
// This component can be used to navigate between different pages in the application.