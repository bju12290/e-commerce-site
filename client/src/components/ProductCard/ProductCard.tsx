import './ProductCard.css'

import { Link } from "react-router-dom";

export default function ProductCard(props: any) {

    const setProductId = props.setProductId

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
        <Link onClick={() => handleProductClick(props.id)} to={"/product/" + props.id}>
        <div className="container text-start">
                <img className="img-fluid" src={props.thumbnail} />
                <p className="product-header-color h4">{props.name}</p>
                <p className="paragraph-color">{getPrice()}</p>
        </div>
        </Link>
    )
}