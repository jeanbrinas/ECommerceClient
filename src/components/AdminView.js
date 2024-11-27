import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditProduct from './EditProduct';
import AddProductModal from './AddProduct'; 
import ArchiveProduct from './ArchiveProduct';
import OrderHistory from './OrderHistory';

export default function AdminView({ productsData, fetchData }) {

    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showOrderHistory, setShowOrderHistory] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const toggleOrderHistory = () => setShowOrderHistory(!showOrderHistory);

    useEffect(() => {
        if (productsData && productsData.products) {
            const productsArr = productsData.products.map(product => {
                return (
                    <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td className={product.isActive ? "text-success" : "text-danger"}>
                            {product.isActive ? "Available" : "Unavailable"}
                        </td>
                        <td>
                            <EditProduct product={product._id} fetchData={fetchData}/> 
                            <ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/>
                        </td> 
                    </tr>
                );
            });

            setProducts(productsArr);
        }
    }, [productsData, fetchData]);

    const handleAddProduct = (newProduct) => {
        setProducts(prevProducts => [
            ...prevProducts,
            <tr key={newProduct._id}>
                <td>{newProduct.name}</td>
                <td>{newProduct.description}</td>
                <td>{newProduct.price}</td>
                <td className={newProduct.isActive ? "text-success" : "text-danger"}>
                    {newProduct.isActive ? "Available" : "Unavailable"}
                </td>
                <td>
                    <EditProduct product={newProduct._id} fetchData={fetchData}/> 
                    <ArchiveProduct product={newProduct._id} isActive={newProduct.isActive} fetchData={fetchData}/>
                </td> 
            </tr>
        ]);
    };

    return (
        <>
          <h1 className="text-center my-4">Dashboard</h1>
          <div className="text-center">
            <Button variant="primary" onClick={handleShow} className="mb-4 mx-1">
              Add Product
            </Button>
            <Button variant="dark" onClick={toggleOrderHistory} className="mb-4 mx-1">
              {showOrderHistory ? "Show Products" : "Show User Orders"}
            </Button>
          </div>

          <AddProductModal show={showModal} handleClose={handleClose} onAddProduct={handleAddProduct} />

          {showOrderHistory ? (
            <OrderHistory isAdmin={true} />
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr className="text-center">
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Availability</th>
                  <th colSpan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products}
              </tbody>
            </Table>
          )}
        </>
      );
}
