import React, { useState } from "react";
import "../../assets/css/navcontent.css";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const FriendList = () => {
  const friendList = useSelector((state) => state.user.searchUser);
  console.log(friendList);
  return (
    <div>
      <div className="d-flex justify-content-between px-3 navcontent-chat-border">
        <div className="d-flex chat-select">
          {friendList.map((item) => (
            <div key={item.id} className="chat-option me-2">
              {item.name}
            </div>
          ))}
        </div>
        <div>Sort</div>
      </div>
    </div>
  );
};

export default FriendList;
