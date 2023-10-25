import React from 'react'
import axios from 'axios'

import ProductCard from '../ProductCard/ProductCard'

export default function ProductsGrid(props: any) {

    const [popularity, setPopularity] = React.useState({})

    const { products, setProducts, sortBy, category, searchTerm, productDetails } = props

    interface Product {
        id: number;
        name: string;
        thumbnail_url: string;
      }

      
      
      const [filteredProducts, setFilteredProducts] = React.useState(products);

      React.useEffect(() => {
        axios.get('https://localhost:3000/popularity')
          .then(response => {
            setPopularity(response.data);
          })
          .catch(error => {
            console.error('Error fetching popularity data:', error);
          });
      }, []);

    

      console.log(popularity)

      React.useEffect(() => {
        if (sortBy === "A to Z") {
          const sortedProducts = [...products].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
      
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
      
          
          setProducts(sortedProducts);
        } else if (sortBy === "Z to A") {
          const sortedProducts = [...products].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
      
            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
            return 0;
          });
      
          setProducts(sortedProducts);
        } else if (sortBy === "Price: Low to High") {
            const customOrder = ["Tee", "Long Sleeve", "Sweatpants", "Hoodie"];
            const sortedProducts = [...products].sort((a, b) => {
              const typeA = a.name.includes("Tee") ? "Tee" : (a.name.includes("Long Sleeve") ? "Long Sleeve" : (a.name.includes("Sweatpants") ? "Sweatpants" : "Hoodie"));
              const typeB = b.name.includes("Tee") ? "Tee" : (b.name.includes("Long Sleeve") ? "Long Sleeve" : (b.name.includes("Sweatpants") ? "Sweatpants" : "Hoodie"));
              const indexA = customOrder.indexOf(typeA);
              const indexB = customOrder.indexOf(typeB);
              if (indexA < indexB) return -1;
              if (indexA > indexB) return 1;
              return 0;
            });
            setProducts(sortedProducts);
          } else if (sortBy === "Price: High to Low") {
            const customOrder = ["Tee", "Long Sleeve", "Sweatpants", "Hoodie"];
            const sortedProducts = [...products].sort((a, b) => {
              const typeA = a.name.includes("Tee") ? "Tee" : (a.name.includes("Long Sleeve") ? "Long Sleeve" : (a.name.includes("Sweatpants") ? "Sweatpants" : "Hoodie"));
              const typeB = b.name.includes("Tee") ? "Tee" : (b.name.includes("Long Sleeve") ? "Long Sleeve" : (b.name.includes("Sweatpants") ? "Sweatpants" : "Hoodie"));
              const indexA = customOrder.indexOf(typeA);
              const indexB = customOrder.indexOf(typeB);
              if (indexA > indexB) return -1;
              if (indexA < indexB) return 1;
              return 0;
            });
            setProducts(sortedProducts);
          } else if (sortBy === "Popularity: Low to High") {
            const sortedProducts = [...products].sort((a, b) => {
              const popularityA = (popularity as any)[a.id]
              const popularityB = (popularity as any)[b.id]
      
              return popularityA - popularityB;
            });
            setProducts(sortedProducts);
          } else if (sortBy === "Popularity: High to Low") {
            const sortedProducts = [...products].sort((a, b) => {
              const popularityA = (popularity as any)[a.id]
              const popularityB = (popularity as any)[b.id]
      
              return popularityB - popularityA;
            });
            setProducts(sortedProducts);
          } else if (searchTerm) {
            const filteredProducts = products.filter((product: any) => {
              return product.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredProducts(filteredProducts);
          }
      }, [sortBy, searchTerm]);

      React.useEffect(() => {
        const newFilteredProducts = products.filter((product: Product) => product.name.includes(category));
        setFilteredProducts(newFilteredProducts);
      }, [category, products]);


return (
    <div className="container text-center">
        <div className="row align-items-end">
        {filteredProducts.map((product: Product) => (
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