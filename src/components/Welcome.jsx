import React from "react";
import '../Welcome.css';

import { useNavigate } from "react-router-dom";
const Welcome = () => {

const navigate = useNavigate();
  return (
    <div className="divBody">
        <div className="homeContainer">
            <h2 className="homeTitle">Welcome to Underwriter Knights</h2>
            <p className="homeDescription">
            Your one-stop solution for all underwriting needs.
            </p>
            <button className="registerButton" onClick={() => navigate("/register")}>Register</button>
            <button className="loginButton" onClick={() => navigate("/login")}>login</button>
        </div>


    </div>  

  );
}

export default Welcome;