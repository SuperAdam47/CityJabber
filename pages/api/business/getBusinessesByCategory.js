import ConnectDB from "../../../DB/connectDB";
import Buseinss from "../../../models/td_business_total";
const { parse } = require('url');

export default async (req, res) => {
  await ConnectDB();

  const parsedUrl = parse(req.url, true);
  const queryParams = parsedUrl.query;
  const category = queryParams.category


  try {
    if (category) {
      const businesses = await Buseinss.find({ SIC2Category: category }).limit(20);
      if (!businesses) {
        return res.status(404).json({ error: "Business not found" });
      }
      return res
        .status(200)
        .json({
          success: true, message: "Successfully!", businesses,
        });
    } else {
      const businesses = await Buseinss.find().limit(20);
      if (!businesses) {
        return res.status(404).json({ error: "Business not found" });
      }
      return res
        .status(200)
        .json({
          success: true, message: "Successfully!", businesses,
        });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
