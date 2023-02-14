import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ title, price }) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "id",
      });
      const stripeToken = stripeResponse.token.id;
      console.log(stripeToken);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: price,
        }
      );
      if (response.data === "succeeded") {
        setLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {completed ? (
        <p>Félicitations, votre commande a bien été réglée ! </p>
      ) : (
        <button disabled={loading} type="submit">
          Payer
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
