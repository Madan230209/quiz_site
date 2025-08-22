import { useContext } from "react";
import { AuthContext, type IAuthContext } from "../App";
import "../NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  const accessToken = localStorage.getItem("accessToken");
  const {isAuth, setAuthState} = useContext<IAuthContext>(AuthContext);

  const LogoutHandler = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
    alert("Logged out successfully");
    setAuthState((prev) => ({
      ...prev,
      isAuth: false,
    }));
  };
  return (
    <nav>
      <NavLink className='navlink' to="/">Home</NavLink>
      <NavLink className='navlink' to="/about">About Us</NavLink>
      {isAuth ?(
    <>
      <NavLink className='navlink' to="/profile">Profile</NavLink>
      <NavLink className='navlink' to="/questionset/list">Question Set</NavLink>
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