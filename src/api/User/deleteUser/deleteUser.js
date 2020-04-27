import User from "../../../models/User";

export default {
  Mutation: {
    deleteUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;

      const user = await User.findById({ _id: id });

      if (user.id === "admin") {
        throw Error("This ID cannot be deleted.");
      }

      await User.findByIdAndDelete({ _id: id });
      return true;
    },
  },
};
