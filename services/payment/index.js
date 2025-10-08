import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export const claimcity = async (formData) => {
  try {
    const publishableKey =
      "pk_test_51Km1rPEoWAlcqHi3tuJOgZmQZb03lRxYCTNTEkoFmDmzsBGXAs35pnHprhwfinXIlybSsuXyw05PfqKDHT3PmGYP00WTQSzl0m";

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment`,
      formData
    );
    const stripe = await loadStripe(publishableKey);
    const session = { id: res.data };

    stripe.redirectToCheckout({ sessionId: res.data });

    const data = res.data;
    return data;
  } catch (error) {
    console.log("error in claim city => ", error);
  }
};
