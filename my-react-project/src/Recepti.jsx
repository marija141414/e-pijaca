import React, { useState, useEffect } from "react";
import axios from "axios";

const Recepti = () => {
  const [recepti, setRecepti] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const ucitajRecepte = async () => {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );

      if (response.data && response.data.meals) {
        setRecepti(response.data.meals);
      }
    };

    ucitajRecepte();
  }, [searchTerm]);

  useEffect(() => {
    const ucitajKategorije = async () => {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      if (response.data && response.data.categories) {
        setCategories(response.data.categories);
      }
    };

    ucitajKategorije();
  }, []);

  useEffect(() => {
    const ucitajPodrucja = async () => {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );

      if (response.data && response.data.meals) {
        setAreas(response.data.meals);
      }
    };

    ucitajPodrucja();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  const filteredRecepti = recepti.filter((recept) => {
    const categoryMatch = !selectedCategory || recept.strCategory === selectedCategory;
    const areaMatch = !selectedArea || recept.strArea === selectedArea;

    return categoryMatch && areaMatch;
  });

  return (
    <div>
    
            <div className="recepti-container">
            <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Pretraži recepte"
      />
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Izaberi kategoriju</ option>
            {categories.map((category) => (
            <option key={category.idCategory} value={category.strCategory}>
            {category.strCategory}
            </option>
            ))}
            </select>
            <select value={selectedArea} onChange={handleAreaChange}>
            <option value="">Izaberi poreklo</option>
            {areas.map((area) => (
            <option key={area.id} value={area.strArea}>
            {area.strArea}
            </option>
            ))}
            </select>
            {filteredRecepti.map((recept) => (
            <div className="recept-kartica" key={recept.idMeal}>
            <img
                    className="recept-slika"
                    src={recept.strMealThumb}
                    alt={recept.strMeal}
                    />
            <div className="recept-tekst">
            <h3>{recept.strMeal}</h3>
            <p>{recept.strInstructions.substring(0, 200)}...</p>
            <p>
            Kategorija: {recept.strCategory || "N/A"} | Poreklo:{" "}
            {recept.strArea || "N/A"}
            </p>
            </div>
            </div>
            ))}
            </div>
            </div>
            );
};

export default Recepti;
