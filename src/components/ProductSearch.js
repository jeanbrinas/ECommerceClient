import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PreviewProducts from './PreviewProducts'; 

const ProductSearch = () => { 

  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchByName = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/search-by-name`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: searchQuery }) 
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for products:', error); 
    }
  };

  const handleSearchByPrice = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/search-by-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          minPrice: minPrice,
          maxPrice: maxPrice
         })
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(100000);
    setSearchResults([]);
  };

  return (
    <div className="container mt-4">
      <h2>Product Search</h2> 
      <div className="form-group mb-3">
        <label htmlFor="productName">Product Name:</label> 
        <input
          type="text"
          id="productName"
          className="form-control"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="minPrice" className="form-label">Minimum Price</label>
        <input
          type="number"
          className="form-control"
          id="minPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="maxPrice" className="form-label">Maximum Price</label>
        <input
          type="number"
          className="form-control"
          id="maxPrice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div className="d-flex">
        <button className="btn btn-primary me-2" onClick={handleSearchByName} >
          Search by Name
        </button>
        <button className="btn btn-primary me-2" onClick={handleSearchByPrice}>
          Search by Price
        </button>
        <button className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </div>
      
      <div>
      <h5 className="mt-4">Search Results:</h5>
        {searchResults.map(product => (
          <div key={product.id}>
            <PreviewProducts data={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
