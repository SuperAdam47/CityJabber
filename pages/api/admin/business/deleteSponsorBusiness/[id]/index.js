import ConnectDB from "../../../../../../DB/connectDB";
import SponsorBusiness from "../../../../../../models/sponsor_business";
const { parse } = require('url');

export default async (req, res) => {
  await ConnectDB();
  const { id } = req.query;

  try {
    const deletedSponsorBusiness = await SponsorBusiness.findByIdAndDelete(id);

    if (!deletedSponsorBusiness) {
      return res.status(404).json({ message: 'Sponsor Business not found' });
    }

    res.json({ success: true, message: 'Sponsor Business deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};
