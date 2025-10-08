import mongoose from "mongoose";

const SponsorBusinessSchema = new mongoose.Schema({
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

const SponsorBusiness =
  mongoose.models.SponsorBusiness || mongoose.model("SponsorBusiness", SponsorBusinessSchema);

export default SponsorBusiness;
