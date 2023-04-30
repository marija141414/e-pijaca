import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = ({proizvodi,onUpdate}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
        for(var i=0;i<proizvodi.length;i++){
            if(proizvodi[i].id==id){
                setProduct(proizvodi[i])
            }
        }
        
        console.log(product)
    };

    getProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result=await axios.put(`http://127.0.0.1:8000/api/products/${id}`, product);
      console.log(result.data.data)
      onUpdate(result.data.data)
      alert('Proizvod uspešno ažuriran!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-form-container">
      <h1>Uredi proizvod</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          Ime:
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Opis:
          <textarea
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Cena:
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          URL slike:
          <input
            type="text"
            value={product.image_url}
            onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Kategorija:
          <select
            value={product.category_id}
            onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
            required
          >
            <option value="">Izaberi kategoriju</option>
            <option value="1">Hrana</option>
            <option value="2">Piće</option>
            <option value="3">Slatkiši</option>
          </select>
        </label>
        <br />
        <button type="submit">Ažuriraj proizvod</button>
      </form>
    </div>
  );
  
};

export default EditProduct;
