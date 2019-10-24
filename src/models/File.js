import mongoose from "mongoose";

const FilesSchema = new mongoose.Schema({
  url: String,
  portpolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portpolio"
  },
  banner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Banner"
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
