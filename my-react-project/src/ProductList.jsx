import  { useState, useEffect } from 'react';
import axios from 'axios';

function getAllProducts() {
  return axios.get('https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=&page_size=50')
    .then(response => {
      return response.data.products;
    });
}

function ProductList(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.code}>
            <h2>{product.product_name}</h2>
            <img src={product.image_front_url} alt={product.product_name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProductList;