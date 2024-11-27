import { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import ResetPassword from '../components/ResetPassword';
import UpdateProfile from '../components/UpdateProfile';


export default function Profile(){

    const { user } = useContext(UserContext);

    const [details, setDetails] = useState({})

    const token = localStorage.getItem('token'); // Replace with your actual JWT token

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            // Set the user states values with the user details upon successful login.
            if (data && data.user) {
                setDetails({
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    email: data.user.email,
                    mobileNo: data.user.mobileNo
                });
            } 
            else if (data.error === "User not found") {

                Swal.fire({
                    title: "User not found",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                });

            } else {

                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                });

            }
        });

    },[])

    return (

        (user.id === null) 
        ?
        <Navigate to="/products" />
        :
        <>
            <Row>
                <Col className="p-5 bg-primary text-white">
                    <h1 className="my-5 ">Profile</h1>
                    <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
                    <hr />
                    <h4>Contacts</h4>
                    <ul>
                        <li>Email: {details.email}</li>
                        <li>Mobile No: {details.mobileNo}</li>
                    </ul>
                </Col>
            </Row>
            <Row className="p-4 m-4">
                <Col>
                    <ResetPassword />
                </Col>
            </Row>
            {/*<Row className='p-4 m-4'>
                <Col>
                    <UpdateProfile />
                </Col>
            </Row>*/}
        </>
    )

}