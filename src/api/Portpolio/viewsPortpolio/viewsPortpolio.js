import Portpolio from "../../../models/Portpolio";

export default {
  Mutation: {
    viewsPortpolio: async (_, args) => {
      const { id: _id } = args;
      const portpolio = await Portpolio.findById({ _id });
      portpolio.views += 1;
      portpolio.save();
      return true;
    }
  }
};
