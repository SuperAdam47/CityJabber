import ConnectDB from "../../../DB/connectDB";
import Business from "../../../models/td_business_total";

export default async (req, res) => {
  await ConnectDB();

  const { city, category, state } = req.body;
  try {
    const getAllData = await Business.find({
      City: { $regex: city, $options: "i" },
      // StateCode: "AK",
      $or: [
        { SIC2Category: { $regex: category, $options: "i" } },
        { SIC4Category: { $regex: category, $options: "i" } },
        { SIC8Category: { $regex: category, $options: "i" } },
      ],
    }).limit(10000);
    if (!getAllData)
      return res
        .status(401)
        .json({ success: false, message: "Data not found!" });
    return res
      .status(200)
      .json({ success: true, message: "Successfully!", getAllData });
  } catch (error) {
    console.log("Error in register (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please retry later !",
    });
  }
};
