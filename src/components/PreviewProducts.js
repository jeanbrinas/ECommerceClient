import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PreviewProducts(props) {

	console.log(props);
	const { data } = props;

	const { _id, name, description, price } = data;

	return (
		<Col xs={12} md={4} className="my-2">
			<Card className="cardHighlight mx-2">
				<Card.Body>
					<Card.Title className="text-center">{data.name}</Card.Title>
					<Card.Text>{description}</Card.Text>
				</Card.Body>
				<Card.Footer>
					<h5 className="text-center">{price}</h5>
					<Link className="btn btn-primary d-block" to={`/products/${_id}`}>Details</Link>
				</Card.Footer>
			</Card>
		</Col>
	)
}