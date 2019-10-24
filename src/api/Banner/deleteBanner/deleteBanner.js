import Banner from "../../../models/Banner";

export default {
  Mutation: {
    deleteBanner: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id: _id } = args;
      await Banner.findByIdAndDelete({ _id });
      return true;
    }
  }
};
