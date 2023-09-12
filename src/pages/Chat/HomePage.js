import React, { useEffect } from "react";
import NavControl from "./NavControl";
import NavChat from "./NavChat";
import ChatRoom from "./ChatRoom";
import "../../assets/css/chatRoom.css";

const HomePage = () => {
  return (
    <div className="d-flex">
      <div className="sidebarNav d-flex">
        <NavControl />
        <NavChat />
      </div>
      <main className="chat-room">
        <ChatRoom />
      </main>
    </div>
  );
};

export default HomePage;
