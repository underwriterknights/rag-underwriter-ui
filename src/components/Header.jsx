import React from "react";
import { useLocation,Link, Navigate } from 'react-router-dom'
import "../styles/App.css"
import Logo from "../assets/Logo.png"
const Header= () => {

  const getUserName =()=>{
   const location = useLocation();
   let userFromSession = localStorage.getItem('loggedUser');
   if(userFromSession && (location.pathname==="/home" ||location.pathname==="/Home"  ))
      return "Welcome " + JSON.parse(userFromSession).full_name;
   else
    return ""
  }

  const handleLogOut = ()=>{  
    localStorage.setItem("loggedUser","")
    Navigate("/")
  }
  return (
    <div className='divTitle'>
        <div>
        <img src={Logo} className='logo'></img>
        <h3 className='titleName'>Underwriter Knights</h3>
        </div> 
        <div className="divUserName">
          <p className="spanUserName">{getUserName()} </p>
           {(location.pathname==="/home" ||location.pathname==="/Home") &&
           <Link className="logOutButton" onClick={handleLogOut}>Log out</Link>}
        </div>       
       
      </div> 
  );
}

export default Header;
