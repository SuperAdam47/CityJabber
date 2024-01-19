const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import ConnectDB from "../../../DB/connectDB";
import tb_payment from "../../../models/tb_payment";
import User from "../../../models/User";

export default async (req, res) => {
  try {
    const { amount, email, city, username } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amount * 100,
            product_data: {
              name: "test",
            },
          },
        },
      ],
      customer_email: email,

      success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/success`, //redirect url for frontend when success
      cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/failure`, //redirect url for frontend when cancel
    });

    await ConnectDB();

    const checkUser = await User.findOne({ email }).then((rec) => {
      const createTx = tb_payment.create({
        email: email,
        userName: username,
        cityName: city,
        amount: amount,
        SessionID: session.id,
        status: 0,
      });
    });

    return res.status(200).send(session.id);
  } catch (error) {
    res.status(400).send("Server error");
  }
};
