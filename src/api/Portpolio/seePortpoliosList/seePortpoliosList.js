import Portpolio from "../../../models/Portpolio";
import Tag from "../../../models/Tag";

export default {
  Query: {
    seePortpoliosList: async (_, args) => {
      const { keyword } = args;

      let query = {};
      if (keyword) {
        const tagData = await Tag.find({
          value: { $regex: keyword, $options: "i" }
        });

        const tagIds = [];

        if (tagData) {
          for (let i = 0; i < tagData.length; i++) {
            tagIds.push(tagData[i]._id);
          }
        }

        query = {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            // { description: { $regex: keyword, $options: "i" } },
            { tags: { $in: tagIds } }
          ]
        };
      }

      return Portpolio.find(query)
        .populate("files")
        .populate("user")
        .populate("tags");
    }
  }
};
