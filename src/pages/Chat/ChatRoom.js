import React, { useEffect } from "react";
import "../../assets/css/chatRoom.css";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/imageRe.css";
import { API_BASE_URL, headers } from "../../store/services/api.config";
import axios from "axios";
import EchoInstance from "../../store/services/pusher.config";

const ChatRoom = () => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    EchoInstance.private(`chat.channel.2`).listen(".privateMessage", (data) => {
      console.log("===> get event from socket::: ", data);
      // setText(text + mess);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    const postData = {
      userId: user.id,
      message: message,
    };
    console.log(postData);
    return axios.post(API_BASE_URL + "/chat", postData, headers);
  };

  return (
    <div className="vh-100">
      {/* chat header */}
      <header className="chat-header d-flex justify-content-between px-3 py-2 border-bottom border-dark">
        <div className="d-flex">
          <div className="image-border">
            <img
              src={Object.keys(user).length !== 0 ? user.avatar : ""}
              className="image-avatar"
              alt="loading"
            />
          </div>
          <div className="w-100 mx-3">
            <span>Fin</span>
          </div>
        </div>
        <div>
          <Button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </div>
      </header>
      {/* chat content */}
      <article className="">
        <div className="chat-content border-bottom border-dark">
          <div className="message-view">{/* mess */}</div>
        </div>
        <div className="chat-tool">
          <div className="chat-toolbar">
            <Button size="sm">
              <FontAwesomeIcon icon={faPaperclip} />
            </Button>
          </div>
          <Form className="chat-input" onSubmit={handleSubmit}>
            <input type="text" name="message" className="w-100" />
          </Form>
        </div>
      </article>
    </div>
  );
};

export default ChatRoom;
