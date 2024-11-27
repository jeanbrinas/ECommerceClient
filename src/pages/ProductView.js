import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {

	const navigate = useNavigate();

	// Allows us to retrieve the productId passed via the URL
	const { productId } = useParams();

	const { user } = useContext(UserContext);

	// States
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
			.then(res => res.json())
			.then(data => {
				if (data.product) {
					console.log(data.product);

					setName(data.product.name);
					setDescription(data.product.description);
					setPrice(data.product.price);
				} else {
					// Handle the case where the product is not found
					console.error("Product not found");
				}
			})
			.catch(err => console.error(err));
	}, [productId]);

	const addToCart = (productId) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productId,
				quantity: 1,
				subtotal: price
			})
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);

				if (data.message === "Admin is forbidden") {
					Swal.fire({
						title: "Admin checkout error",
						icon: "error",
						text: "You are an administrator. You cannot add products to the cart."
					});
				} else if (data.message === "Item added to cart successfully") {
					Swal.fire({
						title: "Successfully added to cart",
						icon: "success",
						text: "The product has been added to your cart."
					});
					
					navigate("/products"); 

				} else {
					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please try again."
					});
				}
			})
			.catch(err => console.error(err));
	};

	return (
		<Container className="mt-5">
			<Row>
				<Col>
					<Card>
						<Card.Body className="text-center p-0">
							<Card.Title className="bg-primary text-white text-center card-header">{name}</Card.Title>
							<div className="p-3">
								<Card.Subtitle>Description:</Card.Subtitle>
								<Card.Text>{description}</Card.Text>
								<Card.Subtitle>Price:</Card.Subtitle>
								<Card.Text>{price}</Card.Text>

								{user.id !== null
									? 
										user.isAdmin 
							        	?
							        	<Navigate to="/products" />
							        	:
										<Button variant="primary" onClick={() => addToCart(productId)}>Add to cart</Button>
									: 
									<Link className="btn btn-danger" to="/login">Log in to Add to Cart</Link>

								}	
							</div>
							
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
