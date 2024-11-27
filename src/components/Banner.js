import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import myLogo from '../assets/logo.png';

export default function Banner({data}) {

	const {title, content, destination, label} = data;

	return (
		<Row>
			<Col className="p-5 text-center">

				<div className="text-center">
					<img src={myLogo} alt="Description" className="logo"/>
				</div>
				
				<h1>{title}</h1>
                <p><i>{content}</i></p>
                <Link className="btn btn-primary" to={destination}>{label}</Link>
			</Col>
		</Row>
	)
}