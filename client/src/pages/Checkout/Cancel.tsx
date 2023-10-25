import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

import './Cancel.css'

export default function Cancel(props: any) {
    return (
        <div>
          <Navbar cartTotal={props.cartTotal} setCartTotal={props.setCartTotal} stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} cartContents={props.cartContents} setCartContents={props.setCartContents} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
          <div className="cancel-container navbar-margin container d-flex flex-column align-items-center text-center">
            <p className="header-color h3">Forgot to add something to your cart?</p>
            <p className="paragraph-color">Shop around then come back to pay!</p>
            <a href="/products"><button className="btn button-color">Back to Products</button></a>
          </div>
          <Footer />
        </div>
    )
}