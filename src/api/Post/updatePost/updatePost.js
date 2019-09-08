import Post from "../../../models/Post";
import { set } from "mongoose";

export default {
  Mutation: {
    updatePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { postId, title, description, fileId } = args;

      const post = Post.findOneAndUpdate(
        { _id: postId },
        { title, description, $push: { files: fileId } },
        { new: true }
      );

      return post;
    }
  }
};
