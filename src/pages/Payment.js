//Warning dans l'inspecteur, si je comprends bien, react n'aime pas que je modifie la prop une fois que je l'ai parametrer? Mais il m'indique la prop `stripe`
import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const location = useLocation();
  const { title, price, user_id } = location.state;
  console.log(title);
  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );

  let shippingFees = price * 0.2;
  let protectionFees = price * 0.1;
  let totalPrice = price + shippingFees + protectionFees;
  //console.log(shippingFees);
  //console.log(protectionFees);

  return (
    <div className="infos-payment">
      <p>Résumé de la commande</p>
      <div>
        <span>{title}</span> <span>{price}€</span>
      </div>
      <div>
        <span>Frais protection acheteur</span>
        <span> {protectionFees}€</span>
      </div>
      <div>
        <span>Frais de port</span> <span>{shippingFees}€</span>
      </div>
      <div>
        <span className="total">
          Montant total de la commande: {totalPrice}€
        </span>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm title={title} price={price} user_id={user_id} />
      </Elements>
    </div>
  );
};

export default Payment;
