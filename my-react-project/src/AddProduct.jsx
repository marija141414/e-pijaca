import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({onAdd}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const newProduct = {
            name,
            description,
            price,
            image_url: imageUrl,
            category_id: category,
          };
      
        let response= await axios.post('http://127.0.0.1:8000/api/products', newProduct);
        console.log(response.data.data)
          alert('Proizvod uspešno dodat!');
          onAdd(response.data.data)
          navigate('/admin/products')
          
        } catch (error) {
          console.error('Greška prilikom dodavanja proizvoda:', error);
        }
      };
      
      return (
        <div className="add-product-container">
          <h1>Dodaj novi proizvod</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Naziv:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Opis:
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
              Cena:
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </label>
            <label>
              URL slike:
              <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
            </label>
            <label>
              Kategorija:
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Izaberi kategoriju</option>
                <option value="1">Hrana</option>
                <option value="2">Piće</option>
                <option value="3">Slatkiši</option>
              </select>
            </label>
            <button type="submit">Dodaj proizvod</button>
          </form>
        </div>
      );
      
      
    
};

export default AddProduct;
