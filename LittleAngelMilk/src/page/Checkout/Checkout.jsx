import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import {
  PaymentElement,
  Elements,
  useElements,
  useStripe,
  CardElement,
} from "@stripe/react-stripe-js";

const stripe = loadStripe(
  "pk_test_51PZy5CRwV3ieMSE0yi4gEMKnnM1gg4TArSRYf1WAjEmBvMz3MOWXZQOPqSxBbIortJdLmhZnDnmFnO1Njqfa7YUV00F4HhRF80"
);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  appearance: {
    theme: "night",
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.error(error);
        return;
      }
      console.log({ paymentMethod });
      // gọi custom mutation checkout to server
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

function Checkout() {
  return (
    <Elements stripe={stripe} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
