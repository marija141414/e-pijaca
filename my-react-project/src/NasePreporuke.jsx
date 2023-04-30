import { useState, useEffect } from "react";
import axios from "axios";

function getAllProducts() {
  return axios
    .get(
      "https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=&page_size=50"
    )
    .then((response) => {
      return response.data.products;
    });
}

function NasePreporuke(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      getAllProducts().then((data) => {
        setProducts(data);
        setLoading(false);
      });
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="nase-preporuke">
        <h1>All Products</h1>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.code} className="product-item">
              <h2>{product.product_name}</h2>
              <img src={product.image_front_url} alt={product.product_name} />
              <p><strong>Brand:</strong> {product.brands}</p>
             
              <p><strong>Ingredients:</strong> {product.ingredients_text}</p>
              <p><strong>Nutrition Grade:</strong> {product.nutrition_grade_fr.toUpperCase()}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  

export default NasePreporuke;
