import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import userRouter from "./routers/UserRouter.js";
import gameRouter from "./routers/GameRouter.js";
import GameService from "./services/GameService.js";
import Game from "./game_logic/Game.js";

dotenv.config();

const DB_URL = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.vuaacml.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
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
  // Create Game
  socket.on("createGame", async () => {
    // const newUuid = uuid();
    // const mUUID4 = MUUID.v4();
    // console.log("socket.on ~ gameId:", mUUID4);

    const dbGame = await GameService.create();
    const gameId = dbGame._id.toString();
    const game = new Game(gameId);
    games.push(game);

    socket.emit("createdGame", gameId);
  });

  socket.on("joinGame", (gameId) => {
    const game = games.find((game) => game.id === gameId);

    const players = io.sockets.adapter.rooms.get(gameId);
    if (!players) {
      socket.join(gameId);
      console.log(`socket ${socket.id} joined game ${gameId}`);
      game.addPlayer(socket.id);
      io.to(gameId).emit("newPlayer", { playerId: socket.id });
    } else {
      switch (players.size) {
        case 1:
          // adding invited player to the room and Game instance
          socket.join(gameId);
          game.addPlayer(socket.id);
          game.switchPlayer(game.getPlayersArray()[0]);

          io.to(gameId).emit("newPlayer", { playerId: socket.id });
          io.to(gameId).emit("startGame", gameId);
          // Game creator have first turn
          io.to(gameId).emit("currentPlayer", {
            playerId: game.getCurrentPlayer(),
          });
          break;
        case 2:
          throw new Error("More than 2 players in the room");
      }
    }
  });

  socket.on("move", async ({ gameState, cellData }) => {
    // console.log("typeof socket id on Move: ", typeof socket.id);
    // console.log("Games on Move: ", games);
    let game = games.find((game) => game.players.has(socket.id));

    if (!game) {
      throw new Error("Game is not exist or been deleted");
    } else {
      const gameId = game.id;
      await game.handleMove({ gameState, cellData });

      const currentPlayer = game.getCurrentPlayer();
      const newGameState = game.getGameState();
      console.log("socket.on ~ newGameState:", newGameState);

      io.to(gameId).emit("returnState", newGameState);
      io.to(gameId).emit("currentPlayer", currentPlayer);
    }
  });

  socket.on("disconnect", () => {
    // ADD DELETE GAME FROM ARR HANDLING
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
