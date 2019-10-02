import Portpolio from "../../../models/Portpolio";

export default {
  Query: {
    detailPortpolio: async (_, args) => {
      const { id: _id } = args;
      const portpolio = await Portpolio.findById({ _id })
        .populate("files")
        .populate("user")
        .populate("tags");
      return portpolio;
    }
  }
};
