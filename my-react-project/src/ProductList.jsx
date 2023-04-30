import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ProductList = ({ products ,setProducts}) => {
    const navigate = useNavigate();
    const updateProduct = (productId) => {
        navigate(`/admin/products/edit/${productId}`);
      };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`, {headers:{'Authorization': `Bearer ${ window.sessionStorage.getItem('auth_token')}`} });
      alert("USPESNO")
      setProducts((products.filter((p)=>p.id!=productId)))
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

const tableStyles = {
    borderCollapse: "collapse",
    width: "100%",
    textAlign: "left",
    marginBottom: "20px",
  };
  
  const thStyles = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f2f2f2",
  };
  
  const trStyles = {
    borderBottom: "1px solid #ddd",
  };
  
  const trAlternateStyles = {
    ...trStyles,
    backgroundColor: "#f8f8f8",
  };
  
  const tdStyles = {
    padding: "10px",
  };
  
  const updateButtonStyles = {
    padding: "5px 10px",
    backgroundColor: "#ffcc00",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  };
  
  const deleteButtonStyles = {
    padding: "5px 10px",
    backgroundColor: "#ff0000",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };
  
return (
    <div>
      <h1>Product List</h1>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>ID</th>
            <th style={thStyles}>Name</th>
            <th style={thStyles}>Description</th>
            <th style={thStyles}>Price</th>
            <th style={thStyles}>Image URL</th>
            <th style={thStyles}>Category</th> 
            <th style={thStyles}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} style={index % 2 === 0 ? trStyles : trAlternateStyles}>
              <td style={tdStyles}>{product.id}</td>
              <td style={tdStyles}>{product.name}</td>
              <td style={tdStyles}>{product.description}</td>
              <td style={tdStyles}>{product.price}</td>
              <td style={tdStyles}>{product.image_url}</td>
              <td style={tdStyles}>{product.category}</td>
          
              <td style={tdStyles}>
              <button onClick={() => updateProduct(product.id)} style={updateButtonStyles}>Ažuriraj</button>
                <button onClick={() => deleteProduct(product.id)} style={deleteButtonStyles}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProductList;