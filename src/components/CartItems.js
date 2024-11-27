import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token'); // Assume the token is stored in localStorage

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        if (data.cart && data.cart.length > 0) {
          setCartItems(data.cart[0].cartItems);
        } else {
          setMessage('No items in the cart');
        }
      } else {
        setMessage(`Error: ${data.message}`);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Cart Items</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.productId}</td>
              <td>{item.quantity}</td>
              <td>${item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
