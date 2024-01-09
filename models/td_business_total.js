import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      avatar: {
        type: String
      },
      username: {
        type: String
      },
      rDate: {
        type: Date,
        required: true,
      },
      rTitle: {
        type: String,
        // required: true,
      },
      rContent: {
        type: String,
        required: true,
      },
      Rated: {
        type: Number,
      },
    },
  ],
  BusinessName: {
    type: String,
    required: true,
  },
  SIC2Category: {
    type: String,
    required: true,
  },
  SIC4Category: {
    type: String,
    required: true,
  },
  SIC8Category: {
    type: String,
    required: true,
  },
  ContactName: {
    type: String,
    required: true,
  },
  StateCode: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  ZIPCode: {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Web: {
    type: String,
  },
  Coordinates: {
    type: String,
    required: true,
  },
  YearFounded: {
    type: Number,
    required: true,
  },
  LocationType: {
    type: String,
    required: true,
  },
  MarketVariable: {
    type: String,
    required: true,
  },
  AnnualRevenue: {
    type: String,
    required: true,
  },
  SIC: {
    type: Number,
  },
  NAICS: {
    type: Number,
  },
  Industry: {
    type: String,
  },
  BImage: {
    type: String,
  },
  BestSeller: {
    type: Number,
  },
});

const Business =
  mongoose.models.Business || mongoose.model("Business", BusinessSchema);

export default Business;
