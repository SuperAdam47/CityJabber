import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  avatar: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: String,
  },
  role: {
    type: String,
    default: "user"
  },
  aboutMe: {
    type: String,
  },
  location: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  isBanned: {
    type: Boolean,
  }
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
