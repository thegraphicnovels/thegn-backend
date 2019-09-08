import Post from "../../../models/Post";

export default {
  Mutation: {
    uploadPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title, description } = args;
      const post = await Post.create({
        title,
        description,
        user: user._id
      });

      return post;
    }
  }
};
