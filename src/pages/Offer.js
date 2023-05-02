import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/pages/Offer.css";

const Offer = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return loading ? (
    <p>Chargement en cours</p>
  ) : (
    <div className="offer-wrapper">
      <div className="offer-container">
        <img
          className="offer-image"
          src={data.product_image.secure_url}
          alt="pic-offer"
        />
        <div className="offer-details">
          <div>
            <p className="offer-price"> {data.product_price} €</p>
            <div className="details-header">
              {data.product_details.map((detail, index) => {
                const nameDetails = Object.keys(detail)[0];
                const valueDetails = detail[nameDetails];

                return (
                  <div className="details-wrapper" key={index}>
                    <p className="name-details">{nameDetails}</p>
                    <p>{valueDetails}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="divider"></div>
          <div className="details-footer">
            <p className="name-product">{data.product_name}</p>
            <p className="description-product">{data.product_description}</p>
            <p className="user-product">{data.owner.account.username}</p>
          </div>
          <Link
            className="buy-button"
            to="/payment"
            state={{ title: data.product_name, price: data.product_price }}
          >
            Acheter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Offer;
