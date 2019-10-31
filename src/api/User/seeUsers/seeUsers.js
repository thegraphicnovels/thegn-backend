import User from "../../../models/User";

export default {
  Query: {
    seeUsers: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      return User.find();
    }
  }
};
