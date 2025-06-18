import React from "react";
import ChatBot from "./Chatbot";
import AgentGrid from "./AgentGrid";
import '../styles/Home.css'; // Assuming you have a CSS file for styling
import UnderwriterGrid from "./UnderwriterGrid"; // Import the UnderwriterGrid component
const Home = (props) => {
    

  return (
    <div className='divHome'>
    {props.loggedUser && props.loggedUser.role=='Underwriter'? <div className='divBackground'>
       <UnderwriterGrid></UnderwriterGrid>
      </div>:<div> <AgentGrid></AgentGrid></div>}
    </div>
  );
}

export default Home;