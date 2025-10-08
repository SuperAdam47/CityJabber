import ConnectDB from "../../../../DB/connectDB";
import sponsorBusiness from "../../../../models/sponsor_business";

export default async (req, res) => {
  await ConnectDB();

  const { id, businessname, industry, city, address, contact, phone, images } = req.body;

  try {
    const updatedBusiness = await sponsorBusiness.findByIdAndUpdate(id, {
      BusinessName: businessname,
      Industry: industry,
      City: city,
      Address: address,
      ContactName: contact,
      Phone: phone,
      BImage: images
    });

    if (!updatedBusiness) {
      return res.status(404).json({ error: "Sponsor Business not found" });
    }
    console.log(updatedBusiness)
    res.status(200).json({ success: true, message: "Sponsor Business updated successfully" });
  } catch (error) {
    console.error("Error updating Sponsor Business:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
