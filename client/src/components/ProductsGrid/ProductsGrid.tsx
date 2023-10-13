import ProductCard from '../ProductCard/ProductCard'

export default function ProductsGrid(props: any) {

    const products = props.products
    console.log(products)

    products.sort((a: any, b: any) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
      
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

return (
    <div className="products--grid container text-center">
        <div className="row align-items-end">
        {products.map((product: any) => (
            <div key={product.id} className="col-md-4">
                <ProductCard 
                products={products}
                productId={props.productId} setProductId={props.setProductId}
                cartContents={props.cartContents}
                setCartContents={props.setCartContents}
                id={product.id}
                name={product.name}
                thumbnail={product.thumbnail_url}/>
            </div>
        ))}
        </div>
    </div>
)
}