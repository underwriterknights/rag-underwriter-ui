import React, { use, useState,useEffect } from 'react';
import '../styles/ChatBot.css'; // Assuming you have a CSS file for styling

const ChatBot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [primaryOptionSelected, setPrimaryOptionSelected] = useState("");
  const [messages, setMessages] = useState([
     { text: "Hello User!", sender: "bot" },
    { text: "Please start with below options or custom message", sender: "bot" },
  ]);
  const [newMessage, setNewMessage] = useState('');
 const chatOptions = [     
    "Underwriting Decisions",
    "Policy Document Verification",
    "Claims Processing",
    "Risk Assessment"]

 const chatOptionsUnderwritingDecisions = [
    "Driver Information",
    "Vehicle Details",
    "Location Information"
    ];

const [selectedFile, setSelectedFile] = useState(null);
const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
     if (!e.target.files[0]) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    // For demonstration: log to console instead of sending
    console.log('Uploading file:', e.target.files[0].name);
     // Placeholder for file upload logic
    setPrimaryOptionSelected("File Upload");
    setMessages([...messages, { text: "File uploaded successfully!", sender: "user" }]);
};

  const toggleChat = () => {
    setIsVisible(!isVisible);
  };

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { text: newMessage, sender: "user" }]);
    setNewMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Got it!", sender: "bot" }]);
    }, 1000);
  };

  const handleChatOptions = (option) => {
    setPrimaryOptionSelected(option);
     setMessages([...messages, { text: option, sender: "user" }]);
    setNewMessage('');
  }

  useEffect(() => {
    if (primaryOptionSelected === "Underwriting Decisions") {
      setMessages([...messages,{ text: "Please provide the DRIVER information in below format or upload document:\n\nDriver Full Name(Firstname, Middlename, Lastname):\nLicense Number:\nState:\nDate of Birth(MM/DD/YYY):", sender: "bot" }]);

    }
  }, [primaryOptionSelected]);


  return (
    <div className="chat-wrapper">
      {!isVisible && <button className="toggle-button" onClick={toggleChat}>
        {isVisible ? 'Hide Chat' : 'Show Chat'}
      </button>}

      {isVisible && (
        <div className="chat-container">
          <div className="chat-header">
            Underwriter Chat
             <button className="minimizeButton" onClick={toggleChat}>-</button>
            <button className="closeButton" onClick={toggleChat}>X</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                <span className='spanMessage'>{msg.text}</span>
              </div>
            ))}
            {!primaryOptionSelected && <div className='divChatButtons'>
                {chatOptions.map((option, index) => ((
                <button key={index} className="buttonChatOptions" onClick={e=>handleChatOptions(option)} >{option}</button>
                )))}           
            </div>}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
             <div>
               <label for="browse"><img src="/src//assets//FileUpload.png"  className="attachIcon" /></label>
               <input type="file" id="browse" name="browse" style={{display: "none"}} onChange={handleFileChange} multiple/>
            </div>
             
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
