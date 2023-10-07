import React, { useEffect, useState } from "react";
import "../../assets/css/navcontent.css";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllConversationHaveMessageAction,
  getConversationAction,
} from "../../store/actions/conversationAction";
import { Avatar, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ConversationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const conversationList = useSelector(
    (state) => state.conversation.conversationList
  );
  const user = useSelector((state) => state.auth.user);
  const [selectActive, setSelectActive] = useState(1);
  const [conversationSelect, setConversationSelect] = useState(null);
  console.log(conversationSelect);

  useEffect(() => {
    setConversationSelect(conversationId);
  }, []);

  useEffect(() => {
    if (conversationId)
      dispatch(getConversationAction({ conversationId: conversationId }));
  }, [conversationId]);

  useEffect(() => {
    console.log(user);
    if (Object.keys(user).length > 0)
      dispatch(getAllConversationHaveMessageAction({ memberId: user.id }));
  }, [user]);

  const handleClickChat = () => {
    console.log("handleClickChat");
    setSelectActive(1);
  };
  const handleClickContact = () => {
    console.log("handleClickContact");
    setSelectActive(2);
  };

  const handleClickConversation = (conversationIdSelect) => {
    console.log(conversationIdSelect);
    setConversationSelect(conversationIdSelect);
    dispatch(getConversationAction({ conversationId: conversationIdSelect }));
    navigate("/conversation/" + conversationIdSelect);
  };

  const activeSeclect = [
    {
      id: 1,
      value: "All",
      event: handleClickChat,
    },
    {
      id: 2,
      value: "Not read",
      event: handleClickContact,
    },
  ];
  return (
    <div>
      <div className="d-flex justify-content-between px-3 navcontent-chat-border">
        <div className="d-flex chat-select">
          {activeSeclect.map((item) => (
            <div
              key={item.id}
              className={`chat-option me-2 ${
                selectActive === item.id ? "active" : ""
              }`}
              onClick={item.event}
            >
              {item.value}
            </div>
          ))}
        </div>
        <div>Sort</div>
      </div>
      <div className="chat-user-list">
        {conversationList.length !== 0 &&
          conversationList.map((item) => (
            <div
              key={item.id}
              className={`d-flex align-items-center chat-user-item px-3 ${
                conversationSelect === item.id ? "active" : ""
              }`}
              onClick={() => handleClickConversation(item.id)}
            >
              <div className="user-item-avatar">
                <div className="avatar-size">
                  <Avatar alt={item.name} />
                </div>
              </div>
              <div className="user-item-content ms-2">
                <div></div>
                <span>{item.name}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConversationList;
