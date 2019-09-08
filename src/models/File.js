import mongoose from "mongoose";

const FilesSchema = new mongoose.Schema({
  url: String,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("File", FilesSchema);
export default model;
