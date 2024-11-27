import { useState, useEffect, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct({ show, handleClose, onAddProduct }) {
    const navigate = useNavigate();
    
    const { user } = useContext(UserContext);

    // Input states
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (name !== '' && description !== '' && price !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [name, description, price]);

    function createProduct(e) {
        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Full response:', data);

                if (data.product) {
                    const message = `Product added successfully: ${data.product.name}`;
                    console.log('Message:', message);

                    Swal.fire({
                        icon: "success",
                        title: "Product Added",
                        text: message
                    });

                    onAddProduct(data.product);

                    navigate("/products");

                    handleClose();
                } else if (data.message === "Product already exists") {
                    Swal.fire({
                        icon: "error",
                        title: "Product already exists",
                        text: data.message
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Unsuccessful Product Creation",
                        text: data.message || "An error occurred"
                    });
                }
            })
            .catch(err => {
                console.error('Error:', err);
                Swal.fire({
                    icon: "error",
                    title: "An error occurred",
                    text: "Please try again later."
                });
            });

        setName("");
        setDescription("");
        setPrice("");
    }

    return (
        (user.isAdmin === true)
            ?
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createProduct}>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price:</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => setPrice(e.target.value)} />
                        </Form.Group>
                        {isActive ?
                            <Button variant="primary" type="submit" id="submitBtn" className='my-2'>
                                Submit
                            </Button>
                            :
                            <Button variant="danger" type="submit" id="submitBtn" className='my-2' disabled>
                                Submit
                            </Button>
                        }
                    </Form>
                </Modal.Body>
            </Modal>
            :
            null
    );
}
