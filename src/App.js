import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState({});

  const API_URL = "http://127.0.0.1:5000";

  // Add User
  const addUser = () => {
    if (username.trim() === "") {
      alert("Username cannot be empty");
      return;
    }
    axios
      .post(`${API_URL}/add-user`, { username })
      .then(() => {
        fetchUsers();
        setUsername("");
      })
      .catch((err) => console.log(err));
  };

  // Fetch Users
  const fetchUsers = () => {
    axios
      .get(`${API_URL}/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  // Delete User
  const deleteUser = (id) => {
    axios
      .delete(`${API_URL}/delete-user/${id}`)
      .then(() => fetchUsers())
      .catch((err) => console.log(err));
  };

  // Send Message
  const sendMessage = (user) => {
    if (!messageText[user.id]?.trim()) {
      alert("Message cannot be empty");
      return;
    }
    axios
      .post(`${API_URL}/send_message`, {
        user_id: user.id,
        message: messageText[user.id],
      })
      .then(() => {
        fetchMessages();
        setMessageText({ ...messageText, [user.id]: "" });
      })
      .catch((err) => console.log(err));
  };

  // Fetch Messages
  const fetchMessages = () => {
    axios
      .get(`${API_URL}/messages`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
    fetchMessages();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>🔥 WhatsApp CRUD App</h1>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>

      {users.map((user) => (
        <div key={user.id} style={{ margin: "10px" }}>
          <strong>{user.username}</strong>
          <button onClick={() => deleteUser(user.id)}>Delete</button>

          <input
            type="text"
            placeholder="Type a Message"
            value={messageText[user.id] || ""}
            onChange={(e) =>
              setMessageText({ ...messageText, [user.id]: e.target.value })
            }
          />
          <button onClick={() => sendMessage(user)}>Send Message</button>
        </div>
      ))}

      <h2>Messages 🔥</h2>
      {messages.map((msg, index) => (
        <p key={index}>
          {users.find((u) => u.id === msg.user_id)?.username}: {msg.message}
        </p>
      ))}
    </div>
  );
}

export default App;
