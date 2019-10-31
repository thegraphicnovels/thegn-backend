import Portpolio from "../../../models/Portpolio";
import File from "../../../models/File";
export default {
  Mutation: {
    uploadPortpolio: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title, description, thumbFileUrl, fileUrl, tags } = args;

      const portpolio = new Portpolio({
        title,
        description,
        thumbImg: thumbFileUrl,
        user: user._id,
        tags
      });

      fileUrl.forEach(async url => {
        const file = new File({
          portpolio: portpolio._id,
          url,
          user: user._id
        });

        portpolio.files.push(file._id);
        return await file.save();
      });

      portpolio.save();

      return portpolio;
    }
  }
};
