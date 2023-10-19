import React from 'react'

import Navbar from '../../components/Navbar/Navbar'
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid'
import ProductsFilter from '../../components/ProductsFilter/ProductsFilter'

export default function AllProducts(props: any) {
    const [sortBy, setSortBy] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [searchTerm, setSearchTerm] = React.useState('')

    console.log(searchTerm)
    
    return (
        <>
            <Navbar stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} cartContents={props.cartContents} setCartContents={props.setCartContents} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
        <div className="d-flex">
            <div className="row w-100">
                <div className="col-3">
                    <ProductsFilter setSearchTerm={setSearchTerm} sortBy={sortBy} setSortBy={setSortBy} category={category} setCategory={setCategory}/>
                </div>
                <div className="col-9 align-self-end">
                <ProductsGrid searchTerm={searchTerm} sortBy={sortBy} category={category} productId={props.productId} setProductId={props.setProductId} handleProductClick={props.handleProductClick} cartContents={props.cartContents} setCartContents={props.setCartContents} products={props.products} setProducts={props.setProducts}/>
            </div>
         </div>
        </div>
        </>
    )
}