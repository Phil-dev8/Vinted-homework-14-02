import axios from "axios";
import { useEffect, useState } from "react";
//L'image en dessous du header (voir plus tard pour l'effet déchiré)
import mainpic from "../images/main-pic.jpg";

// mmon composant SingleOffer
import SingleOffer from "../components/SingleOffer";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <div>
      <img className="main-pic" src={mainpic} alt="main pic" />
      <div className="home">
        <p>Prêts à faire du tri dans vos placards ?</p>
        <button className="start-to-sale">Commencer a vendre</button>
      </div>
      {data.offers.map((offer) => {
        //je transfère la prop offer a mon composant et utilise l'id pour supprimer le warning
        return <SingleOffer offerDetails={offer} key={offer._id} />;
      })}
    </div>
  );
};

export default Home;
