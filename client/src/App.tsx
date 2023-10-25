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
import FAQs from './pages/About/FAQs'

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [hasAccount, setHasAccount] = React.useState(false)
  const [products, setProducts] = React.useState([])
  const [cartContents, setCartContents] = React.useState([])
  const [cartTotal, setCartTotal] = React.useState(0)
  const [productDetails, setProductDetails] = React.useState([])
  const [productId, setProductId] = React.useState(null)
  const [stripeCustomerId, setStripeCustomerId] = React.useState(null)
  const [stripeCustomerInfo, setStripeCustomerInfo] = React.useState({})
  const [updateTrigger, setUpdateTrigger] = React.useState(0)

      React.useEffect(() => {
        // Retrieve cart data from localStorage
        setCartContents([])
        setHasAccount(false)
        const storedCart = localStorage.getItem('cart');
        const storedAccountStatus = localStorage.getItem('hasAccount')
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);

            const newCartTotal = parsedCart.reduce((total: number, item: any) => {
              return total + (item.cost * item.quantity);
          }, 0);

            setCartTotal(newCartTotal)
            setCartContents(JSON.parse(storedCart));
        }
      if (storedAccountStatus) {
        const parsedStatus = JSON.parse(storedAccountStatus)
        setHasAccount(parsedStatus)
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
    }, [stripeCustomerId, updateTrigger]);

    // console.log(stripeCustomerInfo)



  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home cartTotal={cartTotal} setCartTotal={setCartTotal} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/products" element={<AllProducts cartTotal={cartTotal} setCartTotal={setCartTotal} setProducts={setProducts} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} productId={productId} setProductId={setProductId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>} />
        <Route path="/product/:productId" element={<ProductPage cartTotal={cartTotal} setCartTotal={setCartTotal} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} productId={productId} setProductId={setProductId} productDetails={productDetails} setProductDetails={setProductDetails} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/dashboard" element={<Dashboard cartTotal={cartTotal} setCartTotal={setCartTotal} stripeCustomerInfo={stripeCustomerInfo} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>} />
        <Route path="/cart"/>
        <Route path="/success" element={<Success stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} cartTotal={cartTotal} setCartTotal={setCartTotal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/cancel" element={<Cancel stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} cartTotal={cartTotal} setCartTotal={setCartTotal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/checkout" element={<CheckoutPreview cartTotal={cartTotal} setCartTotal={setCartTotal} cartContents={cartContents} setCartContents={setCartContents} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/userSettings" element={<UserSettings updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger} cartTotal={cartTotal} setCartTotal={setCartTotal} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents} stripeCustomerInfo={stripeCustomerInfo}/>}/>
        <Route path="/order/:orderId" element={<OrderDetails cartTotal={cartTotal} setCartTotal={setCartTotal} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/ourStory" element={<About stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} cartTotal={cartTotal} setCartTotal={setCartTotal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/faq" element={<FAQs stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} cartTotal={cartTotal} setCartTotal={setCartTotal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App