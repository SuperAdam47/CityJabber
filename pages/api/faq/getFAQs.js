import ConnectDB from "../../../DB/connectDB";
import FAQ from "../../../models/faq";
const { parse } = require('url');

export default async (req, res) => {
  await ConnectDB();

  const parsedUrl = parse(req.url, true);
  const queryParams = parsedUrl.query;

  const page = queryParams.page || 1; // Current page (default to 1 if not provided)
  const limit = 10; // Number of documents per page (default to 10 if not provided)

  try {
    const totalFAQs = await FAQ.countDocuments();
    const totalPages = Math.ceil(totalFAQs / limit);

    const FAQs = await FAQ.find({ Status: 1 }).sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return res
      .status(200)
      .json({
        success: true, message: "Successfully!", FAQs,
        currentPage: page,
        totalPages,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
