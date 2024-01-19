import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
  BusinessId: {
    type: String,
  },
  Question: {
    type: String,
  },
  Answer: {
    type: String,

  },
  CreatedDate: {
    type: String,

  },
  Status: {
    type: Number,
  },
  CollapseTarget: {
    type: String,
  },
});

const FAQ =
  mongoose.models.FAQ || mongoose.model("FAQ", FAQSchema);

export default FAQ;
