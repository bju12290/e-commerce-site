import './CartDropdown.css'
import { useNavigate } from 'react-router-dom'

export default function CartDropdown(props: any) {

    const { cartContents, setCartContents, cartTotal, setCartTotal } = props

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

    const navigate = useNavigate()

    const handleCheckout = () => {
        navigate('/checkout', { state: { cartContents } })
    }

    return (
       <>
                        {cartContents.map((item: any, index: number) => {
                            const string = item.size + " - " + item.color + " - " + item.name
                            const trimmedString = string.substring(0 , 25)
                            return (
                            <div className="cart-text-color row" key={item.name}>
                                <div className="col">
                                    <p>{trimmedString}...</p>
                                    <img width="50px" src={item.thumbnail_url} alt={item.name}/>
                                </div>
                                <div className="col m-auto">
                                    <button className="btn button-color btn-sm" onClick={(e) => {
                                                    e.preventDefault()
                                                    increaseQty(index)
                                                    e.stopPropagation()
                                    }}>^</button>
                                    <p className="m-auto">{item.quantity}</p>
                                    <button className="btn button-color btn-sm" onClick={(e) => {
                                                    e.preventDefault()
                                                    decreaseQty(index)
                                                    e.stopPropagation()
                                    }}>v</button>
                                </div>
                            </div>
                            )
                        })}
                        <p>${cartTotal?.toFixed(2)}</p>
                        <button className="btn button-color" onClick={handleCheckout}>Checkout</button>
    </>
    )
}