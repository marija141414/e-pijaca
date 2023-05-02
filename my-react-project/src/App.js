 
import { useEffect, useState } from 'react';
import './App.css';
import DetaljiProizvoda from './DetaljiProizvoda';
import Home from './Home';
import Katalog from './Katalog';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPage from './AdminPage';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import NasePreporuke from './NasePreporuke';
import Korpa from './Korpa';
import Recepti from './Recepti';
import AdminPageStats from './AdminPageStats';

function App() {
  const [user, setUser] = useState(null);
  const [korpa, setKorpa] = useState([]);
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/orders");
      console.log(response.data)
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const handleLogin = data => {
    setUser(data);
    console.log("HANDLE LOGIN"+data)
  };

  const handleLogout = () => {
    setUser(null);
  };
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

  const [ocene, setOcene] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/reviews")
      .then((response) => {
        setOcene(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    function onAdd(newProduct){
      let products = proizvodi;
      products.push(newProduct)
      setProizvodi(products)
    }
    function onUpdate(newProduct){
      let products = proizvodi;
      for(var i=0;i<proizvodi.length;i++){
        if(proizvodi[i].id==newProduct.id){
          proizvodi[i]=newProduct;
        }
      }
     
      setProizvodi(products)
    }


  return (
    <BrowserRouter>
     
        <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={ <Home></Home>}></Route>
        <Route path="/preporuke" element={ <NasePreporuke></NasePreporuke>}></Route>
        <Route path="/korpa" element={ <Korpa korpa={korpa} setKorpa={setKorpa}></Korpa>}></Route>
        <Route path="/recepti" element={ <Recepti></Recepti>}></Route>

        <Route path="/proizvodi" element={<Katalog proizvodi={proizvodi} korpa={korpa} setKorpa={setKorpa}></Katalog>}></Route>

        <Route path="/proizvodi/:id" element={ <DetaljiProizvoda proizvodi={proizvodi}></DetaljiProizvoda>}></Route>
        <Route path="/login" element={ <Login onLogin={handleLogin}></Login>}></Route>
        <Route path="/register" element={ <Register></Register>}></Route>
        <Route path="/admin" element={ <AdminPage proizvodi={proizvodi} orders={orders}></AdminPage>} ></Route>
        <Route path="/admin/products" element={<ProductList products={proizvodi} setProducts={setProizvodi}></ProductList>}></Route>
        <Route path="/admin/products/add" element={<AddProduct onAdd={onAdd} ></AddProduct>}></Route>
        <Route path="/admin/stats" element={ <AdminPageStats  ocene={ocene} proizvodi={proizvodi} narudzbine={orders}></AdminPageStats>} ></Route>

        <Route path="/admin/products/edit/:id" element={ <EditProduct proizvodi={proizvodi} onUpdate={onUpdate}></EditProduct>}></Route>
 
      </Routes>
     
     
  </BrowserRouter>
       
     
  );
}

export default App;
