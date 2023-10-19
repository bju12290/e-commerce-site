import { Link } from "react-router-dom";

export default function ProductCard(props: any) {

    const products = props.products
    const cartContents = props.cartContents
    const setCartContents = props.setCartContents
    const setProductId = props.setProductId

    const handleProductClick = (productId: number) => {
        setProductId(productId)
      };

    return(
        <Link to={"/product/" + props.id} onClick={() => handleProductClick(props.id)}>
        <div className="product--card">
                <h1 className="product--header">{props.name}</h1>
                <img className="product--image img-fluid" src={props.thumbnail} />
        </div>
        </Link>
    )
}