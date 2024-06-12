// import mongoose from "mongoose";

// const gameSchema = mongoose.Schema({
//   player1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   player2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   status: {
//     type: String,
//     enum: ["waiting", "in-progress", "finished"],
//     default: "waiting",
//   },
//   gameState: {
//     x1: { type: Number, default: 4 },
//     x2: { type: Number, default: 4 },
//     x3: { type: Number, default: 4 },
//     x4: { type: Number, default: 4 },
//     x5: { type: Number, default: 4 },
//     x6: { type: Number, default: 4 },
//     x7: { type: Number, default: 0 },
//     y1: { type: Number, default: 4 },
//     y2: { type: Number, default: 4 },
//     y3: { type: Number, default: 4 },
//     y4: { type: Number, default: 4 },
//     y5: { type: Number, default: 4 },
//     y6: { type: Number, default: 4 },
//     y7: { type: Number, default: 0 },
//   },
//   winner: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date },
//   finishedAt: { type: Date },
// });

// export default mongoose.model("Game", gameSchema);

import mongoose from "mongoose";

const gameStateDefault = [
  { key: "x1", value: 4 },
  { key: "x2", value: 4 },
  { key: "x3", value: 4 },
  { key: "x4", value: 4 },
  { key: "x5", value: 4 },
  { key: "x6", value: 4 },
  { key: "x7", value: 0 },
  { key: "y1", value: 4 },
  { key: "y2", value: 4 },
  { key: "y3", value: 4 },
  { key: "y4", value: 4 },
  { key: "y5", value: 4 },
  { key: "y6", value: 4 },
  { key: "y7", value: 0 },
];

const gameStateSchema = mongoose.Schema(
  {
    key: {
      type: String,
      enum: [
        "x1",
        "x2",
        "x3",
        "x4",
        "x5",
        "x6",
        "x7",
        "y1",
        "y2",
        "y3",
        "y4",
        "y5",
        "y6",
        "y7",
      ],
      required: true,
    },
    value: { type: Number, default: 4 },
  },
  { _id: false }
);

const gameSchema = mongoose.Schema({
  player1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  player2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["waiting", "in-progress", "finished"],
    default: "waiting",
  },
  gameState: { type: [gameStateSchema], default: gameStateDefault },
  winner: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  finishedAt: { type: Date },
});

export default mongoose.model("Game", gameSchema);
