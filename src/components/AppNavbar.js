import { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {

	const { user } = useContext(UserContext);
	// console.log(user)
	
	return (
		<Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
		    <Container>
		        <Navbar.Brand as={Link} to="/">The <b>Virtual</b> Vault</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						
						{(user.id !== null)
							?
								user.isAdmin 
					        	?
					        	<>
					        		
					        		<Nav.Link as={NavLink} to="/products">Admin Dashboard</Nav.Link>
					        		<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
					        	</>
					        	:
								<>
									<Nav.Link as={NavLink} to="/products">Products</Nav.Link>
									<Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
									<Nav.Link as={NavLink} to="/order-history">Orders</Nav.Link>
									<Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
									<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
								</>
							:
							<>
								<Nav.Link as={NavLink} to="/products">Products</Nav.Link>
								<Nav.Link as={NavLink} to="/login">Login</Nav.Link>		
								<Nav.Link as={NavLink} to="/register">Register</Nav.Link>
							</>
						}
					</Nav>
		        </Navbar.Collapse>
		    </Container>
		</Navbar>
	)
}