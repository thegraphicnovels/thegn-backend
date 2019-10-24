import Banner from "../../../models/Banner";

export default {
  Query: {
    detailBanner: async (_, args) => {
      const { id: _id, portpolioId } = args;
      const banner = await Banner.findOne({
        $or: [{ _id }, { portpolio: portpolioId }]
      })
        .populate("user")
        .populate("portpolio")
        .populate("files");
      return banner;
    }
  }
};
