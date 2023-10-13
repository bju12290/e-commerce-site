import Navbar from '../../components/Navbar/Navbar'
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid'


export default function Home(props: any) {
    return (
        <>
            <Navbar stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} cartContents={props.cartContents} setCartContents={props.setCartContents} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
            <div>home</div>
        </>
    )
}