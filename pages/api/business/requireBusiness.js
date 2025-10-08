import ConnectDB from "../../../DB/connectDB";
import RequiredBusiness from "../../../models/required_business";

export default async (req, res) => {

  await ConnectDB();

  let { BusinessName, Industry, City, StateCode, Address, LocationType, ZIPCode, BImage, SIC, SIC2, SIC4, SIC8, NAICS, UserId, ContactName,
    Phone, Web, Coordinate, MarketVariable, AnnualRevenue, YearFounded } = req.body;

  console.log('statecode==>', StateCode)

  try {
    const requiredBusiness = await RequiredBusiness.create({
      BusinessName,
      Industry,
      City,
      StateCode,
      Address,
      LocationType,
      ZIPCode,
      BImage,
      SIC,
      SIC2Category: SIC2,
      SIC4Category: SIC4,
      SIC8Category: SIC8,
      NAICS,
      UserId,
      ContactName,
      Phone,
      Web,
      Coordinates: Coordinate,
      MarketVariable,
      AnnualRevenue,
      YearFounded,
      Status: 1
    });
    return res
      .status(201)
      .json({ success: true, message: "Business Required successfully" });
  } catch (error) {
    console.log("Error in requiring business (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong Please Retry Later !",
    });
  }
};
