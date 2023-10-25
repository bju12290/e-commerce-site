import Login from '../LogIn/Login'
import AccountDropdown from '../AccountDropdown/AccountDropdown'
import CartDropdown from '../CartDropdown/CartDropdown'
import icon from '../../assets/icon.png'

import './Navbar.css'

export default function Navbar(props: any) {

    const { loggedIn, setLoggedIn, hasAccount, setHasAccount, stripeCustomerId, setStripeCustomerId, cartContents, setCartContents } = props

    return (
        <>
            <nav className="fixed-top navbar navbar-bg-color navbar-expand-lg">
            <div className="nm container-fluid">
                <a className="navbar-brand navbar-text-color" href="/"><img className="ms-2" width="40" height="40" src={icon}/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-dark navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="navbar-text-color nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-text-color nav-link" href="/products">Products</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="navbar-text-color nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {loggedIn ? "Manage Account" : (hasAccount ? "Login" : "Register")}
                        </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {loggedIn ? 
                                <AccountDropdown 
                                    stripeCustomerId={stripeCustomerId} 
                                    setStripeCustomerId={setStripeCustomerId} 
                                    hasAccount={hasAccount} 
                                    setHasAccount={setHasAccount} 
                                    loggedIn={loggedIn} 
                                    setLoggedIn={setLoggedIn}/> 
                                : 
                                <Login 
                                    stripeCustomerId={stripeCustomerId} 
                                    setStripeCustomerId={setStripeCustomerId} 
                                    hasAccount={hasAccount} 
                                    setHasAccount={setHasAccount} 
                                    loggedIn={loggedIn} 
                                    setLoggedIn={setLoggedIn}/>}
                            </div>
                            </li>
                    </ul>

                    <ul className="navbar-nav">
                        <div className="m-2 nav-item dropdown">
                            <a className="navbar-text-color nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Cart
                            </a>
                            <div className="cart dropdown-menu dropdown-menu-end mt-3 p-3 text-center" aria-labelledby="navbarDropdown">
                                <div className="w-100">
                                <CartDropdown 
                                    cartTotal={props.cartTotal}
                                    setCartTotal={props.setCartTotal}
                                    cartContents={cartContents} 
                                    setCartContents={setCartContents}/>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            </nav>
        </>
    )
}