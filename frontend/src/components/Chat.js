import { useState, useContext } from "react";
import { socket } from "../context/socket";
import { UserContext } from "../context/User";
import "../styles/chat.scss";

function Chat({ active_game }) {
  const [messages, SetMessages] = useState([]);
  const [message, SetMessage] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);

  const [game, setgame] = useState()

  socket.off("receive-message").on("receive-message", (message, username) => {
    console.log("odebrano wiadomość:", message, username);
    SetMessages((messages) => [
      ...messages,
      { message: message, name: username },
    ]);
  });

  const handleSendMessage = () => {
    if (active_game) {
      if (message == active_game.topic && game!=active_game._id) {
        alert("YES!");
        setgame(active_game._id)
        socket.emit('add-point',userInfo.room,userInfo.username)
        socket.emit("send-message", userInfo.room, "guessed!", userInfo.username);
        SetMessage("");
      } 
      else if (message == active_game.topic && game==active_game._id) {
        alert("you already quess");
      }
      else {
        socket.emit("send-message", userInfo.room, message, userInfo.username);
        SetMessage("");
      }
    } else {
      socket.emit("send-message", userInfo.room, message, userInfo.username);
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
