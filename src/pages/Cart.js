import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCartItems(data.cart[0].cartItems);
      setTotalPrice(data.cart[0].totalPrice);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      // Update the cartItems state immediately
      const updatedCartItems = cartItems.map(item =>
        item.productId === productId ? { ...item, quantity, subtotal: (item.subtotal / item.quantity) * quantity } : item
      );
      setCartItems(updatedCartItems);

      // Calculate the new total price
      const newTotalPrice = updatedCartItems.reduce((total, item) => total + item.subtotal, 0);
      setTotalPrice(newTotalPrice);

      // Send the update to the server
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId, quantity, subtotal: quantity * (cartItems.find(item => item.productId === productId).subtotal / cartItems.find(item => item.productId === productId).quantity) })
      });
      const data = await response.json();
      setCartItems(data.cart[0].cartItems);
      setTotalPrice(data.cart[0].totalPrice);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCartItems(data.updatedCart.cartItems);
      setTotalPrice(data.updatedCart.totalPrice);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCartItems(data.updatedCart.cartItems);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const checkout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        // Clear the cart after successful checkout
        clearCart();
        navigate('/order-history');
      } else {
        console.error('Error during checkout');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Shopping Cart</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item._id}>
              <td>{item.productId}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                  className="form-control"
                />
              </td>
              <td>${(item.subtotal / item.quantity).toFixed(2)}</td>
              <td>${item.subtotal.toFixed(2)}</td>
              <td>
                <button className="btn btn-danger" onClick={() => removeItem(item.productId)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
      <button className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
      <button className="btn btn-primary mx-2" onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Cart;
