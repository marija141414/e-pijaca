import React, { useState, useEffect } from "react";
import axios from "axios";
 
import { useNavigate } from "react-router-dom";



const Katalog = ({proizvodi,setKorpa,korpa}) => {

  const [prikaziDetalje, setPrikaziDetalje] = useState(false);
  const navigate = useNavigate();

  const handleDetaljiClick = (id) => {
    navigate(`/proizvodi/${id}`);
  };
  const toggleProizvodUKorpi = (proizvod) => {
    const proizvodUKorpi = korpa.find((item) => item.id === proizvod.id);
  
    if (proizvodUKorpi) {
      setKorpa(korpa.filter((item) => item.id !== proizvod.id));
    } else {
      setKorpa([...korpa, proizvod]);
    }
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
            <button
              className="dugme-katalog"
              onClick={() => toggleProizvodUKorpi(proizvod)}
            >
              {korpa.find((item) => item.id === proizvod.id)
                ? "Izbaci iz korpe"
                : "Dodaj u korpu"}
            </button>
        </div>
      ))}
    </div>
  );
};

export default Katalog;
