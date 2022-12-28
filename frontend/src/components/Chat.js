import { useState, useContext } from "react";
import { socket } from "../context/socket";
import { UserContext } from "../context/User";

function Chat() {
  const [messages, SetMessages] = useState([]);
  const [message, SetMessage] = useState();
  const {userInfo,setUserInfo} = useContext(UserContext)
  socket.off("receive-message").on("receive-message", (message) => {
    console.log("odebrano wiadomość:", message);
    SetMessages((messages) => [...messages, message]);
  });


const handleSendMessage = () =>{
  socket.emit("send-message", userInfo.room, message);
}

  return (
    <div className="chat">
      {messages.map((message,index) => (
        <div key={index}>{message}</div>
      ))}
      <input
        onChange={(e) => {
          SetMessage(e.target.value);
        }}
        placeholder="Enter Text"
      />
      <button onClick={() => handleSendMessage()}>Send</button>
    </div>
  );
}

export default Chat;
