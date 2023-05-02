import { Link } from "react-router-dom";
import "../styles/components/Card.css";

const Card = ({ offerDetails }) => {
  console.log(offerDetails);
  return (
    <article className="card-wrapper">
      <div className="card-header">
        {offerDetails.owner.account.avatar && (
          <img
            className="avatar-card"
            src={offerDetails.owner.account.avatar.secure_url}
            alt="profile-pic-seller"
          />
        )}
        <p className="name-card">{offerDetails.owner.account.username}</p>
      </div>

      <Link className="card-details-link" to={`/offer/${offerDetails._id}`}>
        <img
          className="image-card"
          src={offerDetails.product_image.secure_url}
          alt="offer-pic"
        />
        <div className="card-footer">
          <p className="card-price">{offerDetails.product_price} €</p>
          {offerDetails.product_details.map((elem, index) => {
            if (elem.TAILLE || elem.MARQUE) {
              return <p key={index}>{elem.TAILLE || elem.MARQUE}</p>;
            }

            return null;
          })}
        </div>
      </Link>
    </article>
  );
};

export default Card;
