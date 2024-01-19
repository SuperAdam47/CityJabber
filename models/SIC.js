import mongoose from "mongoose";

const SICSchema = new mongoose.Schema({
  SIC2SIC: {
    type: String,

  },
  SIC4Category: {
    type: String,
  },
});

const SIC =
  mongoose.models.SIC || mongoose.model("SIC", SICSchema);

export default SIC;
