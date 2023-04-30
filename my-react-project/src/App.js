 
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

function App() {
  const [user, setUser] = useState(null);

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






  return (
    <BrowserRouter>
     
        <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={ <Home></Home>}></Route>
        <Route path="/proizvodi" element={<Katalog proizvodi={proizvodi}></Katalog>}></Route>
        <Route path="/proizvodi/:id" element={ <DetaljiProizvoda proizvodi={proizvodi}></DetaljiProizvoda>}></Route>
        <Route path="/login" element={ <Login onLogin={handleLogin}></Login>}></Route>
        <Route path="/register" element={ <Register></Register>}></Route>
        <Route path="/admin" element={ <AdminPage proizvodi={proizvodi}></AdminPage>} ></Route>
 
      </Routes>
     
     
  </BrowserRouter>
       
     
  );
}

export default App;
