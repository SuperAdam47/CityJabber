import ConnectDB from "../../../../DB/connectDB";
import Business from "../../../../models/td_business_total";

export default async (req, res) => {
  await ConnectDB();

  const { id, businessname, industry, city, address, phone, images } = req.body;

  try {
    const updatedBusiness = await Business.findByIdAndUpdate(id, {
      BusinessName: businessname,
      Industry: industry,
      City: city,
      Address: address,
      Phone: phone,
      BImage: images
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
