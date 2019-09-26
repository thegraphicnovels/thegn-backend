import Tag from "../../../models/Tag";

export default {
  Mutation: {
    deleteTag: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      await Tag.findByIdAndDelete({ _id: id });
      return true;
    }
  }
};
