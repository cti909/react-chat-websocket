import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { API_BASE_URL, headers } from "../../store/services/api.config";

const Test = () => {
  const [text, setText] = useState("");
  const userId = 1;
  window.Pusher = Pusher;
  window.Echo = new Echo({
    authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
    broadcaster: "pusher",
    key: "asdf",
    cluster: "mt1",
    forceTLS: false,
    // wsHost: "127.0.0.1",
    // wsPort: 6001,
    // disableStatus: true,
    // encrypted: true,
    host: "127.0.0.1:6001",
    enabledTransports: ["ws", "wss"],
  });

  useEffect(() => {
    window.Echo.channel(`privateChannel.${userId}`).listen(
      ".privateMessage",
      (data) => {
        console.log("===> get event from socket::: ", data);
        // setText(text + mess);
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    const postData = {
      userId: userId,
      message: message,
    };
    return axios.post(API_BASE_URL + "/chat", postData, headers);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
      </form>
    </>
  );
};

export default Test;
