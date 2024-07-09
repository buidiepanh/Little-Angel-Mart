import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import {
  PaymentElement,
  Elements,
  useElements,
  useStripe,
  CardElement,
} from "@stripe/react-stripe-js";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { gql } from "@apollo/client";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripe = loadStripe(
  "pk_test_51PZy5CRwV3ieMSE0yi4gEMKnnM1gg4TArSRYf1WAjEmBvMz3MOWXZQOPqSxBbIortJdLmhZnDnmFnO1Njqfa7YUV00F4HhRF80"
);

// const CREATE_ORDER_MUTATION = gql``;

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
    // <form onSubmit={handleSubmit}>
    //   <CardElement />
    //   <button type="submit" disabled={!stripe || !elements}>
    //     Pay
    //   </button>
    //   {/* Show error message to your customers */}
    //   {errorMessage && <div>{errorMessage}</div>}
    // </form>
    <CheckoutFormStyles onSubmit={handleSubmit}>
      <CardElement />
      <Button variant="contained">Thanh toán</Button>
    </CheckoutFormStyles>
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
