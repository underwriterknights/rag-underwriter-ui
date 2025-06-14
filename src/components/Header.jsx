import React, { useEffect } from "react";
import { useLocation  } from "react-router-dom";
const Header= (props) => {
  return (
    <div className='divTitle'>
        <img src="/src//assets//Logo.png" className='logo'></img>
        <h3 className='titleName'>Underwriter Knights</h3>
      </div> 
  );
}

export default Header;