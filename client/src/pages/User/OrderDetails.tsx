import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

import './OrderDetails.css'

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
            fetch(`https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/getOrderDetails?orderId=${orderId}`, {
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

    

    const date = new Date(orderDetails?.lineItems.data[0].price.created * 1000)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const dateStr = day + "/" + month + "/" + year;

    return (
        <>
        <Navbar setStripeCustomerInfo={props.setStripeCustomerInfo} cartTotal={props.cartTotal} setCartTotal={props.setCartTotal} stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} products={props.products} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} cartContents={props.cartContents} setCartContents={props.setCartContents}/>
        <div className="navbar-margin container">
            <p><span className="order-details-emphasis-color">Order Placed: </span>{dateStr}</p>
            <hr/>
        {lineItems.map((item: any) => {
        
        return (
            <div key={item.id} className="paragraph-color container">
                <p className="order-details-emphasis-color">{item.description}</p>
                <p><span className="order-details-emphasis-color">Price:</span> {makeDollars(item.amount_subtotal)}</p>
                <p><span className="order-details-emphasis-color">Quantity:</span> {item.quantity}</p>
            </div>
        )})}
        <hr/>
        <div className="paragraph-color">
            <p><span className="order-details-emphasis-color">Status:</span> Processing</p>
            <p><span className="order-details-emphasis-color">Order Total:</span> {formattedSubtotal}</p>
        </div>
        </div>
        <Footer />
        </>
        )
}