import Portpolio from "../../../models/Portpolio";
import File from "../../../models/File";
import Tag from "../../../models/Tag";

export default {
  Mutation: {
    uploadPortpolio: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title, description, fileUrl, tags } = args;

      let portpolio = new Portpolio({
        title,
        description,
        user: user._id,
        tags
      });

      fileUrl.forEach(async url => {
        let file = new File({
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
