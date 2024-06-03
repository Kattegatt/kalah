import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/UserRouter.js";
import gameRouter from "./routers/GameRouter.js";

const DB_URL = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.vuaacml.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", gameRouter);

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
