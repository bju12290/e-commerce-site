import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'
import React from 'react'
import './Dashboard.css'

export default function Dashboard(props: any) {

    const stripeCustomerId = props.stripeCustomerId
    const setStripeCustomerId = props.setStripeCustomerId
    const stripeCustomerInfo = props.stripeCustomerInfo

    console.log(stripeCustomerInfo)

    const [orderHistory, setOrderHistory] = React.useState<any[]>([])

    React.useEffect(() => {
        if (stripeCustomerId) { 
            fetch(`https://localhost:3000/getOrderHistory?customerId=${stripeCustomerId}`, {
            method: 'POST', // Change the method to POST
            body: JSON.stringify({ customerId: stripeCustomerId }),
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setOrderHistory(data.paymentIntents.data)
            })
            .catch(error => {
                console.error(error)
            });
        }
        
    }, [stripeCustomerId]);

    console.log(orderHistory)

    const OrderHistoryElements = () => {
        return (
            <div>
                {orderHistory.map((order) => {
                    const orderId = order.id
                    const priceString = order.amount_total.toString();
                    const dollarsInPrice = priceString.slice(0, priceString.length - 2);
                    const centsInPrice = priceString.slice(priceString.length - 2);
                    const orderPrice = `$${dollarsInPrice}.${centsInPrice}`;

                    const sizes = order.metadata.order_size
                    const colors = order.metadata.product_variant
                    let firstSize
                    let firstColor
                    if (sizes && colors) {
                        const splitSizes = sizes.split(/-/)
                        const splitColors = colors.split(/-/)

                        firstSize=splitSizes[1]
                        firstColor=splitColors[1]
                    }

                    console.log(firstSize)
    
                    return (
                        <Link to={"/order/" + orderId}>
                        <div className="container">
                            <div className="row justify-content-between" key={order.created}>
                                <div className="col-3">
                                    <h5>{`Order #: ${order.metadata.order_number}`}</h5>
                                    <h5>{orderPrice}</h5>
                                </div>
                                <div className="col-8">
                                    <h5 className="">{order.metadata.product_title} - {firstSize} - {firstColor}</h5>
                                    <img className="img-thumbnail thumbnail-max" src={`${order.metadata.thumbnail}`}></img>
                                </div>
                            </div>
                        </div>
                        </Link>
                    );
                })}
            </div>
        );
    }

    let customerName = "No name on file, edit your settings here!"
    let customerAddress: any = "No address on file, edit your settings here!"

    if (stripeCustomerInfo.name) {
        customerName = stripeCustomerInfo.name
    }

    if (stripeCustomerInfo.address) {
        customerAddress = stripeCustomerInfo.address
    }

    if (props.loggedIn) {
        return (
            <>
            
                <Navbar stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} products={props.products} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} cartContents={props.cartContents} setCartContents={props.setCartContents}/>
                <div className="container mt-5">
                    <div className="row justify-content-between">
                        <div className="col-8">
                    <OrderHistoryElements />
                        </div>
                        <div className="col-4 mt-5">
                    <h4>Name</h4>
                    <p>{customerName}</p> 

                    <h4>Address</h4>
                    <address>
                        {`${customerAddress.line1}`} <br/>
                        {`${customerAddress.line2 ? customerAddress.line2 (<br/>) : ""}`}
                        {`${customerAddress.city}, ${customerAddress.state}`} <br/>
                        {`${customerAddress.postal_code}`}
                    </address>
                    <Link to={"/userSettings"}>
                    <button className="btn btn-dark">Update Info</button>
                    </Link>
                    </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
        <>
            <Navbar stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} products={props.products} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} cartContents={props.cartContents} setCartContents={props.setCartContents}/>
            <p>Log In First</p>
        </>
        )
    }
    
}