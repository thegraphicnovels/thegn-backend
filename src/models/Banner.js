import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File"
    }
  ],
  portpolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portpolio",
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
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("MainFile", BannerSchema);
export default model;
