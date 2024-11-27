import { useEffect, useState, useContext } from 'react';
// import productsData from '../data/productsData';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products(){

	const { user } = useContext(UserContext);

	// console.log(productsData);
	// State that will be used to store the products retrieved from the db
	const [ products, setProducts ] = useState([])

	const fetchData = () => {
		// Allows to have a dynamic url depending whether the user that's logged in is an admin or not
        let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_BASE_URL}/products/all` : `${process.env.REACT_APP_API_BASE_URL}/products/active`

		// retrieves all active products
		fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            }	
        })
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(typeof data.message !== "string") {

				setProducts(data)
			} else {
				setProducts([])
			}
		})
	}

	useEffect(() => {

		fetchData();

	}, [])

	return (
		<>
            {
                (user.isAdmin === true) ?
                    <AdminView productsData={products} fetchData={fetchData}/>
                    :
                    <UserView productsData={products} />
            }
        </>
	)
}