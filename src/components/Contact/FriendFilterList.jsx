import React, { useEffect, useState } from "react";
import "../../assets/css/navcontent.css";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../../assets/css/imageRe.css";

const FriendFilterList = () => {
  const friendList = useSelector((state) => state.user.friendFilter);
  // const loading = useSelector((state) => state.user.loading);
  // useEffect(() => {}, [loading]);

  const handleClickUser = (friendId) => {
    
    console.log(friendId);
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="chat-select w-100">
          {friendList &&
            friendList.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-center align-items-center chat-user-item px-3 w-100"
                onClick={() => handleClickUser(item.id)}
              >
                <div className="user-item-avatar">
                  <div className="avatar-size">
                    <Image
                      src={item.avatar}
                      alt="loading"
                      className="image-avatar"
                    />
                  </div>
                </div>
                <div className="user-item-content">
                  <div>{item.name}</div>
                  <div className="text-muted" style={{ fontSize: 12 }}>
                    {item.email}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FriendFilterList;
