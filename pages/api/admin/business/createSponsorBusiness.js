import ConnectDB from "../../../../DB/connectDB";
import ContactInfo from "../../../../components/footer/footer-6/ContactInfo";
import sponsorBusiness from "../../../../models/sponsor_business";

export default async (req, res) => {
  await ConnectDB();

  const { id, businessname, industry, city, address, contact, phone, images } = req.body;

  try {
    const createdBusiness = await sponsorBusiness.create({
      BusinessName: businessname,
      Industry: industry,
      City: city,
      Address: address,
      ContactName: contact,
      Phone: phone,
      BImage: images
    });

    if (!createdBusiness) {
      return res.status(404).json({ error: "Sponsor Business not found" });
    }
    res.status(200).json({ success: true, message: "Sponsor business created successfully" });
  } catch (error) {
    console.error("Error creating Sponsor Business:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
