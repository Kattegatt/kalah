import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
  player1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  player2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["waiting", "in-progress", "finished"],
    default: "waiting",
  },
  gameState: {
    x1: { type: Number, default: 4 },
    x2: { type: Number, default: 4 },
    x3: { type: Number, default: 4 },
    x4: { type: Number, default: 4 },
    x5: { type: Number, default: 4 },
    x6: { type: Number, default: 4 },
    x7: { type: Number, default: 0 },
    y1: { type: Number, default: 4 },
    y2: { type: Number, default: 4 },
    y3: { type: Number, default: 4 },
    y4: { type: Number, default: 4 },
    y5: { type: Number, default: 4 },
    y6: { type: Number, default: 4 },
    y7: { type: Number, default: 0 },
  },
  winner: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  finishedAt: { type: Date },
});

export default mongoose.model("Game", gameSchema);
