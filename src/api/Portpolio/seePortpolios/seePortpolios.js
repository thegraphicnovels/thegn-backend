import Portpolio from "../../../models/Portpolio";

export default {
  Query: {
    seePortpolios: async (_, args) => {
      const { page, limit, tags } = args;

      let query = {};
      if (tags) {
        query.tags = { _id: tags };
      }

      let option = {
        populate: ["files", "user", "tags"],
        sort: { updateAt: "desc" }
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
    }
  }
};
