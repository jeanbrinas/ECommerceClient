import { useState, useEffect } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
// import Banner from './components/Banner';
// import Highlights from './components/Highlights';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import OrderHistory from './components/OrderHistory';
import Error from './pages/Error';
import { UserProvider } from './UserContext';

function App() {

  // Global user state
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })
  
  useEffect(() => {
    // console.log(user)
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.user.hasOwnProperty("_id")) {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        })
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }

    })

  }, []);

  // Function for clearing the localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
      </UserProvider>
  );
}

export default App;
