 
import { useEffect, useState } from 'react';
import './App.css';
import DetaljiProizvoda from './DetaljiProizvoda';
import Home from './Home';
import Katalog from './Katalog';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
 

function App() {

  const [proizvodi, setProizvodi] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((response) => {
        setProizvodi(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);






  return (
    <BrowserRouter>
    <div className="App">
     
      <Routes>
        <Route path="/" element={ <Home></Home>}></Route>
        <Route path="/proizvodi" element={<Katalog proizvodi={proizvodi}></Katalog>}></Route>
        <Route path="/proizvodi/:id" element={ <DetaljiProizvoda proizvodi={proizvodi}></DetaljiProizvoda>}></Route>

 
      </Routes>
     
    </div>
  </BrowserRouter>
       
     
  );
}

export default App;
