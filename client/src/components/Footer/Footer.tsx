import React from 'react'
import { Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link'

import './Footer.css'

export default function Footer() {
  const [subscribedToNewsLetter, setSubscribedToNewsLetter] = React.useState(false)

  const handleSubscribe = () => {
    setSubscribedToNewsLetter(true)
  }


    return (
        <div className="footer-bg-color w-100 mt-5">
        <div className="container text-light">
          <footer className="py-5">
            <div className="footer-text-color row">
              <div className="col-6 col-md-2 mb-3">
                <h5>Shop</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-light">Home</a></li>
                  <li className="nav-item mb-2"><Link to={"/products"}><span className="nav-link p-0 text-light">Products</span></Link></li>
                  <li className="nav-item mb-2"><HashLink to={"/our-story#story"}><span className="nav-link p-0 text-light">Our Story</span></HashLink></li>
                  <li className="nav-item mb-2"><HashLink to={"/our-story#ourMaterials"}><span className="nav-link p-0 text-light">Our Materials</span></HashLink></li>
                </ul>
              </div>

              <div className="col-6 col-md-2 mb-3">
                <h5>Help</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><a href="tel:222-222-2222" className="nav-link p-0 text-light">+1 222-222-2222</a></li>
                  <li className="nav-item mb-2"><a href="mailto:support@website.com" className="nav-link p-0 text-light">support@website.com</a></li>
                  <li className="nav-item mb-2"><HashLink to={"/faq#returns"}>
                    <span className="nav-link p-0 text-light">Returns/Exchanges</span></HashLink></li>
                  <li className="nav-item mb-2"><HashLink to={"/faq#faq"}><span className="nav-link p-0 text-light">FAQs/Contact Us</span></HashLink></li>
                </ul>
              </div>


              <div className="col-md-5 offset-md-1 mb-3">
                <form>
                  <h5>Subscribe to our newsletter</h5>
                  <p className="white">New Products and Exclusive Discounts Straight to your Inbox!</p>
                  <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                    <input type="email" id="newsletter1" className="form-control" placeholder="Email address"/>
                    <button onClick={handleSubscribe} className="btn button-color-2 subscribe-button" type="button">{subscribedToNewsLetter ? 'Thanks!' : 'Subscribe!'}</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
              <p className="footer-text-color-2">&copy; 2023 Company, Inc. All rights reserved.</p>
              <ul className="list-unstyled d-flex">
                <li className="ms-3"><a className="footer-text-color-2" target="_blank" href="https://twitter.com/"><p>Twitter</p></a></li>
                <li className="ms-3"><a className="footer-text-color-2" target="_blank" href="https://www.instagram.com/"><p>Instagram</p></a></li>
                <li className="ms-3"><a className="footer-text-color-2" target="_blank" href="https://www.facebook.com/"><p>Facebook</p></a></li>
              </ul>
          </div>
          </footer>
        </div>
        </div>
    )
}