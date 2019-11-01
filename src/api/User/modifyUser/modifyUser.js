import User from "../../../models/User";
import { hashPassword } from "../../../utils";

export default {
  Mutation: {
    modifyUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id, password, name } = args;

      const oUser = await User.findOne({ id });

      if (password) {
        const hashedPassword = await hashPassword(password);
        oUser.password = hashedPassword;
      } else {
        oUser.password = user.password;
      }

      if (name) {
        oUser.name = name;
      } else {
        oUser.name = user.name;
      }

      oUser.save();

      return oUser;
    }
  }
};
