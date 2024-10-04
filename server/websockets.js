import { Server } from "socket.io";
import GameService from "./services/GameService.js";
import Game from "./game_logic/Game.js";

const games = new Array();

const initializeWebsockets = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT"],
    },
  });

  io.on("connection", (socket) => {
    // Create Game
    socket.on("createGame", async (grains) => {
      const dbGame = await GameService.create();
      const gameId = dbGame._id.toString();
      const game = new Game(gameId, grains);

      games.push(game);

      socket.emit("createdGame", gameId);
    });

    socket.on("joinGame", (gameId, isFirstMove) => {
      const game = games.find((game) => game.id === gameId);

      const players = io.sockets.adapter.rooms.get(gameId);
      console.log("players", players);
      if (!players) {
        socket.join(gameId);
        console.log(`socket ${socket.id} joined game ${gameId}`);
        game.addPlayer(socket.id);
        if (isFirstMove) game.switchPlayer(socket.id);
        io.to(gameId).emit("newPlayer", { playerId: socket.id });
      } else {
        switch (players.size) {
          case 1:
            socket.join(gameId);
            try {
              game.addPlayer(socket.id);

              io.to(gameId).emit("newPlayer", {
                playerId: socket.id,
              });
              io.to(gameId).emit("startGame", gameId);
              io.to(gameId).emit("currentPlayer", {
                playerId: game.getCurrentPlayer(),
              });
              break;
            } catch (error) {
              console.error(error);
              io.to(socket.id).emit("error", error);
            }

          case 2:
            console.error("More than 2 players in the room");
          // throw new Error("More than 2 players in the room");
        }
      }
    });

    socket.on("move", async ({ gameState, cellData }) => {
      let game = games.find((game) => game.players.has(socket.id));

      if (!game) {
        throw new Error("Game is not exist or been deleted");
      } else {
        const gameId = game.id;
        await game.handleMove({ gameState, cellData });

        const currentPlayer = game.getCurrentPlayer();
        const newGameState = game.getGameState();
        if (await game.isGameOver()) {
          console.log("game over");
          io.to(gameId).emit("returnState", newGameState);
          io.to(gameId).emit("endGame");
          // delete game from array
          games.splice(games.indexOf(game), 1);
          return;
        }
        io.to(gameId).emit("returnState", newGameState);
        io.to(gameId).emit("currentPlayer", currentPlayer);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

export default initializeWebsockets;
