import ConnectDB from "../../../DB/connectDB";
import User from "../../../models/User";
import Joi from "joi";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path"

export const config = {
  api: {
    bodyParser: false
  }
};

export default async (req, res) => {
  await ConnectDB();

  // Validate the request body
  // const { avatar, birthday, gender } = req.body;

  const form = new IncomingForm();
  const uploadDir = '/public/uploads';
  // Ensure the upload directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  form.uploadDir = uploadDir;

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      const { id, username, firstname, lastname, phonenumber, location, aboutMe, facebook, twitter, gender, birthday } = fields
      // Access the uploaded file details via `files`
      const newPath = `.${uploadDir}/${id[0]}`;
      console.log(files.file)
      if (files.file) {
        const uploadedFile = files.file[0];
        // Perform actions with the uploaded file (e.g., save to disk, database, etc.)
        console.log(uploadedFile)
        // Use fs.renameSync to handle the file move/rename operation
        fs.renameSync(uploadedFile.filepath, newPath);
      }

      // Respond to the client
      try {
        // Update the user's information in the database
        const updatedUser = await User.findByIdAndUpdate(id[0], {
          username: username[0],
          firstname: firstname[0],
          lastname: lastname[0],
          phonenumber: phonenumber[0],
          location: location[0],
          aboutMe: aboutMe[0],
          facebook: facebook[0],
          twitter: twitter[0],
          birthday: birthday[0],
          gender: gender[0],
          avatar: `/uploads/${id[0]}`,
        }, {new: true});

        if (!updatedUser) {
          return res.status(404).json({ error: "User not found" });
        }
        console.log(updatedUser)
        res.status(200).json({ success: true, user: updatedUser, message: "User information updated successfully" });
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
          success: false,
          error: "Internal server error",
        });
      }
    });
  } catch (error) {
    console.error('Unhandled error during file upload:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
