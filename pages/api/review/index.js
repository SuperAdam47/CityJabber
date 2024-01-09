import ConnectDB from "../../../DB/connectDB";
import Business from "../../../models/td_business_total";

export default async (req, res) => {
  await ConnectDB();

  const { id, user, avatar, username, rDate, rTitle, rContent, rating } = req.body;
  try {
    Business.findById({ _id: id })
      .then((item) => {
        const newReview = {
          user,
          avatar,
          username,
          rDate,
          rTitle,
          rContent,
          Rated: rating,
        };
        item.reviews ? item.reviews.unshift(newReview) : item.reviews = [{
          user,
          avatar,
          username,
          rDate,
          rTitle,
          rContent,
          Rated: rating,
        }];
        item
          .save()
          .then(() =>
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
