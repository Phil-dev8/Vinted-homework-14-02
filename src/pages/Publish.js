import axios from "axios";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/pages/Publish.css";
import { PublishField } from "../components/PublishField";
import { useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [pictures, setPictures] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    setPictures(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("color", color);
      pictures.forEach((picture) => {
        formData.append("picture", picture);
      });
      await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="publish-wrapper">
      <div className="publish-content">
        <h2 className="publish-title">Vends ton article</h2>
        <form onSubmit={onSubmit} className={"publish-form"}>
          <div className="box-form form-picture">
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} accept="image/*" multiple={false} />
              {pictures.length ? (
                <div>
                  {pictures.map((file) => (
                    <div key={file.name}>
                      <img src={file.preview} alt={file.name} />
                      <p>{file.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <button className="add-picture-button">
                  <span className="publish-outline">+</span> Ajoute une photo
                </button>
              )}
            </div>
          </div>
          <div className="box-form form-description">
            <PublishField
              name="Titre"
              type="text"
              placeholder="ex: Chemise Sézane verte"
              value={title}
              onChange={(value) => {
                setTitle(value);
              }}
            />
            <PublishField
              name="Description"
              type="textarea"
              placeholder="ex: porté quelquefois, taille correctement"
              value={description}
              onChange={(value) => {
                setDescription(value);
              }}
              isLastChild
            />
          </div>
          <div className="box-form form-info">
            <PublishField
              name="Marque"
              type="text"
              placeholder="ex: Zara"
              value={brand}
              onChange={(value) => {
                setBrand(value);
              }}
            />
            <PublishField
              name="Taille"
              type="text"
              placeholder="ex: L / 40 / 12"
              value={size}
              onChange={(value) => {
                setSize(value);
              }}
            />
            <PublishField
              name="Couleur"
              type="text"
              placeholder="ex: Fushia"
              value={color}
              onChange={(value) => {
                setColor(value);
              }}
            />
            <PublishField
              name="État"
              type="text"
              placeholder="ex: Neuf avec étiquette"
              value={condition}
              onChange={(value) => {
                setCondition(value);
              }}
            />
            <PublishField
              name="Lieu"
              type="text"
              placeholder="ex: Paris"
              value={city}
              onChange={(value) => {
                setCity(value);
              }}
              isLastChild
            />
          </div>
          <div className="box-form form-price">
            <PublishField
              name="Prix"
              type="text"
              placeholder="0,00 €"
              value={price}
              onChange={(value) => {
                setPrice(value);
              }}
              isLastChild
            />
            <div className="changes-checkbox-publish">
              <div className="changes-checkbox-publish-content">
                <input
                  type="checkbox"
                  className="changes-checkbox"
                  id="changes-checkbox"
                  width={24}
                  height={24}
                />
                <label htmlFor="changes-checkbox">
                  Je ne suis pas intéressé(e) par les échanges
                </label>
              </div>
            </div>
          </div>
          <div className="publish-submit-wrapper">
            <button type="submit" className="publish-submit">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Publish;
