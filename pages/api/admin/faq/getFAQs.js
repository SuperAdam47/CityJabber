import ConnectDB from "../../../../DB/connectDB";
import FAQ from "../../../../models/faq";
const { parse } = require('url');

export default async (req, res) => {
  await ConnectDB();

  const parsedUrl = parse(req.url, true);
  const queryParams = parsedUrl.query;

  const page = queryParams.page || 1; // Current page (default to 1 if not provided)
  const businessId = queryParams.businessId
  const limit = 10; // Number of documents per page (default to 10 if not provided)

  console.log('businessId==>', businessId)

  try {
    const totalFAQs = await FAQ.countDocuments();
    const totalPages = Math.ceil(totalFAQs / limit);

    if (businessId) {
      const FAQs = await FAQ.find({ BusinessId: businessId }).sort({ _id: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      if (FAQs.length === 0) {
        return res
          .status(200)
          .json({
            success: false, message: "there is no any FAQ"
          });
      }
      return res
        .status(200)
        .json({
          success: true, message: "Successfully!", FAQs,
          currentPage: page,
          totalPages,
        });
    } else {
      const FAQs = await FAQ.find().sort({ _id: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      return res
        .status(200)
        .json({
          success: true, message: "Successfully!", FAQs,
          currentPage: page,
          totalPages,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
