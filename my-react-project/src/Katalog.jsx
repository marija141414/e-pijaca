import React, { useState, useEffect } from "react";
import axios from "axios";
 
import { useNavigate } from "react-router-dom";



const Katalog = ({proizvodi}) => {

  const [prikaziDetalje, setPrikaziDetalje] = useState(false);
  const navigate = useNavigate();

  const handleDetaljiClick = (id) => {
    navigate(`/proizvodi/${id}`);
  };


  return (
    <div className="katalog">
      
      {proizvodi.map((proizvod) => (
        <div className="proizvod" key={proizvod.id}>
          <img src={proizvod.image_url} alt={proizvod.name} />
          <h3>{proizvod.name}</h3>
          <p>{proizvod.description}</p>
          <span className="cena">{proizvod.price} RSD</span>
          <button className="dugme-katalog" onClick={() => handleDetaljiClick(proizvod.id)}>
              Detalji
            </button>
      
        </div>
      ))}
    </div>
  );
};

export default Katalog;
