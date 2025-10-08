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

      },
      rTitle: {
        type: String,
      },
      rContent: {
        type: String,

      },
      Rated: {
        type: Number,
      },
    },
  ],
  BusinessName: {
    type: String,

  },
  SIC2Category: {
    type: String,

  },
  SIC4Category: {
    type: String,

  },
  SIC8Category: {
    type: String,

  },
  UserId: {
    type: String,
  },
  ContactName: {
    type: String,

  },
  StateCode: {
    type: String,

  },
  City: {
    type: String,

  },
  ZIPCode: {
    type: Number,

  },
  Address: {
    type: String,

  },
  Phone: {
    type: Number,

  },
  Web: {
    type: String,
  },
  Coordinates: {
    type: String,

  },
  YearFounded: {
    type: Number,

  },
  LocationType: {
    type: String,

  },
  MarketVariable: {
    type: String,

  },
  AnnualRevenue: {
    type: String,

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
