import React from "react";
import '../Login.css'; // Assuming you have a CSS file for styling
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const navigate = useNavigate();

    onsubmit = (event) => {
        event.preventDefault();
        // Here you would typically handle the login logic, such as calling an API
        // For now, we'll just log the input values to the console
        const username = event.target.username.value;
        const password = event.target.password.value;
        console.log("Username:", username);
        console.log("Password:", password);
         props.setIsLoggedIn(true); // Set the login state to true
        // Redirect to home page after login
        navigate("/Home");
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