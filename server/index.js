import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import userRouter from "./routers/UserRouter.js";
import gameRouter from "./routers/GameRouter.js";
import GameService from "./services/GameService.js";
dotenv.config();

const DB_URL = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.vuaacml.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const server = http.createServer(app);

app.use("/users", userRouter);
app.use("/games", gameRouter);

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
    const newGameState = GameService.handleMove(data);
    console.log(`Socket data: ${socket}`);
    newGameState.then((res) => io.emit("returnState", res));
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Mongo connected");
    server.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startApp();
