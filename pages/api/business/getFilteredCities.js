import ConnectDB from "../../../DB/connectDB";
import City from "../../../models/city";
const { parse } = require('url');

export default async (req, res) => {
  await ConnectDB();

  const parsedUrl = parse(req.url, true);
  const queryParams = parsedUrl.query;

  const keyword = queryParams.keyword || 1; // Current page (default to 1 if not provided)
  const limit = 20; // Number of documents per page (default to 10 if not provided)

  try {

    const cities = await City.find({ City: { $regex: keyword, $options: 'i' } }).limit(limit);
    return res
      .status(200)
      .json({
        success: true, message: "Successfully!", cities,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
