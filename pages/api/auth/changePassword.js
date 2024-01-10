import ConnectDB from "../../../DB/connectDB";
import User from "../../../models/User";
import { compare } from "bcryptjs";
import { hash } from "bcryptjs";

export default async (req, res) => {
  await ConnectDB();

  const { id, currentPass, newPass } = req.body;

  try {
    const checkUser = await User.findOne({ _id: id });

    if (!checkUser)
      return res
        .status(401)
        .json({ success: false, message: "Account not Found" });

    const isMatch = await compare(currentPass, checkUser.password);

    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Confirm Current Password" });

    const hashedPassword = await hash(newPass, 12);

    const updatedUser = await User.findByIdAndUpdate(id, {
      password: hashedPassword
    }, { new: true })

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Change Password Successfull" });
  } catch (error) {
    console.log("Error in change password (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong Please Retry Later !",
    });
  }
};
