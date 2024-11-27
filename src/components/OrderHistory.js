import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const OrderHistory = ({ isAdmin, fetchData }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const endpoint = isAdmin ? '/orders/all-orders' : '/orders/my-orders';
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders);
          if (fetchData) fetchData();
        } else {
          setError(data.message || 'Failed to fetch orders');
        }
      } catch (error) {
        setError('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, [isAdmin, fetchData, token]);

  return (
    <div className="container mt-5">
      <h2>{isAdmin ? 'All Orders' : 'Your Order History'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Products Ordered</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>{new Date(order.orderedOn).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>${(order.totalPrice / 100).toFixed(2)}</td>
              <td>
                <ul>
                  {order.productsOrdered.map((product) => (
                    <li key={product._id}>
                      Product ID: {product.productId}, Quantity: {product.quantity}, Subtotal: ${(product.subtotal / 100).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderHistory;
