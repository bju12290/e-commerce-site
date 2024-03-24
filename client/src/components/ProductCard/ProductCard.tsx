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
        <picture>
            <source 
                type="image/avif" 
                srcSet={`
                    https://res.cloudinary.com/ddv5jvvvg/image/fetch/f_avif,w_300/${props.thumbnail} 300w,
                    https://res.cloudinary.com/ddv5jvvvg/image/fetch/f_avif,w_600/${props.thumbnail} 600w,
                    https://res.cloudinary.com/ddv5jvvvg/image/fetch/f_avif,w_800/${props.thumbnail} 800w
                `} 
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 25vw" />

            <source 
                type="image/webp" 
                srcSet={`
                    https://res.cloudinary.com/ddv5jvvvg/image/fetch/f_webp,w_300/${props.thumbnail} 300w,
                    https://res.cloudinary.com/ddv5jvvvg/image/fetch/f_webp,w_600/${props.thumbnail} 600w,
                    https://res.cloudinary.com/ddv5jvvvg/image/fetch/f_webp,w_800/${props.thumbnail} 800w
                `}
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 25vw" />

            <img 
                width="800" 
                height="800" 
                className="img-fluid" 
                alt="" 
                src={`https://res.cloudinary.com/ddv5jvvvg/image/fetch/f_auto,w_800/${props.thumbnail}`} />
        </picture>
                <p className="product-header-color h4">{props.name}</p>
                <p className="paragraph-color">{getPrice()}</p>
        </div>
        </Link>
    )
}