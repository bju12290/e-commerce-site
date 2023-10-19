import React from 'react'
import Login from '../LogIn/Login'
import AccountDropdown from '../AccountDropdown/AccountDropdown'
import CartDropdown from '../CartDropdown/CartDropdown'

export default function Navbar(props: any) {

    const loggedIn = props.loggedIn
    const setLoggedIn = props.setLoggedIn

    const hasAccount = props.hasAccount
    const setHasAccount = props.setHasAccount

    return (
        <>
            <nav className="fixed-top navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="nm container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/products">Products</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {loggedIn ? "Manage Account" : (hasAccount ? "Login" : "Register")}
                        </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {loggedIn ? <AccountDropdown stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> : <Login stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
                            </div>
                            </li>
                    </ul>

                    <ul className="navbar-nav">
                        <div className="m-2 nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Cart
                            </a>
                            <div className="cart dropdown-menu dropdown-menu-end mt-3 p-3 text-center" aria-labelledby="navbarDropdown">
                                <CartDropdown cartContents={props.cartContents} setCartContents={props.setCartContents}/>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            </nav>
        </>
    )
}