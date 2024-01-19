import ConnectDB from "../../../DB/connectDB";
import SIC from "../../../models/SIC";
const { parse } = require('url');

export default async (req, res) => {
  await ConnectDB();

  const parsedUrl = parse(req.url, true);
  const queryParams = parsedUrl.query;

  const keyword = queryParams.keyword || 1; // Current page (default to 1 if not provided)
  const limit = 20; // Number of documents per page (default to 10 if not provided)

  try {

    const categories = await SIC.find({ SIC2Category: { $regex: keyword, $options: 'i' } }).limit(limit);
    return res
      .status(200)
      .json({
        success: true, message: "Successfully!", categories,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
