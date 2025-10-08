import ConnectDB from "../../../DB/connectDB";
import User from "../../../models/User";
const fs = require('fs');

export default async (req, res) => {
  await ConnectDB();

  // Validate the request body
  let { id, username, firstname, lastname, email, avatar, filepath, phonenumber, location, aboutMe, facebook, twitter, gender, birthday } = req.body;

  // const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '');
  // const imageBuffer = Buffer.from(base64Data, 'base64');
  // avatar && fs.writeFile('public' + filepath, imageBuffer, 'base64', function (err) {
  //   if (err) {
  //     // Handle error
  //     return res.status(500).send('Error occurred while saving the image.');
  //   }

  //   // Image saved successfully
  //   avatar = filepath;
  // });

  try {
    // Update the user's information in the database
    let updatedUser = {}
    avatar ? updatedUser = await User.findByIdAndUpdate(id, {
      username,
      email,
      firstname,
      lastname,
      phonenumber,
      location,
      aboutMe,
      facebook,
      twitter,
      birthday,
      gender,
      avatar,
      // avatar: filepath,
    }, { new: true }) :
      updatedUser = await User.findByIdAndUpdate(id, {
        username,
        email,
        firstname,
        lastname,
        phonenumber,
        location,
        aboutMe,
        facebook,
        twitter,
        birthday,
        gender,
      }, { new: true })

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true, user: updatedUser, message: "User information updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
