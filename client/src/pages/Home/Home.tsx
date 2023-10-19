import './Home.css'
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-coverflow';

import Navbar from '../../components/Navbar/Navbar'
import ProductCard from '../../components/ProductCard/ProductCard'
import Footer from '../../components/Footer/Footer'

import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow } from "swiper/modules";


export default function Home(props: any) {

    const screenSize = window. innerWidth

    interface Product {
        id: number;
        name: string;
        thumbnail_url: string;
      }

    const embroideredProducts = props.products.filter((product: Product) => product.name.includes("Embroidered"))
      
    return (
        <>
            <Navbar stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} cartContents={props.cartContents} setCartContents={props.setCartContents} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
            <div className="hero d-flex justify-content-center w-100">
            <div className="row hero-image">
                <div className="col g-0">
                    <img className="img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697591017/unisex-hooded-long-sleeve-tee-black-front-652f2eb3734c9_wuvlbq.png" />
                </div>
                <div className="col g-0">
                    <img className="img-fluid" src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697592491/unisex-premium-hoodie-navy-blazer-front-652f3485d75e2_lvz0mf.png" />
                </div>
            </div>
            </div>
            <div className="container d-flex justify-content-center">
                <Link to={"/products"}>
                    <button className="shop-btn btn btn-dark">Shop Now</button>
                </Link>
            </div>

            
            <div className="text-center mt-5">
                <h1 className="mb-5">Embroidered Patches</h1>
            <Swiper
                effect={'coverflow'}
                slidesPerView={screenSize < 900 ? 1 : 3}
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
                modules={[EffectCoverflow]}
                className="mySwiper"
            >
            {embroideredProducts.map((product: Product) => (
            <SwiperSlide><div key={product.id} className="d-flex justify-content-center item">
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
        
        <div className="d-flex justify-content-center">
        <div className="custom--container text-center mt-5">
                <h1 className="mb-5">New Arrivals</h1>
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
        <div className="container d-flex flex-row justify-content-center">
            <p>New Products and Discounts Right to your Inbox! </p>
            <p>No spam, we promise!</p>
            <input></input>
        </div>
        <Footer />
        </>
    )
}

// TO-DO:

// Mailing List Section (Not Functioning)
// Footer