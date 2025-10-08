import ConnectDB from "../../../../DB/connectDB";
import FAQ from "../../../../models/faq";

export default async (req, res) => {
  await ConnectDB();

  console.log('req==>', req.body)

  const { BusinessId, Question, Answer } = req.body;

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

  const currentDate = new Date();

  // Get the current year, month, and day
  const year = currentDate.getFullYear();
  const month = (`0${currentDate.getMonth() + 1}`).slice(-2); // Adding leading zero if needed
  const day = (`0${currentDate.getDate()}`).slice(-2); // Adding leading zero if needed

  const formattedDate = `${year}-${month}-${day}`;

  try {
    const createdFAQ = await FAQ.create({
      BusinessId,
      Question,
      Answer,
      CreatedDate: formattedDate,
      CollapseTarget: randomString,
      Status: 0
    });

    if (!createdFAQ) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.status(200).json({ success: true, message: "FAQ created successfully" });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
