import Portpolio from "../../../models/Portpolio";

export default {
  Mutation: {
    modifyPortpolio: async (_, args, { request, isAuthenticated }) => {
      //   isAuthenticated(request);
      const { user } = request;
      const { id: _id, title, description } = args;
      const portpolio = await Portpolio.findByIdAndUpdate(
        _id,
        {
          title,
          description,
          updateAt: new Date()
        },
        { new: true }
      );

      return portpolio._id;
    }
  }
};
