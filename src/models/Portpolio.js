import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const PortpolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File"
    }
  ],
  views: {
    type: Number,
    default: 0
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag"
    }
  ],
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

PortpolioSchema.plugin(mongoosePaginate);

const model = mongoose.model("Portpolio", PortpolioSchema);
export default model;
