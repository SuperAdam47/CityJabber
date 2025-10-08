import ConnectDB from "../../../../../../DB/connectDB";
import FAQ from "../../../../../../models/faq";
const { parse } = require('url');

export default async (req, res) => {
  await ConnectDB();
  const { id } = req.query;

  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};
