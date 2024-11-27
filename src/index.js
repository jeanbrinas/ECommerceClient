import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const name = "John Smith";
// const user = {
//   firstName: 'Jane',
//   lastName: 'Smith'
// }

// function formatName(user) {
//   return user.firstName + ' ' + user.lastName;
// }

// const element = <h1>Hello, {formatName(user)}</h1>

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(element)