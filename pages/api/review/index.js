import ConnectDB from "../../../DB/connectDB";
import Business from "../../../models/td_business_total";

export default async (req, res) => {
  await ConnectDB();

  const { id, user, rDate, rContent, rating } = req.body;
  try {
    Business.findById({ _id: id })
      .then((item) => {
        const newReview = {
          user,
          rDate,
          rContent,
          rating,
        };
        item.reviews.unshift(newReview);
        item
          .save()
          .then((post) =>
            res.status(200).json({ success: true, message: "Successfull" })
          );
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("Error in register (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong Please Retry Later !",
    });
  }
};
