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
  avatar: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: String,
  },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
