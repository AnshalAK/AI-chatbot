import axios from 'axios';
import React, { useState } from 'react';
import "./App.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (input.trim() === "") return;

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);
        setInput("");

        try {
            // Replace with your Flask backend URL
            const response = await axios.post("http://127.0.0.1:5000/chat", {
                message: input,
            });

            const botResponse = {
                sender: "bot",
                text: response.data.response, // Extracting chatbot's reply
            };
            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error("API Error:", error.message);
            const botError = { sender: "bot", text: "Sorry, I couldn't process that. Please try again." };
            setMessages((prev) => [...prev, botError]);
        }
    };

    return (
        <div className="chat-app">
            <div className="chat-header">Chatbot</div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-bubble ${msg.sender === "user" ? "user-bubble" : "bot-bubble"}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
