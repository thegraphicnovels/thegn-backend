import Portpolio from "../../../models/Portpolio";

export default {
  Mutation: {
    modifyMainPortpolio: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { fileUrl, portpolioId: _id } = args;

      const portpolio = await Portpolio.findById({ _id });
      portpolio.mainImg = [];

      for (let i = 0; i < fileUrl.length; i++) {
        portpolio.mainImg.push(nfile._id);
      }

      portpolio.save();

      return portpolio;
    }
  }
};
