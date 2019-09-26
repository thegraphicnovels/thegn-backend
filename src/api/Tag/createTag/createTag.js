import Tag from "../../../models/Tag";

export default {
  Mutation: {
    createTag: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { tag } = args;

      const exists = await Tag.exists({
        value: tag
      });

      if (exists) {
        throw Error("This Tag is already taken");
      } else {
        await Tag.create({ value: tag, user: user._id });
        return true;
      }
    }
  }
};
