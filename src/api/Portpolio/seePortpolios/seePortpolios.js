import Portpolio from "../../../models/Portpolio";

export default {
  Query: {
    seePortpolios: async (_, __) => {
      return Portpolio.find()
        .populate("files")
        .populate("user");
    }
  }
};
