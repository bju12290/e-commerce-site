import React from 'react'
import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

import './ProductDetails.css'

export default function ProductDetails(props: any) {
    const [productSize, setProductSize] = React.useState('S')
    const [productColor, setProductColor] = React.useState('Black')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_popularity, setPopularity] = React.useState({})

    const setProductId = props.setProductId
    const productId = props.productId
    const stripeProductData = props.productDetails.stripeData
    const printfulProductData = props.productDetails.printfulData
    const productVariants = printfulProductData?.result?.sync_variants || []
    const sizes: Array<string> = []
    const colors: Array<string> = []
    const products = props.products
    const setCartContents = props.setCartContents
    const setCartTotal = props.setCartTotal
    const productPrice = printfulProductData?.result.sync_variants[0].retail_price


        React.useEffect(() => {
            // Fetch popularity data from your server endpoint.
            setProductId(productId)
            axios.get('https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/popularity')
              .then(response => {
                setPopularity(response.data);
              })
              .catch(error => {
                console.error('Error fetching popularity data:', error);
              });
          }, []);
        
          React.useEffect(() => {
            incrementPopularity(productId);
          }, [productId]);
        
          const incrementPopularity = (productID: any) => {
            // Fetch the current popularity value from the server.
            axios.get(`https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/popularity/${productID}`)
              .then(response => {
                const currentPopularity = response.data;
        
                // Increment the popularity value.
                const updatedPopularity = currentPopularity + 1;
        
                // Update the popularity value on the client-side.
                // You can display this updated popularity value in your component.
                //console.log('Updated Popularity:', updatedPopularity);
        
                // Send the updated popularity value to the server.
                updatePopularityOnServer(productID, updatedPopularity);
              })
              .catch(error => {
                console.error('Error fetching current popularity data:', error);
              });
          };
        
          const updatePopularityOnServer = (productID: any, updatedPopularity: any) => {
            // Send a PUT request to update the popularity on the server.
            axios.put(`https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/popularity/${productID}`, { popularity: updatedPopularity })
              .catch(error => {
                console.error('Error updating popularity on the server:', error);
              });
          };

    for (const variant of productVariants) {
        const size = variant.size;
        const color = variant.color

        if (size && !sizes.includes(size)) {
            sizes.push(size);
        }

        if (color && !colors.includes(color)) {
            colors.push(color)
        }
    }

    const SizeElements = sizes.map(size => (
        <option value={size}>{size}</option>
    ))

    const ColorElements = colors.map(color => (
        <option value={color}>{color}</option>
    ))
        
    const handleSizeAndColor = () => {
        setProductSize((document.getElementById("sizes") as HTMLInputElement).value)
        setProductColor((document.getElementById("colors")as HTMLInputElement).value)
    }

    const handleCart = () => {
        setCartContents((prevCartContents: any) => {
            const selectedSize = productSize;
            const selectedColor = productColor;
    
            // Find the product to add based on the selected productId, size, and color.
            const productToAdd = products.find((product: any) =>
                product.id.toString().trim() === props.productId.trim()
            );
    
            if (productToAdd) {
                // Check if the product already exists in the cart.
                const existingProductIndex = prevCartContents.findIndex((product: any) =>
                    product.id.toString().trim() === props.productId.trim() &&
                    product.size === selectedSize &&
                    product.color === selectedColor
                );
    
                if (existingProductIndex !== -1) {
                    // If the product already exists in the cart, update its quantity.
                    const updatedCart = [...prevCartContents];
                    updatedCart[existingProductIndex].quantity += 1;
                    updatedCart[existingProductIndex].cost += parseFloat(productPrice);

                    const newTotalPrice = updatedCart.reduce((total: any, item: any) => {
                    return total + (item.cost * item.quantity);
                    }, 0);

                    setCartTotal(newTotalPrice);
    
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    return updatedCart;
                } else {
                    // If the product is not in the cart, add it as a new entry with quantity 1.
                    let stripePriceId
                    if (stripeProductData?.data.length > 1) {
                        stripePriceId = stripeProductData?.data[1].default_price;
                    } else {
                        stripePriceId = stripeProductData?.data[0].default_price;
                    }
                    

                    if (selectedColor === "Navy Blazer") {
                        stripePriceId = stripeProductData?.data[0].default_price;
                    }

                    const newProduct = {
                        ...productToAdd,
                        quantity: 1,
                        price: stripePriceId,
                        cost: parseFloat(productPrice),
                        size: selectedSize,
                        color: selectedColor,
                    };

                    const updatedCart = [...prevCartContents, newProduct];

                    const newCartTotal = updatedCart.reduce((total: any, item: any) => {
                        return total + (item.cost * item.quantity);
                    }, 0);

                    setCartTotal(newCartTotal)
    
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    return updatedCart;
                }
            }
            // Return the previous state if the product was not found.
            localStorage.setItem('cart', JSON.stringify(prevCartContents));
            return prevCartContents;
        });
    }

    const isNavy = productColor === 'Black' ? '' : '-navy'

    return (
        <>
    <div className="container-fluid product-container">
        <div className="row">
            <div className="col swiper-product-details">
                <Swiper pagination={true} modules={[Pagination]} className="swiper-product-details">
                    <SwiperSlide><img src={`https://res.cloudinary.com/ddv5jvvvg/image/upload/${productId}-1${isNavy}`} /></SwiperSlide>
                    <SwiperSlide><img src={`https://res.cloudinary.com/ddv5jvvvg/image/upload/${productId}-2${isNavy}`} /></SwiperSlide>
                    <SwiperSlide><img src={`https://res.cloudinary.com/ddv5jvvvg/image/upload/${productId}-3${isNavy}`} /></SwiperSlide>
                    <SwiperSlide><img src={`https://res.cloudinary.com/ddv5jvvvg/image/upload/${productId}-4${isNavy}`} /></SwiperSlide>
                    <SwiperSlide><img src={`https://res.cloudinary.com/ddv5jvvvg/image/upload/${productId}-5${isNavy}`} /></SwiperSlide>
                    <SwiperSlide><img src={`https://res.cloudinary.com/ddv5jvvvg/image/upload/${productId}-6${isNavy}`} /></SwiperSlide>
                    <SwiperSlide><img src={`https://res.cloudinary.com/ddv5jvvvg/image/upload/${productId}-7${isNavy}`} /></SwiperSlide>
                </Swiper>
            </div>
            <div className="col-md-5 text-center my-auto">
                <h1 className="">{printfulProductData ? printfulProductData.result.sync_product.name : "Loading..."}</h1>
                <p>{stripeProductData ? stripeProductData.data[0].description : "Loading..."}</p>
                <div className="vstack w-25 mx-auto">
                <label htmlFor="sizes">Size</label>
                <select onChange={handleSizeAndColor} id="sizes" name="sizes">
                    {SizeElements}
                </select>
                <label htmlFor="colors">Color</label>
                <select onChange={handleSizeAndColor} id="colors" name="colors">
                    {ColorElements}
                </select>
                <p className="mt-3">${productPrice}</p>
                <button onClick={() => handleCart()} className="btn btn-sm button-color">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
