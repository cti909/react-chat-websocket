import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import EchoInstance from "../../store/services/pusher.config";
import axios from "axios";
import {
  API_BASE_URL,
  authHeaders,
  headers,
} from "../../store/services/api.config";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../../store/actions/authAction";
// import { userFilterOtherAction } from "../../store/actions/userAction";

const FriendRequestTest = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userFilterSelector = useSelector((state) => state.user.userFilter);
  const [userFilter, setUserFilter] = useState([]);
  const [notificationRequest, setNotificationRequest] = useState([]);

  useEffect(() => {
    dispatch(setUserAction());
    // dispatch(userFilterOtherAction({ searchToken: "" }));
  }, []);

  useEffect(() => {
    setUserFilter(userFilterSelector);
  }, [userFilterSelector]);

  // Chat
  useEffect(() => {
    if (user) {
      EchoInstance.private(`chat.private.${user.id}`).listen(
        ".messageSent",
        (data) => {
          console.log("===> get event from socket::: ", data);
          setNotificationRequest((prevData) => [...prevData, data]);
        }
      );
      EchoInstance.private(`notification.friendInvite.{id}`).listen(
        ".friendInvite",
        (data) => {
          console.log("===> notify ", data);
          setNotificationRequest((prevData) => [...prevData, data]);
        }
      );
    }
  }, []);

  // // Thong bao
  // useEffect(() => {
  //   EchoInstance.private(`notification.friendInvite.{id}`).notification(
  //     ".notification",
  //     (data) => {
  //       console.log("===> notify ", data);
  //       setNotificationRequest((prevData) => [...prevData, data]);
  //     }
  //   );
  // }, []);

  const handleFriendRequest = (userId) => {
    console.log(userId);

    const postData = {
      owner_id: user.id,
      target_id: userId,
      status: "pending",
    };
    return axios.post(
      API_BASE_URL + "/users/actionFriendInvitation",
      postData,
      authHeaders
    );
  };
  return (
    <>
      <div>
        <Button>Notification</Button>
        {notificationRequest.length !== 0 &&
          notificationRequest.map((item) => (
            <div key={item.id} className="d-flex py-3">
              <div key={item.id} className="chat-option me-2">
                {item.name}
              </div>
              <Button onClick={() => handleFriendRequest(item.id)}>Send</Button>
            </div>
          ))}
      </div>
      <div className="border border-dark w-100 my-3"></div>
      <div>
        {userFilter.length !== 0 &&
          userFilter.map((item) => (
            <div key={item.id} className="d-flex py-3">
              <div key={item.id} className="chat-option me-2">
                {item.name}
              </div>
              <Button onClick={() => handleFriendRequest(item.id)}>Send</Button>
            </div>
          ))}
      </div>
    </>
  );
};

export default FriendRequestTest;
