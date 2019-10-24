import Banner from "../../../models/Banner";

export default {
  Query: {
    seeBanners: async (_, __) => {
      return Banner.find()
        .populate("user")
        .populate("portpolio")
        .populate("files");
    }
  }
};
