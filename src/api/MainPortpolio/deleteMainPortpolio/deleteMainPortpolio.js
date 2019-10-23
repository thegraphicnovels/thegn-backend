import Portpolio from "../../../models/Portpolio";

export default {
  Mutation: {
    deleteMainPortpolio: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { portpolioId: _id } = args;
      return Portpolio.findByIdAndUpdate({ _id }, { mainImg: [] });
    }
  }
};
