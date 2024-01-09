import ConnectDB from "../../../../DB/connectDB";
import User from "../../../../models/User";

export default async (req, res) => {
  await ConnectDB();

  const { id, role, isBanned} = req.body;
  console.log(req.body);

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
     role,
     isBanned 
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(updatedUser)
    res.status(200).json({ success: true, message: "User information updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
