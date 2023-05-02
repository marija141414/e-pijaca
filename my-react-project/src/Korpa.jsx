import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Korpa = ({ korpa ,setKorpa}) => {
  const navigate = useNavigate();

 

 
    var sum=0;
    for(var i=0;i<korpa.length;i++){
        sum+=parseFloat(korpa[i].price);
    }
 
 
    function vratiNizIdijeva(){
        var niz=[];
        for(var i=0;i<korpa.length;i++){
            niz.push(korpa[i].id);
        }
        return niz;
    }
  const handleKreirajPorudzbinu = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/orders", {
        status: "pending",
        user_id: window.sessionStorage.getItem("auth_id"),
        items: (vratiNizIdijeva())
        });

      if (response.status === 200 || response.status === 201) {
        setKorpa(null);
        alert("Uspešno ste kreirali porudžbinu!");
        navigate("/");
      } else {
        alert("Došlo je do greške prilikom kreiranja porudžbine.");
      }
    } catch (error) {
      alert("Došlo je do greške prilikom kreiranja porudžbine.");
      console.error(error);
    }
  };

  return (
    <div className="korpa">
      <h2>Korpa</h2>
      { korpa==null || korpa.length === 0 ? (
        <p>Korpa je prazna.</p>
      ) : (
        korpa.map((proizvod) => (
          <div key={proizvod.id} className="korpa-proizvod">
            <img src={proizvod.image_url} alt={proizvod.name} />
            <h3>{proizvod.name}</h3>
            <span className="cena">{proizvod.price} RSD</span>
          </div>
        ))
      )}
      <p>Ukupna suma: {sum} RSD</p>
      <button className="dugme-kreiraj" onClick={handleKreirajPorudzbinu}>
        Kreiraj porudžbinu
      </button>
    </div>
  );
};

export default Korpa;
