import formidable from "formidable";
import ConnectDB from "../../../DB/connectDB";
import Business from "../../../models/td_business_total";
import fs from "fs";
export const config = {
  api: {
    bodyParser: false, // Disable built-in JSON body parsing
  },
};

export default async (req, res) => {
  await ConnectDB();

  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/img/hotels"; // Set the directory to save uploaded files
  form.keepExtensions = true; // Keep the file extensions
  console.log(form);
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed." });
    }
    try {
      const { id } = fields;

      console.log(files.files);

      const newPath = "./public/img/hotels/" + files.files.name;
      fs.renameSync(files.files.path, newPath);

      Business.findOne({ _id: id }).then((item) => {
        if (item) {
          item.BImage += "," + newPath.slice(8);
          item.save();
        }
      });

      return res
        .status(200)
        .json({ message: "File(s) uploaded successfully." });
    } catch (error) {
      console.error("Error saving file to MongoDB:", error);
      return res.status(500).json({ error: "File upload failed." });
    }
  });
};
