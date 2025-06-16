import React from "react";
import ChatBot from "./Chatbot";
const Home = (props) => {
    

  return (
    <div className='divHome'>
     <div  backgrouproundImage="url('/src/assets/Underwriter.jpg')" className='divBackground'>
        <ChatBot loggedUser={props.loggedUser} />
      </div>
    </div>
  );
}

export default Home;