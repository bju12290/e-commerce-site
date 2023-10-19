import React from 'react'
import axios from 'axios'

export default function ProductDetails(props: any) {
    const [productSize, setProductSize] = React.useState('S')
    const [productColor, setProductColor] = React.useState('Black')
    const [popularity, setPopularity] = React.useState({})

    const setProductId = props.setProductId
    const productId = props.productId
    setProductId(props.productId)
    const stripeProductData = props.productDetails.stripeData
    const printfulProductData = props.productDetails.printfulData
    const productVariants = printfulProductData?.result?.sync_variants || []
    const sizes: Array<string> = []
    const colors: Array<string> = []
    const products = props.products
    const cartContents = props.cartContents
    const setCartContents = props.setCartContents

        console.log(props.productId)

        React.useEffect(() => {
            // Fetch popularity data from your server endpoint.
            axios.get('https://localhost:3000/popularity')
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
            axios.get(`https://localhost:3000/popularity/${productID}`)
              .then(response => {
                const currentPopularity = response.data;
        
                // Increment the popularity value.
                const updatedPopularity = currentPopularity + 1;
        
                // Update the popularity value on the client-side.
                // You can display this updated popularity value in your component.
                console.log('Updated Popularity:', updatedPopularity);
        
                // Send the updated popularity value to the server.
                updatePopularityOnServer(productID, updatedPopularity);
              })
              .catch(error => {
                console.error('Error fetching current popularity data:', error);
              });
          };
        
          const updatePopularityOnServer = (productID: any, updatedPopularity: any) => {
            // Send a PUT request to update the popularity on the server.
            axios.put(`https://localhost:3000/popularity/${productID}`, { popularity: updatedPopularity })
              .then(response => {
                console.log('Popularity data updated on the server:', response.data);
              })
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
    
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    return updatedCart;
                } else {
                    // If the product is not in the cart, add it as a new entry with quantity 1.
                    let stripePriceId
                    if (stripeProductData.data.length > 1) {
                        stripePriceId = stripeProductData?.data[1].default_price;
                    } else {
                        stripePriceId = stripeProductData?.data[0].default_price;
                    }
                    

                    if (selectedColor === "Navy Blazer") {
                        stripePriceId = stripeProductData?.data[0].default_price;
                    }

                    console.log(stripePriceId)

                    const newProduct = {
                        ...productToAdd,
                        quantity: 1,
                        price: stripePriceId,
                        size: selectedSize,
                        color: selectedColor,
                    };
                    const updatedCart = [...prevCartContents, newProduct];
    
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    return updatedCart;
                }
            }
            // Return the previous state if the product was not found.
            localStorage.setItem('cart', JSON.stringify(prevCartContents));
            return prevCartContents;
        });
    }

    return (
    <div>
        <h1>{printfulProductData ? printfulProductData.result.sync_product.name : "Loading..."}</h1>
        <img src={printfulProductData ? printfulProductData.result.sync_product.thumbnail_url : ""}/>
        <p>{stripeProductData ? stripeProductData.data[0].description : "Loading..."}</p>
        <label htmlFor="sizes">Size</label>
        <select onChange={handleSizeAndColor} id="sizes" name="sizes">
            {SizeElements}
        </select>
        <label htmlFor="colors">Color</label>
        <select onChange={handleSizeAndColor} id="colors" name="colors">
            {ColorElements}
        </select>
        <button onClick={() => handleCart()} className="addToCart--button btn btn-sm btn-primary">Add to Cart</button>
    </div>
    )
}
