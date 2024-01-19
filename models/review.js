import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  Avatar: {
    type: String,
  },
  UserName: {
    type: String,
  },
  UserEmail: {
    type: String,
  },
  BusinessId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  BusinessName: {
    type: String,

  },
  OwnerName: {
    type: String,
  },
  BusinessPhone: {
    type: String,
  },
  BusinessImages: {
    type: String,
  },
  Title: {
    type: String,
  },
  Content: {
    type: String,
  },
  Rate: {
    type: Number,

  },
  Images: {
    type: String,
  },
  CreatedDate: {
    type: String,
  },
  Reply: {
    type: String,
  },
  CollapseTarget: {
    type: String,
  },
});

const Review =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
