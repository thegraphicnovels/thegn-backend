import Portpolio from "../../../models/Portpolio";

export default {
  Query: {
    seeMainPortpolios: async (_, __) => {
      return Portpolio.find({ mainImg: { $gt: 0 } }).populate("tags");
    }
  }
};
