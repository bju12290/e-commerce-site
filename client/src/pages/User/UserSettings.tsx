import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

import React from 'react'
import axios from 'axios'

import './UserSettings.css'

interface PopupState {
    message: string;
    type: string | null;
  }

export default function UserSettings(props: any) {

    const [userInfo, setUserInfo] = React.useState({})
    const [popup, setPopup] = React.useState<PopupState | null>(null)

    const showMessage = (message: string, type: string | null) => {
        setPopup({ message, type })

        setTimeout(() => {
            setPopup(null)
        }, 5000)
    }

    const PopupElement = () => {
        if (popup?.message) {
            return (
            <div className={popup.type === "success" ? "success--popup" : "error--popup"}>{popup.message}</div>
            )
        }
        return
    }


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission
        props.setUpdateTrigger(props.updateTrigger + 1)

    
        try {
            const response = await axios.post(`https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/updateCustomer?customerId=${props.stripeCustomerId}`, {
                userInfo: JSON.stringify(userInfo)
            });
    
            if (response.status === 200) {
                setTimeout(() => {showMessage("Information Updated!", "success")}, 100)
            } else {
                setTimeout(() => {showMessage("An error occured! Please try again!", "error")}, 100)
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
        setTimeout(() => {window.location.reload()}, 1000)
    };


    return (
        <>
            <Navbar setStripeCustomerInfo={props.setStripeCustomerInfo} cartTotal={props.cartTotal} setCartTotal={props.setCartTotal} stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} products={props.products} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} cartContents={props.cartContents} setCartContents={props.setCartContents}/>
            <div className="container navbar-margin">
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

            <form onSubmit={handleSubmit}>
                <input type="hidden" name="userInfo" value={JSON.stringify(userInfo)} />
                <div className="text-center mt-5">
                    <button className="btn button-color w-25" type="submit">Submit</button>
                </div>
                <PopupElement/>
            </form>
            </div>
            <Footer/>
        </>
    )
}