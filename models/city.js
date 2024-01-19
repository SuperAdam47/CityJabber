import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  City: {
    type: String,
    default: "user"

  },
  StateName: {
    type: String,
    default: "user"

  },
  StateCode: {
    type: String,

  },
  Lat: {
    type: Number,

  },
  Lng: {
    type: Number,

  },
  Population: {
    type: Number,
  },
  ZipCode: {
    type: String,

  },
  Owner: {
    type: String,

  },
  Price: {
    type: Number,

  },
  Status: {
    type: Number,
  },
});

const City =
  mongoose.models.City || mongoose.model("City", CitySchema);

export default City;
