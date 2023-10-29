import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

export default function Success(props: any) {
    return (
    <div>
      <Navbar setStripeCustomerInfo={props.setStripeCustomerInfo} cartTotal={props.cartTotal} setCartTotal={props.setCartTotal} stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} cartContents={props.cartContents} setCartContents={props.setCartContents} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
      <div className="cancel-container navbar-margin container d-flex flex-column align-items-center text-center">
            <p className="header-color h3">Thank you for your order! We appreciate your business!</p>
            <p className="paragraph-color">If you have any questions, please email
              <a href="mailto:orders@example.com"> support@website.com</a>.</p>
            {props.loggedIn? <a href="/products"><button className="btn button-color">Order History</button></a> : <a href="/"><button className="btn button-color">Back to Home</button></a>}
          </div>
      <Footer />
    </div>
    )
}