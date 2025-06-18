import React from "react";
import '../styles/Login.css'; // Assuming you have a CSS file for styling
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import {UserLoginApi} from '../service/api'; // Adjust the import path as necessary

const Login = (props) => {

    const navigate = useNavigate();

    onsubmit = (event) => {
        event.preventDefault();
        // Here you would typically handle the login logic, such as calling an API
        // For now, we'll just log the input values to the console
        const username = event.target.username.value;
        const password = event.target.password.value;
        
        const userDetail={
            username: username,
            password: password  
        }
          UserLoginApi(userDetail).then((response) => {                    
                     if(response.full_name) {
                           props.setLoggedUser(response); // Set the logged user in the parent component
                           navigate("/home");
                        }else{
                          alert("Login Failed - " + response.message);
                          return;
                        }
                   
                }).catch((error) => {
                    alert("Login failed. Please try again.");
                    console.error("Login error:", error);
                });
        
    }
  return (
    <div className="login-container">
        <div className="content">
            <h2>Login</h2>
            <form>
            <label htmlFor="username" className="label">Username:</label>
            <br/>
            <input className="inputField" type="text" id="username" name="username" required />
            <br/>
            <label htmlFor="password" className="label">Password:</label>
            <br/>
            <input className="inputField" type="password" id="password" name="password" required />
            <br/>
            <button type="submit" className="buttonLogin" >Login</button>
            <button className="buttonRegister" onClick={() => navigate("/register")} >Go to Register</button>

            </form>
        </div>
        
    </div>
    
  );
}

export default Login;