import Portpolio from "../../../models/Portpolio";
import File from "../../../models/File";

export default {
  Mutation: {
    modifyPortpolio: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: _id, title, description, thumbFileUrl, fileUrl, tags } = args;

      const portpolio = await Portpolio.findById({ _id });
      portpolio.title = title;
      portpolio.description = description;
      portpolio.thumbImg = thumbFileUrl;
      portpolio.tags = tags;
      portpolio.user = user._id;
      portpolio.files = [];
      portpolio.updateAt = new Date();

      for (let i = 0; i < fileUrl.length; i++) {
        const file = await File.findOne({ portpolio: _id, url: fileUrl[i] });
        if (file) {
          portpolio.files.push(file._id);
        } else {
          const nfile = new File({
            portpolio: _id,
            url: fileUrl[i],
            user: user._id
          });

          portpolio.files.push(nfile._id);
          await nfile.save();
        }
      }

      portpolio.save();

      return portpolio._id;
    }
  }
};
