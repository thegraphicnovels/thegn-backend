import Portpolio from "../../../models/Portpolio";

export default {
  Mutation: {
    deletePortpolio: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      await Portpolio.findByIdAndDelete({ _id: id });
      return true;
    }
  }
};
