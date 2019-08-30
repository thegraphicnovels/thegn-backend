import Post from "../../../models/Post";
import File from "../../../models/File";
// import { ObjectId } from "mongodb";

export default {
  Mutation: {
    uploadPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title, description, files } = args;
      const post = await Post.create({
        title,
        description,
        user: user._id
      });
      if (files) {
        files.forEach(async file => {
          await File.create({
            url: file,
            post: post._id
          });
        });
      }

      return post;
    }
  }
};
