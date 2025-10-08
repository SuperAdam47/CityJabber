import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  ID: {
    type: Number,
  },
  userID: {
    type: Number,
  },
  email: {
    type: String,
  },
  cityName: {
    type: String,
  },
  userName: {
    type: String,
  },
  sessionID: {
    type: String,
  },
  amount: {
    type: String,
  },
  status: {
    type: String,
  },
});
const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export default Payment;
