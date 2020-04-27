import User from "../../../models/User";

export default {
  Query: {
    detailUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id: _id } = args;
      const user = await User.findById({ _id });
      return user;
    },
  },
};
