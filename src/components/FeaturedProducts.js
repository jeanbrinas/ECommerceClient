import { CardGroup } from 'react-bootstrap';
import PreviewProducts from "./PreviewProducts";
import { useEffect, useState } from 'react';

export default function FeaturedProducts() {

    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                
                const products = data.products;
                const numbers = [];
                const featured = [];

                const generateRandomNums = () => {
                    let randomNum = Math.floor(Math.random() * products.length);
                    if (numbers.indexOf(randomNum) === -1) {
                        numbers.push(randomNum);
                    } else {
                        generateRandomNums();
                    }
                }

                for (let i = 0; i < 5; i++) {
                    generateRandomNums();
                    console.log(numbers);

                    featured.push(
                        <PreviewProducts data={products[numbers[i]]} key={products[numbers[i]]._id} />
                    )
                }

                setPreviews(featured);
            })
    }, [])

    return (
        <>
            <h2 className="text-center my-4">Featured Products</h2>

            <CardGroup className="justify-content-center">
                {previews}
            </CardGroup>
        </>
    )
}
