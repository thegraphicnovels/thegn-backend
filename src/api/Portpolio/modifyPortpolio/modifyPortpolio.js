import Portpolio from "../../../models/Portpolio";

export default {
  Mutation: {
    modifyPortpolio: async (_, args, { request, isAuthenticated }) => {
      //   isAuthenticated(request);
      const { user } = request;
      const { id: _id, title, description, tags } = args;
      const portpolio = await Portpolio.findByIdAndUpdate(
        _id,
        {
          title,
          description,
          tags,
          user: user._id,
          updateAt: new Date()
        },
        { new: true }
      );

      return portpolio._id;
    }
  }
};
