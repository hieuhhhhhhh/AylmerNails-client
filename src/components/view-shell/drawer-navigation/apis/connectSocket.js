import { io } from "socket.io-client";
import { useMyProfile, useNewAppoCount } from "@/stores/myProfile";

const validRoles = ["developer", "admin"];

let socket;
let role;
let token;

export function connectSocket() {
  console.log("connecting socket");

  // pinia store
  const MPstore = useMyProfile();
  const NACstore = useNewAppoCount();

  // get role and token from the store
  role = MPstore.role;
  token = MPstore.token;

  // if roles not valid, return
  if (!validRoles.includes(role)) return;

  // start connecting
  const baseURL = process.env.VUE_APP_BASE_URL;
  socket = io(baseURL);

  socket.on("new_appo_count", (data) => {
    // update the count into the store
    NACstore.setNewAppoCount(data.count);

    console.log("new appo count", data.count);
  });

  socket.on("new_appo_booked", () => {
    socket.emit("get_new_appo_count", { token });
  });

  socket.emit("get_new_appo_count", { token });

  return socket;
}

export function fetchNewAppoCount() {
  if (!socket) return;
  socket.emit("get_new_appo_count", { token });
}
