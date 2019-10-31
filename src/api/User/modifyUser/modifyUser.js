import User from "../../../models/User";

export default {
  Mutation: {
    modifyUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, name } = args;

      return User.findOneAndUpdate({ id }, { name });
    }
  }
};
