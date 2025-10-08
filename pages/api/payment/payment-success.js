const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import ConnectDB from "../../../DB/connectDB";
import tb_payment from "../../../models/tb_payment";

export default async (req, res) => {
  try {
    const { amount, email, city, username } = req.body;

    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(req.body, signature);

    await ConnectDB();

    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          console.log("paymentIntent: ", paymentIntent);
          const sessionId = paymentIntent.id;

          const createTx = tb_payment.findByIdAndUpdate(sessionId, {
            email: email,
            userName: username,
            cityName: city,
            amount: amount,
            SessionID: session.id,
            status: 0,
          });

          break;
        case "payment_intent.payment_failed":
          break;
        default:
          console.log("Unhandled event type:", event.type);
          break;
      }
      return;
    } catch (ex) {
      console.error("Error handling webhook event:", ex);
      res.status(500).json({ error: "Webhook event handling failed" });
    }

    return res.status(200).send(session.id);
  } catch (error) {
    res.status(400).send("Server error");
  }
};
