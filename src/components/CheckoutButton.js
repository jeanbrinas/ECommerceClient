import React from 'react';
import { useHistory } from 'react-router-dom';
import OrderHistory from './OrderHistory'; 

const CheckoutButton = ({ token, fetchData }) => {
  const history = useHistory();

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Assuming the API returns a success response
        const result = await response.json();
        console.log('Order successfully created:', result);

        // Redirect to the Order History page
        history.push('/order-history');
      } else {
        // Handle the error
        console.error('Checkout failed:', response.statusText);

        // Redirect to the homepage if checkout fails
        history.push('/');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      
      // Redirect to the homepage in case of error
      history.push('/');
    }
  };

  return (
    <OrderHistory fetchData={fetchData} />
  );
};

export default CheckoutButton;
