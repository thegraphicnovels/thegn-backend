import Tag from "../../../models/Tag";

export default {
  Query: {
    seeTags: async (_, __) => {
      return Tag.find().populate("user");
    }
  }
};
