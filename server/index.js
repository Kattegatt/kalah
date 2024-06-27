import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import userRouter from "./routers/UserRouter.js";
import gameRouter from "./routers/GameRouter.js";
import GameService from "./services/GameService.js";
import Game from "./game_logic/Game.js";
import { uuid } from "./services/generate.js";
import MUUID from "uuid-mongodb";
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

const games = new Array();

io.on("connection", (socket) => {
  console.log("SOCKET ID ON CONNECTION", socket.id);
  console.log("New client connected");
  // Create Game
  socket.on("createGame", async () => {
    // const newUuid = uuid();
    // const mUUID4 = MUUID.v4();
    // console.log("socket.on ~ gameId:", mUUID4);

    const dbGame = await GameService.create();
    console.log("socket.on ~ dbGame _id:", dbGame._id);
    const gameId = dbGame._id.toString();
    const game = new Game(gameId);
    game.addPlayer(socket.id);
    socket.emit("createdGame", gameId);
    games.push(game);
  });

  socket.on("joinGame", (gameId) => {
    socket.join(gameId);
    console.log(`socket with id ${socket.id} joined game ${gameId}`);
    const users = io.sockets.adapter.rooms.get(gameId);
    console.log("Users in the game", users);

    // if sockets in room === 2
    // emit startGame
    io.to(gameId).emit("newPlayer", { playerId: socket.id });
  });

  socket.on("move", async ({ gameState, cellData }) => {
    let game = games.find((game) => game.players.includes(socket.id));
    const gameId = game.id;
    console.log("games before move", games[0].gameState);
    await game.handleMove({ gameState, cellData });
    console.log("games after move", games[0].gameState);
    const currentPlayer = game.getCurrentPlayer();
    const newGameState = game.getGameState();
    console.log("socket.on ~ newGameState:", newGameState);
    io.to(gameId).emit("returnState", newGameState);
    io.to(gameId).emit("currentPlayer", currentPlayer);
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
