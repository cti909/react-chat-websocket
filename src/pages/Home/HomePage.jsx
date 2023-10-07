import React, { useEffect, useState } from "react";
import ControlNavbar from "../../components/Home/ControlNavbar";
import home from "../../assets/image/home.jpg";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="d-flex vw-100">
      <ControlNavbar />
      <div
        className="d-flex justify-content-center align-items-center w-100 backgound-image"
        style={{ backgroundImage: `url("${home}")` }}
      >
        <div className="text-center">
          <h1>Hello {user.name}!</h1>
          <h1>Welcome to chat app</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
