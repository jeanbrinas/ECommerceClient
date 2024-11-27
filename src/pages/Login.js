import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {

    // Allows us to consume the User context and its properties to use for user validation
    const { user, setUser } = useContext(UserContext);

    // State hooks to store the values of the input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [email, password]);


    function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {

            console.log(data)

            if(typeof data.access !== "undefined") {

                // Set the token of the authenticated user in the local storage
                // Syntax: localStorage.setItem('propertyName', value);
                localStorage.setItem('token', data.access);

                // setUser({access: localStorage.getItem('token')})

                retrieveUserDetails(data.access)

                Swal.fire({
                    title: "Login Successful", 
                    icon: "success",
                    text: "Welcome to The Virtual Vault!"
                })
            
            } else if (data.message === "No email found") {

                Swal.fire({
                    title: "No email found", 
                    icon: "error",
                    text: "Email does not exist"
                })

            } else {

                Swal.fire({
                    title: "Authentication failed", 
                    icon: "error",
                    text: "Check your login details and try again."
                })
            }
        })
        // Clear input fields after submission
        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            })
        })
    }

    return (
            
            (user.id !== null)
            ?
                user.isAdmin 
                ?
                <Navigate to="/products" />
                :
            <Navigate to="/" />
            :
            <Form onSubmit={(e) => authenticate(e)}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                { isActive ? 
                    <Button variant="primary" type="submit" id="submitBtn" className="my-3">
                        Submit
                    </Button>
                    : 
                    <Button variant="danger" type="submit" id="submitBtn" className="my-3" disabled>
                        Submit
                    </Button>
                }
            </Form>       
    )
}