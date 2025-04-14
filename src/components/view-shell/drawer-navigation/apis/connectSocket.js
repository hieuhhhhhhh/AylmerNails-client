import { io } from "socket.io-client";
import { useMyProfile, useNotificationCount } from "@/stores/myProfile";

const validRoles = ["developer", "admin"];

let socket;
let role;
let token;

export function connectSocket() {
  console.log("connecting socket");

  // pinia store
  const MPstore = useMyProfile();
  const NCstore = useNotificationCount();

  // get role and token from the store
  role = MPstore.role;
  token = MPstore.token;

  // if roles not valid, return
  if (!validRoles.includes(role)) return;

  // start connecting
  const baseURL = process.env.VUE_APP_BASE_URL;
  socket = io(baseURL);

  // NEW BOOKING
  socket.on("new_appo_count", (data) => {
    // update the count into the store
    NCstore.setNewAppoCount(data.count);
    console.log("new appo count", data.count);
  });

  socket.on("new_appo_booked", () => {
    socket.emit("get_new_appo_count", { token });
  });

  // NEW CANCELING
  socket.on("new_canceled_count", (data) => {
    // update the count into the store
    NCstore.setNewCanceledAppoCount(data.count);
    console.log("new canceled count", data.count);
  });

  socket.on("new_appo_canceled", () => {
    socket.emit("get_new_canceled_count", { token });
    socket.emit("get_new_appo_count", { token });
  });

  // NEW USERS
  socket.on("new_user_count", (data) => {
    // update the count into the store
    NCstore.setNewUserCount(data.count);
  });

  socket.on("new_user_created", () => {
    socket.emit("get_new_user_count", { token });
  });

  // NEW SAVED APPOS
  socket.on("new_saved_count", (data) => {
    // update the count into the store
    NCstore.setNewSavedCount(data.count);
  });

  socket.on("new_appo_saved", () => {
    socket.emit("get_new_saved_count", { token });
  });

  // NEW BLACKLIST
  socket.on("new_blacklist_count", (data) => {
    // update the count into the store
    NCstore.setNewBlacklistCount(data.count);
  });

  socket.on("new_phone_num_banned", () => {
    socket.emit("get_new_blacklist_count", { token });
  });

  // fetch data when start connecting
  socket.emit("get_new_appo_count", { token });
  socket.emit("get_new_canceled_count", { token });
  socket.emit("get_new_user_count", { token });
  socket.emit("get_new_saved_count", { token });
  socket.emit("get_new_blacklist_count", { token });

  return socket;
}

export function fetchNewAppoCount() {
  if (!socket) return;
  socket.emit("get_new_appo_count", { token });
}

export function fetchNewCanceledCount() {
  if (!socket) return;
  socket.emit("get_new_canceled_count", { token });
}

export function fetchNewUserCount() {
  if (!socket) return;
  socket.emit("get_new_user_count", { token });
}
