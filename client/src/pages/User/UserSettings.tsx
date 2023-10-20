import Navbar from '../../components/Navbar/Navbar'

import React from 'react'

export default function UserSettings(props: any) {

    const [userInfo, setUserInfo] = React.useState({})


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
      };

    console.log(userInfo)
    console.log(props.stripeCustomerInfo)

    return (
        <>
            <Navbar stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} products={props.products} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} cartContents={props.cartContents} setCartContents={props.setCartContents}/>
            <h3>Settings</h3>
            <form className="vstack">
            <label htmlFor="name">Name:</label>
            <input placeholder={props.stripeCustomerInfo?.name} onChange={handleChange} name="name" id="name" />
            <label htmlFor="line1">Address Line 1:</label>
            <input placeholder={props.stripeCustomerInfo.address?.line1} onChange={handleChange} name="line1" id="line1" />
            <label htmlFor="line2">Address Line 2:</label>
            <input placeholder={props.stripeCustomerInfo?.address?.line2} onChange={handleChange} name="line2" id="line2" />
            <label htmlFor="city">City:</label>
            <input placeholder={props.stripeCustomerInfo?.address?.city} onChange={handleChange} name="city" id="city" />
            <label htmlFor="state">State:</label>
            <input placeholder={props.stripeCustomerInfo?.address?.state} onChange={handleChange} name="state" id="state" />
            <label htmlFor="postal_code">Zip Code:</label>
            <input placeholder={props.stripeCustomerInfo?.address?.postal_code} onChange={handleChange} name="postal_code" id="postal_code" />
            </form>

            <form action={`https://localhost:3000/updateCustomer?customerId=${props.stripeCustomerId}`} method="POST">
                <input type="hidden" name="userInfo" value={JSON.stringify(userInfo)} />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}