import ConnectDB from "../../../DB/connectDB";
import Review from "../../../models/review";
const { parse } = require('url');

export default async (req, res) => {
  await ConnectDB();

  const parsedUrl = parse(req.url, true);
  const queryParams = parsedUrl.query;

  const page = queryParams.page || 1; // Current page (default to 1 if not provided)
  const limit = 6; // Number of documents per page (default to 10 if not provided)
  const businessId = queryParams.businessId

  try {
    const totalReviews = await Review.countDocuments();
    const totalPages = Math.ceil(totalReviews / limit);

    const reviews = await Review.find({ BusinessId: businessId }).sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return res
      .status(200)
      .json({
        success: true, message: "Successfully!", reviews,
        currentPage: page,
        totalPages,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
