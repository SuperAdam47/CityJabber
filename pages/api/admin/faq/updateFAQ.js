import ConnectDB from "../../../../DB/connectDB";
import FAQ from "../../../../models/faq";

export default async (req, res) => {
  await ConnectDB();

  const { id, Question, Answer } = req.body;

  const currentDate = new Date();

  // Get the current year, month, and day
  const year = currentDate.getFullYear();
  const month = (`0${currentDate.getMonth() + 1}`).slice(-2); // Adding leading zero if needed
  const day = (`0${currentDate.getDate()}`).slice(-2); // Adding leading zero if needed

  const formattedDate = `${year}-${month}-${day}`;

  try {
    const updatedFAQ = await FAQ.findByIdAndUpdate(id, {
      Question,
      Answer,
      CreatedDate: formattedDate
    });

    if (!updatedFAQ) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    console.log(updatedFAQ)
    res.status(200).json({ success: true, message: "FAQ updated successfully" });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
