import React from 'react'

import Navbar from '../../components/Navbar/Navbar'
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid'

export default function AllProducts(props: any) {

    return (
        <>
            <Navbar stripeCustomerId={props.stripeCustomerId} setStripeCustomerId={props.setStripeCustomerId} cartContents={props.cartContents} setCartContents={props.setCartContents} hasAccount={props.hasAccount} setHasAccount={props.setHasAccount} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
            <ProductsGrid productId={props.productId} setProductId={props.setProductId} handleProductClick={props.handleProductClick} cartContents={props.cartContents} setCartContents={props.setCartContents} products={props.products}/>
        </>
    )
}