import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import ControlNavbar from "../../components/Home/ControlNavbar";
import FriendInvitation from "../../components/Contact/FriendInvitation";
import GroupList from "../../components/Contact/GroupList";
import UserFilter from "../../components/Contact/UserFilter";
import FriendList from "../../components/Contact/FriendList";

const ContactHome = () => {
  const dispatch = useDispatch();
  const [actionChoose, setActionChoose] = useState(0);
  const [view, setView] = useState("List friend");

  const handleChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };
  const handleSearchUser = (value) => {
    setActionChoose(value);
  };

  return (
    <div className="d-flex vw-100">
      <ControlNavbar />

      <div className="d-flex w-100">
        <div className="navcontent-width navcontent-border">
          <div className="navcontent-width">
            <ToggleButtonGroup
              orientation="vertical"
              value={view}
              exclusive
              onChange={handleChange}
              className="w-100"
            >
              <ToggleButton value="List friend">List friend</ToggleButton>
              <ToggleButton value="List group">List group</ToggleButton>
              <ToggleButton value="Search user">Search user</ToggleButton>
              <ToggleButton value="Friend invitation">
                Friend Invitation
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        {/* feature */}
        <main className="w-100 vh-100">
          <div className="border p-3" style={{ height: "64px" }}>
            <span className="d-flex align-items-center h-100">{view}</span>
          </div>
          <div
            className="p-3"
            style={{
              backgroundColor: "#f7f7f8",
              height: "calc(100% - 64px)",
              overflowY: "auto",
            }}
          >
            {view === "List group" ? (
              <GroupList />
            ) : view === "Search user" ? (
              <UserFilter />
            ) : view === "Friend invitation" ? (
              <FriendInvitation />
            ) : (
              <FriendList />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactHome;
