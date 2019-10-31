import Tag from "../../../models/Tag";

export default {
  Query: {
    seeTags: async (_, __, { request, isAuthenticated }) => {
      // isAuthenticated(request);
      return Tag.find().populate("user");
    }
  }
};
