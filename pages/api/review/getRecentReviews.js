import ConnectDB from "../../../DB/connectDB";
import Review from "../../../models/review";

export default async (req, res) => {
  await ConnectDB();

  const limit = 10;

  try {
    const reviews = await Review.find().sort({ CreatedDate: -1 }).limit(limit);
    return res
      .status(200)
      .json({
        success: true, message: "Successfully!", reviews
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
