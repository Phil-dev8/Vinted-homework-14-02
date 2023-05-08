import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/pages/Payment.css";
import { useMemo } from "react";

const Payment = () => {
  const location = useLocation();
  const { title, price, user_id } = location.state;
  console.log(process.env.STRIPE_TOKEN);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TOKEN);

  const { shippingFees, protectionFees, totalPrice } = useMemo(() => {
    const shippingFees = price * 0.2;
    const protectionFees = price * 0.1;
    const totalPrice = price + shippingFees + protectionFees;

    return {
      shippingFees: shippingFees.toFixed(2),
      protectionFees: protectionFees.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    };
  }, [price]);

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <p className="payment-title">Résumé de la commande</p>
        <div className="payment-details-wrapper">
          <div>
            <p>{title}</p> <p>{price}€</p>
          </div>
          <div>
            <p>Frais protection acheteur</p>
            <p> {protectionFees}€</p>
          </div>
          <div>
            <p>Frais de port</p> <p>{shippingFees}€</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="payment-total-price-wrapper">
          <p>Total</p>
          <p>{totalPrice}€</p>
        </div>
        <div className="payment-step">
          Il ne vous reste plus qu'un étape pour vous offrir
          <span className="payment-bold">{title}</span>. Vous allez payer
          <span className="payment-bold">{totalPrice}€</span> (frais de
          protection et frais de port inclus).
        </div>
        <div className="divider"></div>
        <Elements stripe={stripePromise}>
          <CheckoutForm title={title} price={price} user_id={user_id} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
