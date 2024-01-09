import ConnectDB from "../../../DB/connectDB";
import User from "../../../models/User";
import Joi from "joi";
import { hash } from "bcryptjs";
const fs = require('fs');
const path = require('path');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  username: Joi.string().required(),
});

export default async (req, res) => {

  await ConnectDB();
  let { email, password, username, avatar, birthday, gender, filepath } = req.body;

  console.log('req===>', req.body)
  const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '');

  const imageBuffer = Buffer.from(base64Data, 'base64');


  fs.writeFile(filepath, imageBuffer, 'base64', function (err) {
    if (err) {
      // Handle error
      return res.status(500).send('Error occurred while saving the image.');
    }

    // Image saved successfully
    avatar = filepath;
  });

  const { error } = schema.validate({
    email,
    password,
    username,
  });

  if (error)
    return res.status(401).json({
      success: false,
      message: error.details[0].message.replace(/['"]+/g, ""),
    });

  try {
    const ifExist = await User.findOne({ email });

    if (ifExist) {
      return res
        .status(406)
        .json({ success: false, message: "User Already Exist" });
    } else {
      const hashedPassword = await hash(password, 12);
      const createUser = await User.create({
        email,
        username,
        password: hashedPassword,
        avatar: avatar.slice(6, avatar.length),
        birthday,
        gender,
      });
      return res
        .status(201)
        .json({ success: true, message: "Account created successfully" });
    }
  } catch (error) {
    console.log("Error in register (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong Please Retry Later !",
    });
  }
};
