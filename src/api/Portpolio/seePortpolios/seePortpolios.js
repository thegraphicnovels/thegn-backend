import Portpolio from "../../../models/Portpolio";
import Tag from "../../../models/Tag";

export default {
  Query: {
    seePortpolios: async (_, args) => {
      const { page, limit, tags, keyword } = args;

      let query = {};

      if (keyword) {
        const tagData = await Tag.find({
          value: { $regex: keyword, $options: "i" },
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
            { description: { $regex: keyword, $options: "i" } },
            { tags: { $in: tagIds } },
          ],
        };
      }

      if (tags) {
        if (tags.length > 0) {
          query.tags = { _id: tags };
        }
      }

      let option = {
        populate: ["files", "user", "tags"],
        sort: { updateAt: "desc" },
      };
      if (page && limit) {
        option.page = page;
        option.limit = limit;
      }

      const portpolio = await Portpolio.paginate(query, option).then(
        ({ docs: portpolios, totalPages, totalDocs: totalPortpolios }) => {
          return { portpolios, totalPages, totalPortpolios };
        }
      );

      return portpolio;
    },
  },
};
