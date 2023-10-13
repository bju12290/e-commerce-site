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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
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
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    <CartDropdown cartContents={props.cartContents} setCartContents={props.setCartContents}/>
                </form>
                </div>
            </div>
            </nav>
        </>
    )
}