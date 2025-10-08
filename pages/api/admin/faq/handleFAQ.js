import ConnectDB from "../../../../DB/connectDB";
import FAQ from "../../../../models/faq";

export default async (req, res) => {
  await ConnectDB();

  const { id, status } = req.body;

  try {
    const updatedFAQ = await FAQ.findByIdAndUpdate({ _id: id }, {
      Status: status,
    });

    if (!updatedFAQ) {
      return res.status(404).json({ error: "Requried FAQ not found" });
    }

    if (status === 1) {
      return res
        .status(200)
        .json({ success: true, message: "FAQ Permited successfully" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "FAQ Refused" });
    }
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
