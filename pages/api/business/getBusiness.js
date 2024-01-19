import ConnectDB from "../../../DB/connectDB";
import Buseinss from "../../../models/td_business_total";
const { parse } = require('url');

export default async (req, res) => {
  await ConnectDB();

  const parsedUrl = parse(req.url, true);
  const queryParams = parsedUrl.query;

  const userId = queryParams.userId


  try {
    if (userId) {
      const business = await Buseinss.find({ UserId: userId });
      if (!business) {
        return res.status(404).json({ error: "Business not found" });
      }
      return res
        .status(200)
        .json({
          success: true, message: "Successfully!", business,
        });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
