import Banner from "../../../models/Banner";

export default {
  Query: {
    seeBanners: async (_, args) => {
      const { keyword } = args;
      return Banner.find()
        .populate("user")
        .populate("portpolio")
        .populate("files");
    }
  }
};
