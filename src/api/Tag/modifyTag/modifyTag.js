import Tag from "../../../models/Tag";

export default {
  Mutation: {
    modifyTag: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id, value } = args;

      const exists = await Tag.exists({
        value
      });

      if (exists) {
        throw Error("This Tag is already taken");
      } else {
        await Tag.findByIdAndUpdate(
          { _id: id },
          { value, user: user._id, updateAt: new Date() },
          { new: true }
        );
        return true;
      }
    }
  }
};
