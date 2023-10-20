import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Home from './pages/Home/Home'
import ProductPage from './pages/ProductPage/ProductPage'
import AllProducts from './pages/AllProducts/AllProducts'
import Cart from './pages/Cart/Cart'
import Success from './pages/Checkout/Success'
import Cancel from './pages/Checkout/Cancel'
import CheckoutPreview from './pages/Checkout/CheckoutPreview'
import Dashboard from './pages/User/Dashboard'
import UserSettings from './pages/User/UserSettings'
import OrderDetails from './pages/User/OrderDetails'
import About from './pages/About/About'
import Materials from './pages/About/Materials'
import FAQs from './pages/About/FAQs'
import Returns from './pages/About/Returns'

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [hasAccount, setHasAccount] = React.useState(false)
  const [products, setProducts] = React.useState([])
  const [cartContents, setCartContents] = React.useState([])
  const [productDetails, setProductDetails] = React.useState([])
  const [productId, setProductId] = React.useState(null)
  const [stripeCustomerId, setStripeCustomerId] = React.useState(null)
  const [stripeCustomerInfo, setStripeCustomerInfo] = React.useState({})

  // console.log(stripeCustomerId)

      React.useEffect(() => {
        // Retrieve cart data from localStorage
        setCartContents([])
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartContents(JSON.parse(storedCart));
        }
    }, []);

    React.useEffect(() => {
        fetch('https://localhost:3000/getProductInformation')
            .then(response => response.json())
            .then(data => {
                const formattedProducts = data.result.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    thumbnail_url: item.thumbnail_url
                }))
                setProducts(formattedProducts)
            })
            .catch(error => {
                console.error(error)
            });
    }, []);

    React.useEffect(() => {
      if (productId) {
        // Fetch product details when productId is set
        fetch(`https://localhost:3000/getProductInformation/${productId}`)
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the server
            setProductDetails(data);
            console.log('Product Information:', data)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }, [productId]);

React.useEffect(() => {
      if (stripeCustomerId) {
        // Fetch customer details when customerId is set
        fetch(`https://localhost:3000/getCustomerInfo?customerId=${stripeCustomerId}`, {
          method: 'POST', // Change the method to POST
            body: JSON.stringify({ customerId: stripeCustomerId }),
            headers: {
            'Content-Type': 'application/json',
            },
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the server
            setStripeCustomerInfo(data);
            // console.log('Customer Information:', data)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }, [stripeCustomerId]);

    // console.log(stripeCustomerInfo)



  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/products" element={<AllProducts setProducts={setProducts} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} productId={productId} setProductId={setProductId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>} />
        <Route path="/product/:productId" element={<ProductPage stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} productId={productId} setProductId={setProductId} productDetails={productDetails} setProductDetails={setProductDetails} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/dashboard" element={<Dashboard stripeCustomerInfo={stripeCustomerInfo} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>} />
        <Route path="/cart"/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/cancel" element={<Cancel/>}/>
        <Route path="/checkout" element={<CheckoutPreview cartContents={cartContents} setCartContents={setCartContents} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/userSettings" element={<UserSettings stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents} stripeCustomerInfo={stripeCustomerInfo}/>}/>
        <Route path="/order/:orderId" element={<OrderDetails stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/ourStory" element={<About loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/materials" element={<Materials stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/faq" element={<FAQs loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>} />
        <Route path="/returns" element={<Returns loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App