import { Link } from "react-router-dom";

const SingleOffer = ({ offerDetails }) => {
  return (
    <article>
      <div className="article">
        {offerDetails.owner.account.avatar && (
          <img
            className="avatar"
            src={offerDetails.owner.account.avatar.secure_url}
            alt="profile-pic-seller"
          />
        )}
        <span>{offerDetails.owner.account.username}</span>
        <Link to={`/offer/${offerDetails._id}`}>
          <img
            className="offer-pic"
            src={offerDetails.product_image.secure_url}
            alt="offer-pic"
          />
        </Link>
        <span>{offerDetails.product_price}</span>
        {offerDetails.product_details.map((elem, index) => {
          // Pour mes formateurs: je n'arrivais pas a afficher la taille et la marque car avant la correction, je n'avais pas mis les "return" dans mes if....... x)
          if (elem.TAILLE) {
            return <p key={index}>{elem.TAILLE}</p>;
          } else if (elem.MARQUE) {
            return <p key={index}>{elem.MARQUE}</p>;
          } else {
            return null;
          }
        })}
      </div>
    </article>
  );
};

export default SingleOffer;
