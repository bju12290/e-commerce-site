import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import './CheckoutPreview.css'

export default function CheckoutPreview(props: any) {

  const { cartContents, setCartContents, cartTotal, setCartTotal } = props

  const stripeCustomerId = props.stripeCustomerId

  function increaseQty(index: number) {
    const updatedCartContents = [...cartContents]
    updatedCartContents[index].quantity++

    const newCartTotal = updatedCartContents.reduce((total, item) => {
        return total + (item.cost * item.quantity);
    }, 0);

    setCartContents(updatedCartContents)
    setCartTotal(newCartTotal)
    localStorage.setItem('cart', JSON.stringify(updatedCartContents))
}

function decreaseQty(index: number) {
    const updatedCartContents = [...cartContents]
    updatedCartContents[index].quantity--

    if (updatedCartContents[index].quantity <= 0) {
        updatedCartContents.splice(index, 1)
    }

    const newCartTotal = updatedCartContents.reduce((total, item) => {
        return total + (item.cost * item.quantity);
    }, 0);

    setCartTotal(newCartTotal)

    setCartContents(updatedCartContents)
    localStorage.setItem('cart', JSON.stringify(updatedCartContents))
}

const ButtonElement = () => {
    return (
      <>
        {cartContents.length > 0 ? (
          <form
            action={
              stripeCustomerId
                ? `https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/create-checkout-session?customerId=${stripeCustomerId}`
                : 'https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/create-checkout-session'
            }
            method="POST"
          >
            <input type="hidden" name="cartContents" value={JSON.stringify(cartContents)} />
            <button className="btn button-color" type="submit" id="checkout-button">
              Checkout
            </button>
          </form>
        ) : (
          <a href="/products">
            <button className="btn button-color" id="checkout-button">
              Back to Products
            </button>
          </a>
        )}
      </>
    );
  }

    return (
    <>
    <Navbar setStripeCustomerInfo={props.setStripeCustomerInfo} cartTotal={props.cartTotal} setCartTotal={props.setCartTotal} stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} cartContents={props.cartContents} setCartContents={props.setCartContents} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
      <div className="d-flex align-items-center flex-column navbar-margin checkout-container">
          <div className="container text-center w-50">
          {cartContents.map((item: any, index: number) => (
                <div className="row" key={index}>
                    <div className="col">
                        <p className="paragraph-color">{item.name} - {item.size} - {item.color}</p>
                        <img className="img-fluid" width="200" src={item.thumbnail_url} alt={item.name}/>
                    </div>
                    <div className="col m-auto">
                        <button className="btn button-color" onClick={(e) => {
                                                                e.preventDefault(); // Prevent the default button behavior
                                                                increaseQty(index);
                        }}>^</button>
                        <p className="paragraph-color mt-3 mb-3">{item.quantity}</p>
                        <button className="btn button-color" onClick={(e) => {
                                                                e.preventDefault(); // Prevent the default button behavior
                                                                decreaseQty(index);
                        }}>v</button>
                    </div>
                </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center justify-items-center text-center">
        <p className="m-5">Total: ${cartTotal.toFixed(2)}</p>
        <ButtonElement />
        </div>
        <Footer />
    </>
    )
}


