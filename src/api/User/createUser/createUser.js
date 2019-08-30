import User from "../../../models/User";
import { hashPassword } from "../../../utils";

export default {
  Mutation: {
    createUser: async (_, args) => {
      const { id, name, password } = args;
      const exists = await User.exists({
        OR: [
          {
            id
          },
          {
            name
          }
        ]
      });

      if (exists) {
        throw Error("This id / name is already taken");
      } else {
        const hashedPassword = await hashPassword(password);
        await User.create({ id, name, password: hashedPassword });
        return true;
      }
    }
  }
};
