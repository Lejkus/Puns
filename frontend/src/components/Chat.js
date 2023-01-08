import { useState, useContext } from "react";
import { socket } from "../context/socket";
import { UserContext } from "../context/User";
import "../styles/chat.scss";

function Chat({ active_game }) {
  const [messages, SetMessages] = useState([]);
  const [message, SetMessage] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);

  socket.off("receive-message").on("receive-message", (message, username) => {
    console.log("odebrano wiadomość:", message, username);
    SetMessages((messages) => [
      ...messages,
      { message: message, name: username },
    ]);
  });

  const handleSendMessage = () => {
    if (active_game) {
      if (message == active_game.topic) {
        alert("tak!");
        socket.emit("send-message", userInfo.room, "Zgadł", userInfo.name);
      } else {
        socket.emit("send-message", userInfo.room, message, userInfo.name);
        SetMessage("");
      }
    } else {
      socket.emit("send-message", userInfo.room, message, userInfo.name);
      SetMessage("");
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message, index) => (
          <p className="message" key={index}>
            {message.name + ":"} {message.message}
          </p>
        ))}
      </div>
      <div className="form">
        <input
          className="form__field"
          onChange={(e) => {
            SetMessage(e.target.value);
          }}
          placeholder="Enter Text"
          value={message}
        />
        <button
          type="button"
          className="btn btn--primary btn--inside uppercase"
          onClick={() => handleSendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
