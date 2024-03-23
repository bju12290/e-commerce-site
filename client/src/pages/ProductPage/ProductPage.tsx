import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ProductDetails from '../../components/ProductDetails/ProductDetails'
import './ProductPage.css'


export default function ProductPage(props: any) {

    const { productId } = useParams();

    return (
        <>
            <Navbar setStripeCustomerInfo={props.setStripeCustomerInfo} cartTotal={props.cartTotal} setCartTotal={props.setCartTotal} stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} cartContents={props.cartContents} setCartContents={props.setCartContents} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
            <div className="product-container">
                <ProductDetails cartTotal={props.cartTotal} setCartTotal={props.setCartTotal} products={props.products} cartContents={props.cartContents} setCartContents={props.setCartContents} productDetails={props.productDetails} setProductDetails={props.setProductDetails} productId={productId} setProductId={props.setProductId}/>
            </div>
            <Footer />
        </>
    )
}