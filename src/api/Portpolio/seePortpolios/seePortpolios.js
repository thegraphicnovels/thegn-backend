import Portpolio from "../../../models/Portpolio";

export default {
  Query: {
    seePortpolios: async (_, args) => {
      const { page, limit } = args;
      const portpolio = await Portpolio.paginate(
        {},
        { page, limit, populate: ["files", "user"], sort: { updateAt: "desc" } }
      ).then(({ docs: portpolios, totalPages, totalDocs: totalPortpolios }) => {
        return { portpolios, totalPages, totalPortpolios };
      });

      return portpolio;
    }
  }
};
