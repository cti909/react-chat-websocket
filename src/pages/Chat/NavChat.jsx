import React, { useEffect, useState } from "react";
import "../../assets/css/navcontent.css";
import ListChat from "../../components/Chat/ListChat";
import { useDispatch, useSelector } from "react-redux";
import FriendList from "../../components/User/FriendList";
import FriendFilter from "../../components/User/FriendFilter";

const NavChat = () => {
  const dispatch = useDispatch();
  const searchUser = useSelector((state) => state.user.searchUser);
  const [showListFriend, setShowListFriend] = useState(false);

  useEffect(() => {
    if (searchUser.length !== 0) {
      setShowListFriend(true);
    }
  }, [searchUser]);

  return (
    <div className="navcontent-width navcontent-border">
      <div className="navcontent-search-width d-flex justify-content-between align-items-center px-3">
        <FriendFilter />
      </div>

      <div className="navcontent-chat">
        {showListFriend ? <FriendList /> : <ListChat />}
      </div>
    </div>
  );
};

export default NavChat;
