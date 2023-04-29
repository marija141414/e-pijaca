import React, { useState, useEffect } from "react";
import axios from "axios";

const Katalog = () => {
  const [proizvodi, setProizvodi] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((response) => {
        setProizvodi(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="katalog">
      <h2>Katalog proizvoda</h2>
      {proizvodi.map((proizvod) => (
        <div className="proizvod" key={proizvod.id}>
          <img src={proizvod.image_url} alt={proizvod.name} />
          <h3>{proizvod.name}</h3>
          <p>{proizvod.description}</p>
          <span className="cena">{proizvod.price} RSD</span>
        </div>
      ))}
    </div>
  );
};

export default Katalog;
