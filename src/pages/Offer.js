//PAGE REALISE AVEC AIDE DE LA CORRECTION, DIFFICULTE AU NIVEAU DE OBJECT.KEY

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <div className="offer">
      <div>
        <img src={data.product_image.secure_url} alt="pic-offer" />
      </div>
      <div>
        <span>{data.product_price}</span>
        {data.product_details.map((detail, index) => {
          const key = Object.keys(detail)[0];
          return (
            <div key={index}>
              <span>{key}</span> <span>{detail[key]}</span>
            </div>
          );
        })}
        <p>{data.product_name}</p>
        <p>{data.product_description}</p>
        <p>{data.owner.account.username}</p>
        {/* MON CODE AVANT LA CORRECTION
         <p>Marque: {data.product_details.MARQUE}</p>
        <p>Taille: {data.product_details.TAILLE}</p>
        <p>Etat: {data.product_details.ETAT}</p> */}
      </div>
    </div>
  );
};

export default Offer;
