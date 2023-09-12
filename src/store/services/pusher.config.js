import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { headers } from "./api.config";

window.Pusher = Pusher;

const EchoInstance = new Echo({
  broadcaster: "pusher",
  key: "asdf",
  cluster: "mt1",
  forceTLS: false,
  wsHost: "127.0.0.1",
  wsPort: 6001,
  disableStatus: true,
  encrypted: false,
  enabledTransports: ["ws", "wss"],
  authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
  auth: {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    withCredentials: true,
  },
});

export default EchoInstance;
