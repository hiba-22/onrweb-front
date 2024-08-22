import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCommentDots, faPaperPlane,faRobot,faUser } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/ChatBotButton.css'; 

const ChatBot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };
    const handleSendMessage = async () => {
        if (userMessage.trim() !== "") {
            // Add user message to the chat
            setMessages([...messages, { text: userMessage, user: true }]);
            const currentUserMessage = userMessage;
            setUserMessage("");
            try {
                // Send user's message to the API
                const response = await fetch('http://127.0.0.1:5000/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: currentUserMessage }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMessages(prevMessages => [...prevMessages, { text: data.response, user: false }]);
            } catch (error) {
                console.error("Error fetching chatbot response:", error);
                setMessages(prevMessages => [...prevMessages, { text: "Sorry, something went wrong. Please try again later.", user: false }]);
            }
        }
    };

    return (
        <>
            {isChatOpen ? (
                <div className="chat-container">
                    <div className="chat-header">
                        <span>Chat ONRWEB</span>
                        <button onClick={toggleChat}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <div className="chat-body">
                        {messages.map((msg, index) => (
                        <div key={index} className={msg.user ? 'user-message' : 'bot-message'}>
                            {msg.user ? (
                            <FontAwesomeIcon icon={faUser} className="message-icon-user" />
                            ) : (
                            <FontAwesomeIcon icon={faRobot} className="message-icon" />
                            )}
                            <span className="message-text">{msg.text}</span>
                        </div>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSendMessage}><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                </div>
            ) : (
                <button className="chat-toggle-btn" onClick={toggleChat}>
                    <FontAwesomeIcon icon={faCommentDots} />
                </button>
            )}
        </>
    );
};

export default ChatBot;
