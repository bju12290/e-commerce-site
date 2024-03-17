import './Home.css'
import "swiper/css"
import "swiper/css/pagination"
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

import Navbar from '../../components/Navbar/Navbar'
import ProductCard from '../../components/ProductCard/ProductCard'
import Footer from '../../components/Footer/Footer'

import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation } from "swiper/modules";
import React from 'react'



export default function Home(props: any) {

    interface Product {
        id: number;
        name: string;
        thumbnail_url: string;
      }

    const [screenSize, setScreenSize] = React.useState(0)

    const updateScreenSize = () => {
        setScreenSize(window.innerWidth);
      }

      React.useEffect(() => {
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => {
          window.removeEventListener('resize', updateScreenSize);
        }
      }, [])

    

    const embroideredProducts = props.products.filter((product: Product) => product.name.includes("Embroidered"))
      
    return (
        <>
            <Navbar 
                setStripeCustomerInfo={props.setStripeCustomerInfo}
                cartTotal={props.cartTotal} 
                setCartTotal={props.setCartTotal}
                stripeCustomerId={props.stripeCustomerId} 
                setStripeCustomerId={props.setStripeCustomerId} 
                cartContents={props.cartContents} 
                setCartContents={props.setCartContents} 
                hasAccount={props.hasAccount} 
                setHasAccount={props.setHasAccount} 
                loggedIn={props.loggedIn} 
                setLoggedIn={props.setLoggedIn}/>
            <div className="text-nowrap hero-heading-container d-flex flex-column justify-content-center text-center">
                <p className="h1 header-color mb-4">Your Retro Future Awaits</p>
                <div>
                <Link to={"/products"}>
                    <button className="shop-btn btn btn-dark button-color">Shop Now</button>
                </Link>
                </div>
            </div>
            <div className="hero d-flex justify-content-center">
                    <img width="2000" height="800" className="hero-image w-100 img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697845516/banner_c1h0js.jpg" />
            </div>

            
            <div className="text-center carousel--container">
                <h1 className="mb-5 header-color">Embroidered Patches</h1>
            <Swiper
                effect={'coverflow'}
                slidesPerView={screenSize < 900 ? 1 : 3}
                navigation={screenSize < 900 ? true : false}
                spaceBetween={200}
                centeredSlides={true}
                grabCursor={true}
                loop={true} 
                coverflowEffect={{
                    rotate: 25,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                  }}
                modules={[EffectCoverflow, Navigation]}
                className="mySwiper"
            >
            {embroideredProducts.map((product: Product) => (
            <SwiperSlide key={product.id}><div className="d-flex justify-content-center item">
                <ProductCard 
                products={props.products}
                productId={props.productId} setProductId={props.setProductId}
                cartContents={props.cartContents}
                setCartContents={props.setCartContents}
                id={product.id}
                name={product.name}
                thumbnail={product.thumbnail_url}/>
            </div></SwiperSlide>
        ))}
        </Swiper>
        </div>
        <div className="banner-container d-flex align-items-center justify-content-center">
            <img width="2448" height="496" className="banner img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697763601/0_3_rus5k6.png" alt="Product Banner"/>
        </div>
        <div className="cta-container d-flex flex-column align-items-center mx-5 text-center">
            <p className="h1 header-color">Welcome to the Synthwave Wonderland</p>
            <p className="paragraph-color">Step into a World of Synthwave Dreams, Where Past Meets Present in Every Pixel.</p>
            <a href="/products"><button className="btn btn-dark button-color">Start Your Journey</button></a>
        </div>
        
        <div className="d-flex justify-content-center">
        <div className="custom--container text-center">
                <h1 className="mb-5 header-color">Our Favorites</h1>
            <div className="row">
                <div className="col">
                    <Link to={"/product/322470759"}>
                    <img className="hoverzoom img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.png"/></Link>
                </div>
                <div className="col">
                    <Link to={"/product/322471690"}> 
                    <img className="hoverzoom img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.jpg"/></Link>
                </div>
                <div className="col">
                    <Link to={"/product/322469384"}> 
                    <img className="hoverzoom img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.jpg"/></Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to={"/product/322468993"}> 
                    <img className="hoverzoom img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.png"/></Link>
                </div>
                <div className="col">
                    <Link to={"/product/322470729"}> 
                    <img className="hoverzoom img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.png"/></Link>
                </div>
                <div className="col">
                    <Link to={"/product/322468958"}> 
                    <img className="hoverzoom img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.jpg"/></Link>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Link to={"/product/322469015"}> 
                    <img className="hoverzoom img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.png"/></Link>
                </div>
                <div className="col">
                    <Link to={"/product/322471655"}> 
                    <img className="hoverzoom img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.png"/></Link>
                </div>
                <div className="col">
                    <Link to={"/product/322468718"}> 
                    <img className="hoverzoom img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.png"/></Link>
                </div>
            </div>
        </div>
        </div>
        <Footer />
        </>
    )
}