import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  value: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Tag", TagSchema);
export default model;
