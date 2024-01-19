import ConnectDB from "../../../../DB/connectDB";
import RequiredBusiness from "../../../../models/required_business";
import Business from "../../../../models/td_business_total";
import User from "../../../../models/User"

export default async (req, res) => {
  await ConnectDB();

  const { _id, BusinessName, UserId, ContactName, SIC2Category, SIC4Category, SIC8Category, City, StateCode, ZIPCode, Address, Phone, Web, YearFounded, LocationType, MarketVariable, AnnualRevenue, SIC,
    NAICS, Industry, BImage, Coordinate, Status } = req.body;

  try {
    const updatedBusiness = await RequiredBusiness.findByIdAndUpdate(_id, {
      Status,
    });

    if (!updatedBusiness) {
      return res.status(404).json({ error: "Requried Business not found" });
    }

    if (Status === 2) {
      const business = await Business.create({
        BusinessName,
        UserId,
        Industry,
        City,
        StateCode,
        Address,
        LocationType,
        ZIPCode,
        BImage,
        SIC,
        SIC2Category,
        SIC4Category,
        SIC8Category,
        NAICS,
        ContactName,
        Phone,
        Web,
        Coordinates: Coordinate,
        MarketVariable,
        AnnualRevenue,
        YearFounded,
      });

      if (business) {
        const updatedUser = await User.findByIdAndUpdate(UserId, {
          role: 'business owner'
        }, { new: true })

        if (!updatedUser) {
          return res.status(404).json({ error: "User not found" });
        }
        return res
          .status(200)
          .json({ success: true, message: "Required Business Permited successfully" });
      }

    } else
      return res.status(200).json({ success: true, message: 'Required Business Refused' });
  } catch (error) {
    console.error("Error updating Business:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
