import React, { useState, useEffect } from "react";
import axios from "axios";
 

const Recepti = () => {
  const [recepti, setRecepti] = useState([]);

  useEffect(() => {
    const ucitajRecepte = async () => {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
      );

      if (response.data && response.data.meals) {
        setRecepti(response.data.meals);
      }
    };

    ucitajRecepte();
  }, []);

  return (
    <div className="recepti-container">
      {recepti.map((recept) => (
        <div className="recept-kartica" key={recept.idMeal}>
          <img
            className="recept-slika"
            src={recept.strMealThumb}
            alt={recept.strMeal}
          />
          <div className="recept-tekst">
            <h3>{recept.strMeal}</h3>
            <p>{recept.strInstructions.substring(0, 200)}...</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recepti;
