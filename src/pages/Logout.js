import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {

	const { unsetUser, setUser } = useContext(UserContext);

	unsetUser();

	useEffect(() => {
		// Sets the user state back to its original value
		setUser({
			id: null,
			isAdmin: null
		})
	}, [])

	return(
		// Navigate back to the login
		<Navigate to="/login" />
	)
}