import ConnectDB from "../../../DB/connectDB";
import User from "../../../models/User";
import Joi from "joi";

const schema = Joi.object({
  avatar: Joi.string().required(),
  birthday: Joi.Date().required(),
  gender: Joi.string().required(),
});
export default async (req, res) => {
  await ConnectDB();

  // Validate the request body
  const { avatar, birthday, gender } = req.body;
  const { error } = schema.validate({ avatar, birthday, gender });
  console.log(avatar, birthday, gender);
  if (error) {
    return res.status(401).json({
      success: false,
      message: error.details[0].message,
    });
  }

  // Get the user ID from the authenticated user
  const _id = req.user.id; // Modify this based on your authentication mechanism
  try {
    // Update the user's information in the database
    const updatedUser = await User.findByIdAndUpdate(_id, {
      avatar,
      birthday,
      gender,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User information updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
