import './CartDropdown.css'
import { useNavigate } from 'react-router-dom';

export default function CartDropdown(props: any) {

    const { cartContents, setCartContents } = props

    function increaseQty(index: number) {
        const updatedCartContents = [...cartContents]
        updatedCartContents[index].quantity++
        setCartContents(updatedCartContents)
        localStorage.setItem('cart', JSON.stringify(updatedCartContents));
    }

    function decreaseQty(index: number) {
        const updatedCartContents = [...cartContents]
        updatedCartContents[index].quantity--

        if (updatedCartContents[index].quantity <= 0) {
            updatedCartContents.splice(index, 1);
        }

        setCartContents(updatedCartContents)
        localStorage.setItem('cart', JSON.stringify(updatedCartContents));
    }

    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout', { state: { cartContents } });
    }

    return (
       <>
                        {cartContents.map((item: any, index: number) => {
                            return (
                            <div key={item.name}>
                                <p>{item.name + " - " + item.size + " - " + item.color}</p>
                                <img width="50px" src={item.thumbnail_url} alt={item.name}/>
                                <button onClick={(e) => {
                                                e.preventDefault()
                                                increaseQty(index)
                                                e.stopPropagation()
                                }}>^</button>
                                <p>{item.quantity}</p>
                                <button onClick={(e) => {
                                                e.preventDefault()
                                                decreaseQty(index)
                                                e.stopPropagation()
                                }}>v</button>
                            </div>
                            )
                        })}
                        {/* Pass in price from stripe to cartContents, calculate total based off of quantity */}
                        <p>Total: $x.xx</p>
                        <button onClick={handleCheckout}>Checkout</button>
    </>
    )
}