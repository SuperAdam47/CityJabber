import ConnectDB from "../../../DB/connectDB";
import City from "../../../models/city";

export default async (req, res) => {
  await ConnectDB();

  try {
    const cities = await City.find({}, { _id: 0, City: 1 });
    if (!cities)
      return res
        .status(401)
        .json({ success: false, message: "Data not Found" });

    return res
      .status(200)
      .json({ success: true, message: "Successfull", cities });
  } catch (error) {
    console.log("Error in getting cities (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong Please Retry Later !",
    });
  }
};
