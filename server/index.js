import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import userRouter from "./routers/UserRouter.js";
import gameRouter from "./routers/GameRouter.js";

const DB_URL = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.vuaacml.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRouter);
app.use("/api", gameRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinGame", (gameId) => {
    socket.join(gameId);
    io.to(gameId).emit("newPlayer", { playerId: socket.id });
  });

  socket.on("move", (data) => {
    io.to(data.gameId).emit("move", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Mongo connected");
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startApp();
