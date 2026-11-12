import { io } from "socket.io-client";


export const socket = io("http://192.168.29.87:5000", {
  autoConnect: false,
});



socket.on("connect", () => {
  console.log("Connected to backend:", socket.id);
});

socket.on("connect_error", (error) => {
  console.log("Socket connection error:", error.message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from backend");
});


export const connectSocket = () => {
  socket.connect();
};