import ConnectDB from "../../../DB/connectDB";
import Review from "../../../models/review";

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
    const updatedReview = await Review.findByIdAndUpdate(id, {
      Reply: Answer,
      CreatedDate: formattedDate
    });

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    console.log(updatedReview)
    res.status(200).json({ success: true, message: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating Review:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
