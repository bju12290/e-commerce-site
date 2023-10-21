export default function productsFilter(props: any) {

    const { sortBy, setSortBy, category, setCategory, setSearchTerm } = props

    console.log(sortBy)
    console.log(category)

    const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCategory = event.target.value
        if (selectedCategory === category) {
          setCategory('')
        } else {
          setCategory(selectedCategory)
        }
      };

    const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value)
    }

    const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    

    return (
    <div className="container mt-5 ms-5">
        <div className="mb-3">
        <form role="search">
            <label htmlFor="search" className="visually-hidden">Search</label>
            <input id="search" name="search" className="w-100" onChange={handleSearchTerm} type="search" placeholder="Search" aria-label="Search"></input>
        </form>
        </div>
        <div className="mb-3">
        <select value={sortBy} onChange={handleSortBy} className="form-select" aria-label="Default select example">
            <option selected>Sort by...</option>
            <option value="A to Z">A to Z</option>
            <option value="Z to A">Z to A</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Popularity: High to Low">Popularity: High to Low</option>
            <option value="Popularity: Low to High">Popularity: Low to High</option>
        </select>
        </div>
        <div className="">
            <h4>Category</h4>
            <div className="form-check">
            <input value="Tee" checked={category === "Tee"}  onChange={handleCategory} className="form-check-input" type="checkbox" name="clothingtype" id="Tee"/>
            <label className="form-check-label" htmlFor="Tee">
                T-Shirts
            </label>
            </div>
            <div className="form-check">
            <input value="Long Sleeve" checked={category === "Long Sleeve"}  onChange={handleCategory} className="form-check-input" type="checkbox" name="clothingtype" id="Long Sleeve"/>
            <label className="form-check-label" htmlFor="Long Sleeve">
                Long Sleeves
            </label>
            </div>
            <div className="form-check">
            <input value="Hoodie" checked={category === "Hoodie"}  onChange={handleCategory} className="form-check-input" type="checkbox" name="clothingtype" id="Hoodie"/>
            <label className="form-check-label" htmlFor="Hoodie">
                Hoodies
            </label>
            </div>
            <div className="form-check">
            <input value="Sweatpants" checked={category === "Sweatpants"}  onChange={handleCategory} className="form-check-input" type="checkbox" name="clothingtype" id="Sweatpants"/>
            <label className="form-check-label" htmlFor="Sweatpants">
                Sweatpants
            </label>
            </div>
        </div>
    </div>
    )
}