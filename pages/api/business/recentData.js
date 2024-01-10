import ConnectDB from "../../../DB/connectDB";
import Business from "../../../models/td_business_total";

export default async (req, res) => {
  await ConnectDB();

  try {
    const getAllData = await Business.find().populate("reviews.user").limit(20);
    if (!getAllData)
      return res
        .status(401)
        .json({ success: false, message: "Data not Found" });

    return res
      .status(200)
      .json({ success: true, message: "Successfull", getAllData });
  } catch (error) {
    console.log("Error in register (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong Please Retry Later !",
    });
  }
};
