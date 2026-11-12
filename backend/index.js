import express from "express";
import router from "./routes/leads.route.js";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { initializeSocket } from "./config/socket.js";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({
  origin: [
    "http://localhost:8081",
    
  ],
}));
app.use(express.json());
app.use("/api", router);

connectDB();

app.get("/", (req, res) => {
  res.send("Health check successful");
})



const server = http.createServer(app);
const io = initializeSocket(server);


io.on("connection", (socket) => {

  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);
});
