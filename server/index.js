import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import userRouter from "./routers/UserRouter.js";
import gameRouter from "./routers/GameRouter.js";
import authRouter from "./routers/AuthRouter.js";
import initializeWebsockets from "./websockets.js";

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
app.use("/auth", authRouter);

initializeWebsockets(server);

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
