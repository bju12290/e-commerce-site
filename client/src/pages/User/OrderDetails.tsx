import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'

export default function OrderDetails(props: any) {

    const [orderDetails, setOrderDetails] = React.useState<any>()

    const { orderId } = useParams();

    function makeDollars(amount: number) {
        const amountString = amount.toString()
        const dollarAmount = amountString.slice(0, amountString.length - 2);
        const centAmount = amountString.slice(amountString.length - 2);
        return `$${dollarAmount}.${centAmount}`;
    }

    React.useEffect(() => {
        if (orderId) { 
            fetch(`https://localhost:3000/getOrderDetails?orderId=${orderId}`, {
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setOrderDetails(data)
            })
            .catch(error => {
                console.error(error)
            });
        }
        
    }, [orderId]);

    const lineItems = orderDetails?.lineItems.data || [];

    const subtotal = lineItems.reduce((total: any, item: any) => total + item.amount_subtotal, 0);
    const formattedSubtotal = makeDollars(subtotal)

    
    console.log(orderDetails)

    return (
        <>
        <Navbar stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} products={props.products} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} cartContents={props.cartContents} setCartContents={props.setCartContents}/>
        {lineItems.map((item: any) => {
        
        return (
            <div key={item.id} className="col-md-4">
                <p>{item.description}</p>
                <img src="" />
                <p>Price: {makeDollars(item.amount_subtotal)}</p>
            </div>
        )})}
        <p>Status: Processing</p>
        <p>Order Total: {formattedSubtotal}</p>
        </>
        )
}