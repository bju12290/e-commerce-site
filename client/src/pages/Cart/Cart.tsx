import CartDropdown from '../../components/CartDropdown/CartDropdown'

export default function Cart(props: any) {
    const cartContents = props.cartContents
    const setCartContents = props.setCartContents

    return (
        <CartDropdown cartContents={cartContents} setCartContents={setCartContents}/>
        <Link to={}>Checkout</Link>
    )
}