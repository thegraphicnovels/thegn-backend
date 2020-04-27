import User from "../../../models/User";
import { hashPassword, comparePassword } from "../../../utils";

export default {
  Mutation: {
    modifyUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, oPassword, cPassword, name } = args;

      const oUser = await User.findOne({ _id: id });

      if (cPassword && !oPassword) {
        throw Error("Original Password Insert");
      }

      if (cPassword && oPassword) {
        const checkPassword = await comparePassword(oPassword, oUser.password);

        console.log(checkPassword);

        if (!checkPassword) {
          throw Error("You Passwords do not match");
        }

        const hashedPassword = await hashPassword(cPassword);

        oUser.password = hashedPassword;
      } else {
        oUser.password = oUser.password;
      }

      if (name) {
        oUser.name = name;
      } else {
        oUser.name = oUser.name;
      }

      oUser.save();

      return true;
    },
  },
};
