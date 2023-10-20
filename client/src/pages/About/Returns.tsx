import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

export default function Returns(props: any) {
    return(
        <>
        <Navbar 
            stripeCustomerId={props.stripeCustomerId} 
            setStripeCustomerId={props.setStripeCustomerId}
            cartContents={props.cartContents} 
            setCartContents={props.setCartContents} 
            loggedIn={props.loggedIn} 
            setLoggedIn={props.setLoggedIn}
        />
        </>
    )
}