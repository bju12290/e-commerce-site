import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import './App.css'
import Home from './pages/Home/Home'
import ProductPage from './pages/ProductPage/ProductPage'
import AllProducts from './pages/AllProducts/AllProducts'
import Success from './pages/Checkout/Success'
import Cancel from './pages/Checkout/Cancel'
import CheckoutPreview from './pages/Checkout/CheckoutPreview'
import Dashboard from './pages/User/Dashboard'
import UserSettings from './pages/User/UserSettings'
import OrderDetails from './pages/User/OrderDetails'
import About from './pages/About/About'
import FAQs from './pages/About/FAQs'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'

interface Product {
  id: string;
  name: string;
  thumbnail_url: string; 
  optimized_thumbnail_url: string; 
}

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [hasAccount, setHasAccount] = React.useState(false)
  const [products, setProducts] = React.useState<Product[]>([])
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
      fetch('https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/getProductInformation')
            .then(response => response.json())
            .then(data => {
                const cloudinaryBaseUrl = "https://res.cloudinary.com/ddv5jvvvg/image/fetch/f_auto/";

                const formattedProducts: Product[] = data.result.map((item: any) => {
                    const optimized_thumbnail_url = `${cloudinaryBaseUrl}${encodeURIComponent(item.thumbnail_url)}`;

                    return {
                        id: item.id,
                        name: item.name,
                        thumbnail_url: item.thumbnail_url,
                        optimized_thumbnail_url, 
                    };
                });

                // Preloading images if necessary - optional based on your use case
                formattedProducts.forEach(product => {
                    const img = new Image();
                    img.src = product.optimized_thumbnail_url; // Preload the optimized image
                });

                setProducts(formattedProducts);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    React.useEffect(() => {
      if (productId) {
        // Fetch product details when productId is set
        fetch(`https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/getProductInformation/${productId}`)
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the server
            setProductDetails(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }, [productId]);

React.useEffect(() => {
      if (stripeCustomerId) {
        fetch(`https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/getCustomerInfo?customerId=${stripeCustomerId}`, {
          method: 'POST',
            body: JSON.stringify({ customerId: stripeCustomerId }),
            headers: {
            'Content-Type': 'application/json',
            },
        })
          .then((response) => response.json())
          .then((data) => {
            setStripeCustomerInfo(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }, [stripeCustomerId, updateTrigger]);

    const NotFound = () => {
      const navigate = useNavigate()
      React.useEffect(() => {
        navigate('/');
      }, []);
      return null;
    };



  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home setStripeCustomerInfo={setStripeCustomerInfo} cartTotal={cartTotal} setCartTotal={setCartTotal} setProducts={setProducts} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} productId={productId} setProductId={setProductId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/products" element={<AllProducts setStripeCustomerInfo={setStripeCustomerInfo} cartTotal={cartTotal} setCartTotal={setCartTotal} setProducts={setProducts} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} productId={productId} setProductId={setProductId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>} />
        <Route path="/product/:productId" element={<ProductPage setStripeCustomerInfo={setStripeCustomerInfo} cartTotal={cartTotal} setCartTotal={setCartTotal} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} productId={productId} setProductId={setProductId} productDetails={productDetails} setProductDetails={setProductDetails} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/dashboard" element={loggedIn ? <Dashboard setStripeCustomerInfo={setStripeCustomerInfo} cartTotal={cartTotal} setCartTotal={setCartTotal} stripeCustomerInfo={stripeCustomerInfo} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/> : <NotFound />}
        />
        <Route path="/cart"/>
        <Route path="/success" element={<Success setStripeCustomerInfo={setStripeCustomerInfo} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} cartTotal={cartTotal} setCartTotal={setCartTotal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/cancel" element={<Cancel setStripeCustomerInfo={setStripeCustomerInfo} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} cartTotal={cartTotal} setCartTotal={setCartTotal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/checkout" element={<CheckoutPreview setStripeCustomerInfo={setStripeCustomerInfo} cartTotal={cartTotal} setCartTotal={setCartTotal} cartContents={cartContents} setCartContents={setCartContents} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/userSettings" element={<UserSettings setStripeCustomerInfo={setStripeCustomerInfo} updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger} cartTotal={cartTotal} setCartTotal={setCartTotal} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents} stripeCustomerInfo={stripeCustomerInfo}/>}/>
        <Route path="/order/:orderId" element={<OrderDetails setStripeCustomerInfo={setStripeCustomerInfo} cartTotal={cartTotal} setCartTotal={setCartTotal} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/our-story" element={<About setStripeCustomerInfo={setStripeCustomerInfo} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} cartTotal={cartTotal} setCartTotal={setCartTotal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
        <Route path="/faq" element={<FAQs setStripeCustomerInfo={setStripeCustomerInfo} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} cartTotal={cartTotal} setCartTotal={setCartTotal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>} />
        <Route path="/forgotPassword" element={<ForgotPassword setStripeCustomerInfo={setStripeCustomerInfo} cartTotal={cartTotal} setCartTotal={setCartTotal} setProducts={setProducts} stripeCustomerId={stripeCustomerId} setStripeCustomerId={setStripeCustomerId} productId={productId} setProductId={setProductId} products={products} hasAccount={hasAccount} setHasAccount={setHasAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartContents={cartContents} setCartContents={setCartContents}/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App