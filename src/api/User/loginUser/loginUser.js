import User from "../../../models/User";
import { generateToken, comparePassword } from "../../../utils";

export default {
  Mutation: {
    loginUser: async (_, args) => {
      const { id, password } = args;
      const user = await User.findOne({ id });
      if (!user) {
        throw Error("Please check your ID / Password");
      }
      const checkPassword = await comparePassword(password, user.password);
      if (!checkPassword) {
        throw Error("Please check your ID / Password");
      } else {
        return generateToken(user._id);
      }
    }
  }
};
