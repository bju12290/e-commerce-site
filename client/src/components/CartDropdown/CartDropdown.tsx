import './CartDropdown.css'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function CartDropdown(props: any) {
    const cartContents = props.cartContents
    const setCartContents = props.setCartContents

    console.log(cartContents)

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
            // Remove the item if quantity reaches 0
            updatedCartContents.splice(index, 1);
        }

        setCartContents(updatedCartContents)
        localStorage.setItem('cart', JSON.stringify(updatedCartContents));
    }

    const navigate = useNavigate();

    const handleCheckout = () => {
        // Navigate to checkoutPreview page with cartContents data
        navigate('/checkout', { state: { cartContents } });
    }

    return (
       <>
                        {cartContents.map((item: any, index: number) => {
                            return (
                            <>
                                <p>{item.name + " - " + item.size + " - " + item.color}</p>
                                <img width="50px" src={item.thumbnail_url} alt={item.name}/>
                                <button onClick={(e) => {
                                                e.preventDefault(); // Prevent the default button behavior
                                                increaseQty(index);
                                                e.stopPropagation();
                                }}>^</button>
                                <p>{item.quantity}</p>
                                <button onClick={(e) => {
                                                e.preventDefault(); // Prevent the default button behavior
                                                decreaseQty(index);
                                                e.stopPropagation();
                                }}>v</button>
                            </>
                            )
                        })}
                        {/* Pass in price from stripe to cartContents, calculate total based off of quantity */}
                        <p>Total: $x.xx</p>
                        <button onClick={handleCheckout}>Checkout</button>
    </>
    )
}