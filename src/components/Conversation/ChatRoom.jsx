import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/chatRoom.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/imageRe.css";
import {
  API_BASE_URL,
  authHeaders,
  headers,
} from "../../store/services/api.config";
import axios from "axios";
import EchoInstance from "../../store/services/pusher.config";
import { Avatar } from "@mui/material";
import { sentMessageAction } from "../../store/actions/conversationAction";
import { useParams } from "react-router-dom";
import convertTime from "../../utils/ConvertTime";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { conversationId } = useParams();
  const messageView = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const conversation = useSelector(
    (state) => state.conversation.conversationDetail
  );
  const loading = useSelector((state) => state.conversation.loading);
  const [messageList, setMessageList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loading ? setIsLoading(true) : setIsLoading(false);
  }, [loading]);

  useEffect(() => {
    setMessageList(conversation.messageList);
    if (messageView.current) {
      const container = messageView.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [conversation, conversationId]);

  useEffect(() => {
    EchoInstance.join(`chat.public.${conversationId}`).listen(
      ".messageSent",
      (data) => {
        console.log("===> get event from socket::: ", data);
        setMessageList((prev) => [...prev, data]);
        if (messageView.current) {
          const container = messageView.current;
          container.scrollTop = container.scrollHeight;
        }
      }
    );
  }, [conversationId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (message !== "") {
      dispatch(
        sentMessageAction({
          content: message,
          path: "",
          senderId: user.id,
          conversationId: conversationId,
        })
      );
    }
    const container = messageView.current;
    container.scrollTop = container.scrollHeight;
    e.target.message.value = "";
  };

  const checkTimeLine = (messageId) => {
    // if (loading) return false;
    const mess = conversation.messageList;
    if (mess.length === 1) return true;
    const foundItem = mess.find((item) => item["id"] === messageId);
    const idx = mess.indexOf(foundItem);
    console.log(mess[idx]);
    if (idx === 0) return true;
    const idxBefore = mess.indexOf(foundItem) - 1;
    const updatedAt1 = new Date(mess[idx].created_at);
    const updatedAt2 = new Date(mess[idxBefore].created_at);
    const timeDifference = Math.abs(updatedAt2 - updatedAt1);
    return timeDifference > 60 * 60 * 1000;
  };

  return (
    <div className="vh-100">
      {conversationId ? (
        <>
          <header className="chat-header d-flex justify-content-between px-3 py-2 shadow">
            <div className="d-flex justify-content-between">
              <Avatar src="/static/images/avatar/1.jpg" />
              <div className="d-flex flex-column mx-2">
                <span className="w-100">
                  {conversation.conversationInformation.length !== 0
                    ? conversation.conversationInformation[0].name
                    : ""}
                </span>
                <span className="w-100">Latest active: </span>
              </div>
            </div>
            <div>
              <Button>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </div>
          </header>
          <article className="position-relative">
            <div className="chat-content border-bottom border-dark">
              <div className="message-view px-3" ref={messageView}>
                {!isLoading &&
                  messageList.map((item) => (
                    <div key={item.id}>
                      {checkTimeLine(item.id) && (
                        <>
                          <div className="d-flex justify-content-between align-items-center">
                            <hr style={{ width: "40%" }} />
                            {convertTime(item.created_at)}
                            <hr style={{ width: "40%" }} />
                          </div>
                        </>
                      )}
                      <div
                        key={item.id}
                        className={`d-flex my-1 ms-2 w-100 ${
                          user.id === item.sender.id
                            ? "rd-flex flex-row-reverse "
                            : "rounded-3"
                        }`}
                      >
                        <Avatar
                          alt={item.sender.name}
                          src={item.sender.avatar}
                        />
                        <div
                          className="d-flex flex-column message-color rounded-3 p-2 mx-2 text-break"
                          style={{ maxWidth: "40%" }}
                        >
                          {item.content}
                          <span
                            className="text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            {convertTime(item.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="position-absolute bottom-0 start-0 w-100 shadow">
              <Form className="chat-input px-2" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="message"
                  className="w-100 border-radius-50"
                />
              </Form>
            </div>
          </article>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <h1>Select a chat or start a new conversation</h1>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
