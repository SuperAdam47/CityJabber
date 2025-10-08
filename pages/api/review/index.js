import ConnectDB from "../../../DB/connectDB";
import Review from "../../../models/review";

export default async (req, res) => {
  await ConnectDB();

  const { User, Avatar, UserName, UserEmail, BusinessId, BusinessName, BusinessImages, BusinessPhone, OwnerName, Title, Content, Rate, Images, Created } = req.body;

  function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const randomString = generateRandomString(5);

  try {
    const createUser = await Review.create({
      UserId: User,
      Avatar,
      UserName,
      UserEmail,
      BusinessId,
      BusinessName,
      BusinessImages,
      BusinessPhone,
      OwnerName,
      Title,
      Content,
      Rate,
      Images,
      CollapseTarget: randomString,
      CreatedDate: Created
    });
    return res
      .status(201)
      .json({ success: true, message: "Account created successfully" });

  } catch (error) {
    console.log("Error in register (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong Please Retry Later !",
    });
  }
};
