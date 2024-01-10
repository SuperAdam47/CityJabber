import ConnectDB from "../../../../../../DB/connectDB";
import User from "../../../../../../models/User";
const { parse } = require('url');

export default async (req, res) => {
  await ConnectDB();
  const { id } = req.query;

  console.log("=================", id)
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};
