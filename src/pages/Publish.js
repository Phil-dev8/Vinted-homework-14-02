import axios from "axios";
import { useState } from "react";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="container">
      <h2>Vends ton article</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("picture", picture);
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(response);
          } catch (error) {
            console.log(error.response.data);
          }
        }}
      >
        <div className="block1">
          <input
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
        </div>
        <div className="block2">
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div className="block3">
          <input
            type="text"
            placeholder="Marque"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Taille"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Couleur"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="État"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Lieu"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
        <div className="block4">
          <input
            type="text"
            placeholder="Prix"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <button type="submit">Ajoute l'offre</button>
      </form>
    </div>
  );
};

export default Publish;
