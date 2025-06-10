import { useState } from 'react'
import './App.css'
import ChatBot from "react-chatbotify";



function App() {
  const [count, setCount] = useState(0)
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
    
    <div >
      <div className='divTitle'>
        <img src="/src//assets//Logo.png" className='logo'></img>
        <h3 className='titleName'>Underwriter Knights</h3>
      </div>     
      <div className="divheader" >
        <ChatBot settings={settings} flow={flow} />
      </div>
      <div  className='divFooter'>
        <h1></h1>
      </div>
     </div>
    
  )
}

export default App
