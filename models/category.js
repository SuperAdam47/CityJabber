import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  SIC2Category: {
    type: String,

  },
  SIC4Category: {
    type: String,
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
