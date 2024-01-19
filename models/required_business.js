import mongoose from "mongoose";

const RequiredBusinessSchema = new mongoose.Schema({
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
  Status: {
    type: Number,
  },
});

const RequiredBusiness =
  mongoose.models.RequiredBusiness || mongoose.model("RequiredBusiness", RequiredBusinessSchema);

export default RequiredBusiness;
