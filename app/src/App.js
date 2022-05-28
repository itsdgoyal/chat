import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [initMessagesList, setInitMessages] = useState([]);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  useEffect(() => {
    socket.on("init_messages", (data) => {
      setInitMessages(data);
    });
  });
  console.log(initMessagesList);
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Begin your conversation</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username}
          room={room}
          initMessagesList={initMessagesList}
        />
      )}
    </div>
  );
}

export default App;
