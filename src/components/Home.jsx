import React from "react";

import AgentGrid from "./AgentGrid";
import '../styles/Home.css'; // Assuming you have a CSS file for styling
import UnderwriterGrid from "./UnderwriterGrid"; // Import the UnderwriterGrid component

const Home = (props) => {
   let loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    return (
    <div className='divHome'>
    {loggedUser && loggedUser.role=='Underwriter'? <div className='divBackground'>
       <UnderwriterGrid></UnderwriterGrid>
      </div>:<div> <AgentGrid></AgentGrid></div>}

    </div>
  ); 
}

export default Home;