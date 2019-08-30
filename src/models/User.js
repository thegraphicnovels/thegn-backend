import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: String,
  password: String,
  name: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("User", UserSchema);
export default model;
