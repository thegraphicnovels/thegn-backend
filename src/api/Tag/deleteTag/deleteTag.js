import Tag from "../../../models/Tag";
import Portpolio from "../../../models/Portpolio";

export default {
  Mutation: {
    deleteTag: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      await Tag.findByIdAndDelete({ _id: id }, () => {
        Portpolio.updateMany({ tags: id }, { $pull: { tags: id } });
      });
      return true;
    }
  }
};
