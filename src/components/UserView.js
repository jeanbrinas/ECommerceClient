import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import ProductSearch from './ProductSearch';
import PreviewProducts from './PreviewProducts';
// import FeaturedProducts from './FeaturedProducts';


export default function UserView({productsData, fetchData}) {

    const [ products, setProducts ] = useState([]);

    useEffect(() => {

        if (productsData && productsData.products) {
        const productsArr = productsData.products.map(product => {

            if(product.isActive === true) {
                return (
                    <PreviewProducts data={product} key={product._id}/>
                    )
            } else {
                return null;
            }
        })

        //set the products state to the result of our map function, to bring our returned product component outside of the scope of our useEffect where our return statement below can see.
        setProducts(productsArr);
        }

    }, [productsData, fetchData])

    return(
        <>  
            <ProductSearch />
            <hr />
            <h1 className="my-5 text-center">Our Products</h1>

            <CardGroup className="justify-content-center">
                { products }
            </CardGroup>
        </>
        )
}

