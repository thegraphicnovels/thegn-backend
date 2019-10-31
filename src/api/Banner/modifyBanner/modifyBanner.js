import Banner from "../../../models/Banner";
import File from "../../../models/File";

export default {
  Mutation: {
    modifyBanner: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: _id, title, fileUrl, portpolioId } = args;

      const banner = await Banner.findById({ _id });
      banner.title = title;
      // banner.portpolio = portpolioId;
      banner.user = user._id;
      banner.files = [];
      banner.updateAt = new Date();

      if (!portpolioId) {
        banner.portpolio = null;
      }

      for (let i = 0; i < fileUrl.length; i++) {
        const file = await File.findOne({ banner: _id, url: fileUrl[i] });
        if (file) {
          banner.files.push(file._id);
        } else {
          const nfile = new File({
            banner: _id,
            url: fileUrl[i],
            user: user._id
          });

          banner.files.push(nfile._id);
          await nfile.save();
        }
      }

      banner.save();

      return banner._id;
    }
  }
};
