import File from "../../../models/File";

export default {
  Mutation: {
    uploadPostFile: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { postId, url } = args;
      const file = await File.create({
        post: postId,
        url,
        user: user._id
      });

      return file;
    }
  }
};
