import Post from "../../../models/Post";

export default {
  Query: {
    seePosts: async (_, __) => {
      return await Post.find({})
        .populate("files")
        .populate("user");
    }
  }
};
