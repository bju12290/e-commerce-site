import './ProductCard.css'

import { Link } from "react-router-dom";

export default function ProductCard(props: any) {

    const products = props.products
    const cartContents = props.cartContents
    const setCartContents = props.setCartContents
    const setProductId = props.setProductId
    const productDetails = props.productDetails

    const handleProductClick = (productId: number) => {
        setProductId(productId)
      };

    const getPrice = () => {
        if (props.name.includes("Tee")) {
            return "$24.99"
        } else if (props.name.includes("Sweatpants")) {
            return "$39.99"
        } else {
            return "$44.99"
        }
    }

    return(
        <Link to={"/product/" + props.id} onClick={() => handleProductClick(props.id)}>
        <div className="container text-start">
                <img className="img-fluid" src={props.thumbnail} />
                <p className="product-header-color h4">{props.name}</p>
                <p className="paragraph-color">{getPrice()}</p>
        </div>
        </Link>
    )
}