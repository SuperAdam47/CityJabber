import ConnectDB from "../../../../DB/connectDB";
import Business from "../../../../models/td_business_total";

export default async (req, res) => {
  await ConnectDB();


  const { id, businessname, industry, city, state, address, phone, images, locationType, zipcode, sic, sic2, sic4, sic8,
    naics, userId, ownername, web, coordinates, market, annual, created } = req.body;


  try {
    const updatedBusiness = await Business.findByIdAndUpdate(id, {
      BusinessName: businessname,
      Industry: industry,
      City: city,
      StateCode: state,
      Address: address,
      Phone: phone,
      BImage: images,
      LocationType: locationType,
      ZIPCode: zipcode,
      SIC: sic,
      SIC2Category: sic2,
      SIC4Category: sic4,
      SIC8Category: sic8,
      NAICS: naics,
      UserId: userId,
      ContactName: ownername,
      Web: web,
      Coordinates: coordinates,
      MarketVariable: market,
      AnnualRevenue: annual,
      YearFounded: created
    });

    if (!updatedBusiness) {
      return res.status(404).json({ error: "Business not found" });
    }
    console.log(updatedBusiness)
    res.status(200).json({ success: true, message: "Business information updated successfully" });
  } catch (error) {
    console.error("Error updating Business:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
