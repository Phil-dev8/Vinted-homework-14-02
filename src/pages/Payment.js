import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const location = useLocation();
  const { title, price } = location.state;
  console.log(title);
  const stripePromise = loadStripe(
    "pk_test_51MbP2dDPM3irzlod8q62a3I8TXEdrRpzefHIFGy0BVwAp9aR1e2ct0qkuaUagQRRSdffZlKPVukqYKu7v1Kx8YGP008NL9Z24B"
  );

  return (
    <div>
      <p>Résumé de la commande</p>
      <span>Commande</span> <span>{price}</span>
      <span>frais protection acheteur</span>
      <span>0,4</span>
      <span>frais de port</span> <span>0,8</span>
      <Elements stripe={stripePromise}>
        <CheckoutForm title={title} price={price} />
      </Elements>
    </div>
  );
};

export default Payment;
