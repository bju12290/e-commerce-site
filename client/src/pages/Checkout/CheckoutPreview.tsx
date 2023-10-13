import Navbar from '../../components/Navbar/Navbar'

export default function CheckoutPreview(props: any) {

  const cartContents = props.cartContents

  const stripeCustomerId = props.stripeCustomerId
  console.log(stripeCustomerId)

  function increaseQty(index: number) {
    const updatedCartContents = [...cartContents]
    updatedCartContents[index].quantity++
    props.setCartContents(updatedCartContents)
    localStorage.setItem('cart', JSON.stringify(updatedCartContents));
}

function decreaseQty(index: number) {
    const updatedCartContents = [...cartContents]
    updatedCartContents[index].quantity--

    if (updatedCartContents[index].quantity <= 0) {
        // Remove the item if quantity reaches 0
        updatedCartContents.splice(index, 1);
    }

    props.setCartContents(updatedCartContents)
    localStorage.setItem('cart', JSON.stringify(updatedCartContents));
}

    return (
    <>
    <Navbar stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} cartContents={props.cartContents} setCartContents={props.setCartContents} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
      <div className="product">
          <div className="description">
          {cartContents.map((item: any, index: number) => (
                <div key={index}>
                    <p>{item.name} - {item.size} - {item.color}</p>
                                <img width="50px" src={item.thumbnail_url} alt={item.name}/>
                                <button onClick={(e) => {
                                                e.preventDefault(); // Prevent the default button behavior
                                                increaseQty(index);
                                }}>^</button>
                                <p>{item.quantity}</p>
                                <button onClick={(e) => {
                                                e.preventDefault(); // Prevent the default button behavior
                                                decreaseQty(index);
                                }}>v</button>
                </div>
            ))}
          </div>
        </div>
        <form action={stripeCustomerId ? `https://localhost:3000/create-checkout-session?customerId=${stripeCustomerId}` : 'https://localhost:3000/create-checkout-session'} method="POST">
          <input type="hidden" name="cartContents" value={JSON.stringify(cartContents)} />
          <button type="submit" id="checkout-button">Checkout</button>
        </form>
    </>
    )
}


