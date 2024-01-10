import ConnectDB from "../../../DB/connectDB";
import Business from "../../../models/td_business_total";

export default async (req, res) => {
  await ConnectDB();

  const { query } = req.query;
  try {
    const suggestions = await Business.find({
      City: { $regex: new RegExp(`${query}`, "g") },
    })
      .limit(10)
      .select("City");
    if (!suggestions)
      return res
        .status(401)
        .json({ success: false, message: "Data not Found" });
    return res
      .status(200)
      .json({ success: true, message: "Successfull", suggestions });
  } catch (error) {
    console.log("Error in register (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong Please Retry Later !",
    });
  }
};
