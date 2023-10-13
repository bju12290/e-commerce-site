import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import ProductDetails from '../../components/ProductDetails/ProductDetails'


export default function ProductPage(props: any) {

    const { productId } = useParams();

    return (
        <>
            <Navbar stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} cartContents={props.cartContents} setCartContents={props.setCartContents} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
            <ProductDetails products={props.products} cartContents={props.cartContents} setCartContents={props.setCartContents} productDetails={props.productDetails} setProductDetails={props.setProductDetails} productId={productId} setProductId={props.setProductId}/>
        </>
    )
}