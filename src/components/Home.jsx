import React from "react";
import ChatBot from "./Chatbot";
import {UploadComponent} from "./Upload";
import { UpdatePolicy } from "aws-cdk-lib/aws-autoscaling";
import "../styles/Home.css";

const Home = (props) => {
    return (
    <div className='divHome'>
     <div  backgrouproundImage="url('/src/assets/Underwriter.jpg')" className='divBackground'>
        <ChatBot loggedUser={props.loggedUser} />
      </div>
      <UploadComponent />
    </div>
  ); 
}

export default Home;