import React, { useState } from "react";
import "../../assets/css/navcontent.css";
import { Image } from "react-bootstrap";

const ListChat = () => {
  const [selectActive, setSelectActive] = useState(1);
  const [selectUser, setSelectUser] = useState(1);

  const handleClickChat = () => {
    console.log("handleClickChat");
    setSelectActive(1);
  };
  const handleClickContact = () => {
    console.log("handleClickContact");
    setSelectActive(2);
  };

  const handleClickUserChat = (userId) => {
    console.log(userId);
    setSelectUser(userId);
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
  const tempListUser = [
    {
      id: 1,
      name: "Vinh",
    },
    {
      id: 2,
      name: "Saga",
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
        {tempListUser.map((item) => (
          <div
            key={item.id}
            className={`d-flex chat-user-item px-3 ${
              selectUser === item.id ? "active" : ""
            }`}
            onClick={() => handleClickUserChat(item.id)}
          >
            <div className="user-item-avatar">
              <div className="avatar-size">
                <Image src="" alt="loading" />
              </div>
            </div>
            <div className="user-item-content">
              <div></div>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListChat;
