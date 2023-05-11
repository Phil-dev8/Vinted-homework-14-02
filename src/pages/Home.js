import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "../styles/pages/Home.css";
import { TearSvg } from "../images/Tear";

import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = ({ token, rangeValues, rangeValuesIsActive, search }) => {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data.offers);
        setFilteredData(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const dataCopy = [...(data || [])];

    const filteredDataCopy = dataCopy.filter(
      (offer) =>
        offer.product_price >= rangeValues[0] &&
        offer.product_price <= rangeValues[1]
    );

    if (search) {
      const dataToFilter = rangeValuesIsActive ? filteredDataCopy : dataCopy;

      const filteredDataBySearch = dataToFilter.filter((offer) => {
        return offer.product_name.toLowerCase().includes(search.toLowerCase());
      });

      setFilteredData(filteredDataBySearch);
    } else {
      setFilteredData(filteredDataCopy);
    }
    // eslint-disable-next-line
  }, [rangeValues, search]);

  const dataIsFiltered = useMemo(
    () => rangeValuesIsActive || search,
    [rangeValuesIsActive, search]
  );

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <div className="">
      <div className="home-wrapper">
        <div className="home-info">
          <p className="home-title-info">
            Prêts à faire du tri dans vos placards ?
          </p>
          <Link to={token ? "/publish" : "/login"}>
            <button className="start-to-sale">Commencer a vendre</button>
          </Link>
        </div>
        <div className="home-tear">
          <TearSvg />
        </div>
      </div>
      <div className="cards-wrapper">
        {(dataIsFiltered ? filteredData : data)?.map((offer) => {
          return <Card offerDetails={offer} key={offer._id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
