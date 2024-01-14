import ConnectDB from "../../../../DB/connectDB";
import Business from "../../../../models/td_business_total";
const { parse } = require('url');

export default async (req, res) => {
  await ConnectDB();

  const parsedUrl = parse(req.url, true);
  const queryParams = parsedUrl.query;

  const page = queryParams.page || 1; // Current page (default to 1 if not provided)
  const limit = 10; // Number of documents per page (default to 10 if not provided)

  try {
    const totalBusinesses = await Business.countDocuments();
    const totalPages = Math.ceil(totalBusinesses / limit);

    const businesses = await Business.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res
      .status(200)
      .json({
        success: true, message: "Successfully!", businesses,
        currentPage: page,
        totalPages,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
