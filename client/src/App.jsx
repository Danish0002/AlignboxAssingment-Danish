import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState("User" + Math.floor(Math.random() * 100));

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get(`${API_URL}/messages`);
    setMessages(res.data);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post(`${API_URL}/messages`, { user, text });
    setText("");
    fetchMessages();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4 flex flex-col">
        <h1 className="text-xl font-bold text-center mb-4">💬 Chat App</h1>
        <div className="flex-1 overflow-y-auto border p-2 rounded mb-4 h-80">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <span className="font-semibold text-blue-600">{msg.user}: </span>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-l px-3 py-2 outline-none"
          />
          <button className="bg-blue-500 text-white px-4 rounded-r">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
