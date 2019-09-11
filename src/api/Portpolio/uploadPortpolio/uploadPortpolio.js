import Portpolio from "../../../models/Portpolio";
import File from "../../../models/File";

export default {
  Mutation: {
    uploadPortpolio: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title, description, fileUrl } = args;

      let portpolio = new Portpolio({
        title,
        description,
        user: user._id
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

// var bob = new Author({ name: "Bob Smith" });

// bob.save(function(err) {
//   if (err) return handleError(err);

//   //Bob now exists, so lets create a story
//   var story = new Story({
//     title: "Bob goes sledding",
//     author: bob._id // assign the _id from the our author Bob. This ID is created by default!
//   });

//   story.save(function(err) {
//     if (err) return handleError(err);
//     // Bob now has his story
//   });
// });
