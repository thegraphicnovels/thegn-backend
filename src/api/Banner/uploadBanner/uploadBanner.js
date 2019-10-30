import Banner from "../../../models/Banner";
import File from "../../../models/File";

export default {
  Mutation: {
    uploadBanner: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title, fileUrl, portpolioId } = args;

      const banner = new Banner({
        title,
        user: user._id,
        portpolio: portpolioId
      });

      fileUrl.forEach(async url => {
        const file = new File({
          banner: banner._id,
          url,
          user: user._id
        });

        banner.files.push(file._id);
        return await file.save();
      });

      banner.save();

      return banner;
    }
  }
};
