import React from "react";
import ChatBot from "react-chatbotify";
const Home = (props) => {
    const flow = {
    start: {
      message: "Who are you?",
      path: "end"
    },
    end: {
      message: (params) => `Hi ${params.userInput}!`,
      chatDisabled: true
    }
  }
  const settings = {
    isOpen: true,
    general: {
      primaryColor: '#1e88f5',
      secondaryColor: '#f5421e',
      fontFamily: 'Arial, sans-serif',
      embedded: false
    },
    audio: {
      disabled: false,
    },
    chatHistory: {
      storageKey: "concepts_settings"
    }
    // other sections
  };


  return (
    <div className='divHome'>
     <div >
        <ChatBot settings={settings} flow={flow} />
      </div>
    </div>
  );
}

export default Home;