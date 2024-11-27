import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
	
	const data = {
       title: "The Virtual Vault",
       content: "Products for everyone, everywhere",
       destination: "/products",
       label: "Browse Products"
   }

   return (
       <>
           <Banner data={data}/>
           <FeaturedProducts />
       </>
   )
}