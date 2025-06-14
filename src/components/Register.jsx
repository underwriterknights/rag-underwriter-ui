import React from "react";
import '../Register.css'; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";
import {RegisterUserApi}  from '../service/api' // Adjust the import path as necessary
const Register = () => {

    const navigate = useNavigate();

      onsubmit = (event) => {
        event.preventDefault();
        // Here you would typically handle the login logic, such as calling an API
        // For now, we'll just log the input values to the console
        const newUserDetails={
            full_name: event.target.fullname.value,
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value
        }
        RegisterUserApi(newUserDetails).then((response) => {
            console.log("User registered successfully:", response);
            navigate("/login");
        }).catch((error) => {
            alert("Registration failed. Please try again.");
            console.error("Registration error:", error);
        });
       // Redirect to home page after login
        
    }
  return (
    <div className="register-container">
      <div className="content">
        <h2>Register</h2>
        <form>
         <label htmlFor="fullname" className="label">Full Name:</label>
          <br/>
          <input className="inputField" type="text" id="fullname" name="fullname" required />
          <br/>
          <label htmlFor="username" className="label">Username:</label>
          <br/>
          <input className="inputField" type="text" id="username" name="username" required />
          <br/>
          <label htmlFor="email" className="label">Email:</label>
          <br/>
          <input className="inputField" type="email" id="email" name="email" required />
          <br/>
          <label htmlFor="password" className="label">Password:</label>
          <br/>
          <input className="inputField" type="password" id="password" name="password" required />
          <br/>
          <button type="submit" className="buttonRegister" >Register</button>

          <button className="buttonLogin" onClick={() => navigate("/login")} >Go to Login Page</button>
        </form>
      </div>     
    </div>
  );
}

export default Register;