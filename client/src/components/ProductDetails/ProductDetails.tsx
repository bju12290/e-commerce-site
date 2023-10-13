import React from 'react'

export default function ProductDetails(props: any) {
    const [productSize, setProductSize] = React.useState('S')
    const [productColor, setProductColor] = React.useState('Black')

    const setProductId = props.setProductId
    setProductId(props.productId)
    const stripeProductData = props.productDetails.stripeData
    const printfulProductData = props.productDetails.printfulData
    const productVariants = printfulProductData?.result?.sync_variants || []
    const sizes: Array<string> = []
    const colors: Array<string> = []
    const products = props.products
    const cartContents = props.cartContents
    const setCartContents = props.setCartContents

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

    console.log(cartContents)
    console.log(productColor)
    console.log(productSize)
    

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


// Pass size and color as metadata for each product to the serverside to use in the checkoutSessions metadata. This data would be used to tell what color/size to create of which product. We can either store the color/size inside an array, and the products size and color would all line up 1 to 1, or we could have a new key value pair added for each new product added to cart. Probably the better option, it's more clear. Ie

// productOneSize: L
// productOneColor: Navy
// productTwoSize: L
// productTwoColor: Black
