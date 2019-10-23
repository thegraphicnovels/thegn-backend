import Portpolio from "../../../models/Portpolio";

export default {
  Mutation: {
    uploadMainPortpolio: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { fileUrl, portpolioId: _id } = args;

      return Portpolio.findByIdAndUpdate({ _id }, { mainImg: fileUrl });
    }
  }
};
