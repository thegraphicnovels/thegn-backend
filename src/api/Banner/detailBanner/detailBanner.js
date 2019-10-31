import Banner from "../../../models/Banner";

export default {
  Query: {
    detailBanner: async (_, args) => {
      const { id: _id } = args;
      const banner = await Banner.findById({ _id })
        .populate("user")
        .populate("portpolio")
        .populate("files");
      return banner;
    }
  }
};
