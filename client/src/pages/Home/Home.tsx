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
        id: string;
        name: string;
        thumbnail_url: string; 
        optimized_thumbnail_url: string; 
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
                setLoggedIn={props.setLoggedIn}
                showNotification={props.showNotification}/>
            <div className="text-nowrap hero-heading-container d-flex flex-column justify-content-center text-center">
                <h1 className="h1 header-color mb-4">Your Retro Future Awaits</h1>
                <div>
                <Link to={"/products"}>
                    <button className="shop-btn btn btn-dark button-color">Shop Now</button>
                </Link>
                </div>
            </div>
            <div className="hero d-flex justify-content-center">
                <picture>
                    <source
                        media="(max-width: 768px)"
                        type="image/avif"
                        srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/f_avif/banner_mobile_t12t8l.jpg"/>
                    <source
                        media="(max-width: 768px)"
                        type="image/webp"
                        srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/f_webp/banner_mobile_t12t8l.jpg"/>
                    <source
                        type="image/avif"
                        srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/c_scale,w_300,f_avif/banner_c1h0js.jpg 300w,
                                https://res.cloudinary.com/ddv5jvvvg/image/upload/c_scale,w_1180,f_avif/banner_c1h0js.jpg 1180w,
                                https://res.cloudinary.com/ddv5jvvvg/image/upload/c_scale,w_1640,f_avif/banner_c1h0js.jpg 1640w,
                                https://res.cloudinary.com/ddv5jvvvg/image/upload/c_scale,w_2000,f_avif/banner_c1h0js.jpg 2000w,
                                https://res.cloudinary.com/ddv5jvvvg/image/upload/c_scale,w_2240,f_avif/banner_c1h0js.jpg 2240w"
                        sizes="100vw" />
                    <source
                        type="image/webp"
                        srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/c_scale,w_300,f_webp/banner_c1h0js.jpg 300w,
                                https://res.cloudinary.com/ddv5jvvvg/image/upload/c_scale,w_1180,f_webp/banner_c1h0js.jpg 1180w,
                                https://res.cloudinary.com/ddv5jvvvg/image/upload/c_scale,w_1640,f_webp/banner_c1h0js.jpg 1640w,
                                https://res.cloudinary.com/ddv5jvvvg/image/upload/c_scale,w_2000,f_webp/banner_c1h0js.jpg 2000w,
                                https://res.cloudinary.com/ddv5jvvvg/image/upload/c_scale,w_2240,f_webp/banner_c1h0js.jpg 2240w"
                        sizes="100vw" />
                    <img alt="A banner with colorful shapes and two men sporting clothing from the Shop's catalogue."
                        width="2000" height="800" className="hero-image w-100 img-fluid"
                        srcSet="
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_300/v1697845516/banner_c1h0js.jpg 300w,
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1180/v1697845516/banner_c1h0js.jpg 1180w,
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697845516/banner_c1h0js.jpg 1640w,
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_2000/v1697845516/banner_c1h0js.jpg 2000w"
                        sizes="100vw"
                        src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697845516/banner_c1h0js.jpg"/>
                </picture>
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
                thumbnail={product.optimized_thumbnail_url}/>
            </div></SwiperSlide>
        ))}
        </Swiper>
        </div>
        <div className="banner-container d-flex align-items-center justify-content-center">
            <picture>
                <source
                    type="image/avif"
                    srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_300/f_avif/v1697763601/0_3_rus5k6.png 300w,
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_768/f_avif/v1697763601/0_3_rus5k6.png 768w,
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1280/f_avif/v1697763601/0_3_rus5k6.png 1280w,
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1920/f_avif/v1697763601/0_3_rus5k6.png 1920w,
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_2448/f_avif/v1697763601/0_3_rus5k6.png 2448w"
                    sizes="100vw" />
                <source
                    type="image/webp"
                    srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_300/f_webp/v1697763601/0_3_rus5k6.png 300w,
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_768/f_webp/v1697763601/0_3_rus5k6.png 768w,
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1280/f_webp/v1697763601/0_3_rus5k6.png 1280w,
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1920/f_webp/v1697763601/0_3_rus5k6.png 1920w,
                            https://res.cloudinary.com/ddv5jvvvg/image/upload/w_2448/f_webp/v1697763601/0_3_rus5k6.png 2448w"
                    sizes="100vw" />
                <img width="2448" height="496" className="banner img-fluid"
                    loading="lazy"
                    src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697763601/0_3_rus5k6.png"
                    alt="Product Banner"/>
            </picture>
        </div>
        <div className="cta-container d-flex flex-column align-items-center mx-5 text-center">
            <h1 className="h1 header-color">Welcome to the Synthwave Wonderland</h1>
            <p className="paragraph-color">Step into a World of Synthwave Dreams, Where Past Meets Present in Every Pixel.</p>
            <a href="/products"><button className="btn btn-dark button-color">Start Your Journey</button></a>
        </div>
        
        <div className="d-flex justify-content-center">
        <div className="custom--container text-center">
                <h1 className="mb-5 header-color">Our Favorites</h1>
            <div className="row">
                <div className="col">
                    <Link to={"/product/322470759"}>
                    <picture>
                        <source
                            type="image/avif"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.avif 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.avif 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.avif 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.avif 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.avif 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)"/>
                        <source
                            type="image/webp"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.webp 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.webp 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.webp 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.webp 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.webp 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)"/>
                        <img className="hoverzoom img-fluid"
                            loading="lazy"
                            src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697676056/mens-classic-tee-black-front-65306ddb3fcfc_dgxzsi-Transparent1_ogpt7v.png"
                            alt="Synthwave Sunset Tee Black Front."
                            width="1640"
                            height="1640"/>
                    </picture>
                    </Link>
                </div>
                <div className="col">
                    <Link to={"/product/322471690"}> 
                    <picture>
                        <source
                            type="image/avif"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.avif 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.avif 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.avif 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.avif 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.avif 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <source
                            type="image/webp"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.webp 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.webp 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.webp 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.webp 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.webp 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <img width="1640" height="1640" className="hoverzoom img-fluid" 
                            loading="lazy"
                            alt="Synthwave Sunset Embroidered Patch Hoodie Navy Front."
                            src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697164388/unisex-premium-hoodie-navy-blazer-front-6528a9041cbb4_nsre0b.jpg" />
                    </picture></Link>
                </div>
                <div className="col">
                    <Link to={"/product/322469384"}> 
                    <picture>
                        <source
                            type="image/avif"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.avif 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.avif 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.avif 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.avif 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.avif 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <source
                            type="image/webp"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.webp 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.webp 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.webp 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.webp 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.webp 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <img width="1640" height="1640" className="hoverzoom img-fluid" 
                            loading="lazy"
                            alt="Synthwave Mountain Landscape Unisex Fleece Sweatpants Black Front"
                            src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697153398/unisex-fleece-sweatpants-black-front-65287fdd9786f_feyaza.jpg" />
                    </picture></Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to={"/product/322468993"}> 
                    <picture>
                        <source
                            type="image/avif"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.avif 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.avif 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.avif 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.avif 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.avif 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <source
                            type="image/webp"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.webp 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.webp 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.webp 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.webp 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.webp 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <img width="1640" height="1640" className="hoverzoom img-fluid"
                            loading="lazy"
                            alt="Synthwave Arcade Cabinet Embroidered Patch Unisex Fleece Sweatpants Black Front"
                            src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697677542/unisex-fleece-sweatpants-black-front-653080d9a6c48_eup2wf.png" />
                    </picture></Link>
                </div>
                <div className="col">
                    <Link to={"/product/322470729"}> 
                    <picture>
                        <source
                            type="image/avif"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.avif 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.avif 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.avif 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.avif 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.avif 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <source
                            type="image/webp"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.webp 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.webp 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.webp 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.webp 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.webp 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <img width="1640" height="1640" className="hoverzoom img-fluid"
                            loading="lazy"
                            alt="Synthwave Sunset Unisex Hooded Long Sleeve Tee Black Right Front"
                            src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697676194/unisex-hooded-long-sleeve-tee-black-right-front-65287ee63ea8b_lnxt95-Transparent_ssmceu.png" />
                    </picture></Link>
                </div>
                <div className="col">
                    <Link to={"/product/322468958"}> 
                    <picture>
                        <source
                            type="image/avif"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.avif 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.avif 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.avif 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.avif 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.avif 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <source
                            type="image/webp"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.webp 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.webp 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.webp 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.webp 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.webp 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <img className="hoverzoom img-fluid"
                            loading="lazy"
                            src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697673876/mens-classic-tee-navy-front-65307288f0f38_wvpjes.jpg"
                            alt="Synthwave Arcade Cabinet Embroidered Patch Men's Classic Tee Navy Front"
                            width="1640" height="1640" />
                    </picture></Link>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Link to={"/product/322469015"}> 
                    <picture>
                        <source
                            type="image/avif"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.avif 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.avif 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.avif 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.avif 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.avif 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <source
                            type="image/webp"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.webp 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.webp 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.webp 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.webp 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.webp 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <img className="hoverzoom img-fluid"
                            loading="lazy"
                            src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697676422/unisex-premium-hoodie-navy-blazer-front-6528a54151369_fmuiqp-Transparent_f1pjuw.png"
                            alt="Synthwave Arcade Cabinet Embroidered Patch Unisex Premium Hoodie Navy Blazer Front"
                            width="1640" height="1640" />
                    </picture></Link>
                </div>
                <div className="col">
                    <Link to={"/product/322471655"}> 
                    <picture>
                        <source
                            type="image/avif"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.avif 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.avif 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.avif 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.avif 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.avif 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <source
                            type="image/webp"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.webp 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.webp 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.webp 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.webp 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.webp 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <img className="hoverzoom img-fluid"
                            loading="lazy"
                            src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697676375/mens-classic-tee-black-front-6528ad0bc8455_rktono-Transparent_ssurmb.png"
                            alt="Synthwave Cityscape Embroidered Patch Men's Classic Tee Black Front"
                            width="1640" height="1640" />
                    </picture></Link>
                </div>
                <div className="col">
                    <Link to={"/product/322468718"}> 
                    <picture>
                        <source
                            type="image/avif"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.avif 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.avif 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.avif 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.avif 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.avif 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <source
                            type="image/webp"
                            srcSet="https://res.cloudinary.com/ddv5jvvvg/image/upload/w_256/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.webp 256w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_820/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.webp 820w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1160/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.webp 1160w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1420/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.webp 1420w,
                                    https://res.cloudinary.com/ddv5jvvvg/image/upload/w_1640/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.webp 1640w"
                            sizes="(min-width: 720px) calc(30vw - 80px), (min-width: 480px) calc(45vw - 76px), calc(90vw - 64px)" />
                        <img className="hoverzoom img-fluid"
                            loading="lazy"
                            src="https://res.cloudinary.com/ddv5jvvvg/image/upload/v1697676300/unisex-fleece-sweatpants-black-front-6528b1922dda2_zqrdqp-Transparent_zlpkvq.png"
                            alt="Synthwave Vinyl Record Unisex Fleece Sweatpants Black Front"
                            width="1640" height="1640" />
                    </picture>
                    </Link>
                </div>
            </div>
        </div>
        </div>
        <Footer />
        </>
    )
}