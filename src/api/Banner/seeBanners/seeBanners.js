import Banner from "../../../models/Banner";

export default {
  Query: {
    seeBanners: async (_, args) => {
      const { keyword } = args;
      // let match = {};
      // if (keyword) {
      //   match = {
      //     $or: [
      //       { title: { $regex: keyword, $options: "i" } },
      //       { description: { $regex: keyword, $options: "i" } }
      //     ]
      //   };
      // }

      let query = {};
      let match = {};
      if (keyword) {
        query.title = { $regex: keyword, $options: "i" };
        match.title = { $regex: keyword, $options: "i" };
      }

      return Banner.find()
        .populate("user")
        .populate({
          path: "portpolio",
          match,
          populate: "tags"
        })
        .populate("files");
    }
  }
};
