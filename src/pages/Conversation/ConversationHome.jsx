import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { friendFilterAction } from "../../store/actions/userAction";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserPlus, faX } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/navcontent.css";
import { Button, TextField } from "@mui/material";
import { getAllConversationHaveMessageAction } from "../../store/actions/conversationAction";
import ConversationList from "../../components/Conversation/ConversationList";
import FriendFilterList from "../../components/Contact/FriendFilterList";
import ControlNavbar from "../../components/Home/ControlNavbar";
import { useParams } from "react-router-dom";
import ChatRoom from "../../components/Conversation/ChatRoom";
import CreateGroup from "../../components/Conversation/CreateGroup";

const ConversationHome = () => {
  const dispatch = useDispatch();
  const { conversationId } = useParams();
  const friendFilter = useSelector((state) => state.user.friendFilter);
  const [showListFriend, setShowListFriend] = useState(false);
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const handleShowFriend = () => {
    setShowListFriend(false);
    setIsSubmitForm(false);
  };

  const handleChangeSearchUser = (e) => {
    console.log(e.target.value);
    dispatch(friendFilterAction({ searchToken: e.target.value }));
    setIsSubmitForm(true);
    setShowListFriend(true);
  };

  const handleClickCreateGroup = () => {
    setShowCreateGroup(!showCreateGroup);
  };

  return (
    <div className="d-flex w-100">
      <ControlNavbar />
      <CreateGroup
        showCreateGroup={showCreateGroup}
        setShowCreateGroup={() => setShowCreateGroup()}
      />
      <div className="navcontent-width navcontent-border">
        <div className="navcontent-width p-3">
          <div className="d-flex justify-content-center align-items-center">
            <TextField
              id="outlined-basic"
              label="Search friend"
              variant="outlined"
              size="small"
              name="searchUserToken"
              onChange={handleChangeSearchUser}
            />
            <div className="ms-2">
              <Button size="large" onClick={handleClickCreateGroup}>
                <FontAwesomeIcon icon={faUserPlus} />
              </Button>
            </div>
          </div>
        </div>

        <div className="navcontent-chat w-100">
          {showListFriend ? (
            <div>
              <div className="d-flex justify-content-end px-3">
                <Button
                  size="sm"
                  variant="outline-dark"
                  onClick={handleShowFriend}
                >
                  <FontAwesomeIcon icon={faX} />
                </Button>
              </div>
              <FriendFilterList />
            </div>
          ) : (
            <ConversationList />
          )}
        </div>
      </div>
      <main className="chat-room">
        <ChatRoom />
      </main>
    </div>
  );
};

export default ConversationHome;
