import { Link } from "react-router-dom";

export default function ProductCard(props: any) {

    const products = props.products
    const cartContents = props.cartContents
    const setCartContents = props.setCartContents
    const setProductId = props.setProductId

    const handleProductClick = (productId: number) => {
        setProductId(productId)
      };


    const handleCart = (productId: any) => {
        setCartContents((prevState: any) => {
            // Find the product in the products array with the matching ID.
            const productToAdd = props.products.find((product: any) => product.id === productId);
    
            // Check if the product is already in the cart.
            const isProductInCart = prevState.some((item: any) => item.id === productId);
    
            if (productToAdd) {
                if (isProductInCart) {
                    // If the product is in the cart, remove it.
                    return prevState.filter((item: any) => item.id !== productId);
                } else {
                    // If the product is not in the cart, add it.
                    return [...prevState, productToAdd];
                }
            }
    
            // Return the previous state if the product was not found.
            return prevState;
        });
    }

    return(
        <Link to={"/product/" + props.id} onClick={() => handleProductClick(props.id)}>
        <div className="product--card">
                <h1 className="product--header">{props.name}</h1>
                <img className="product--image img-fluid" src={props.thumbnail} />
                <button onClick={() => handleCart(props.id)} className="addToCart--button btn btn-sm btn-primary">Add to Cart</button>
        </div>
        </Link>
    )
}