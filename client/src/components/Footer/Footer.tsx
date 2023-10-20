export default function Footer() {
    return (
        <div className="w-100 bg-dark mt-5">
        <div className="container text-light">
  <footer className="py-5">
    <div className="row">
      <div className="col-6 col-md-2 mb-3">
        <h5>Shop</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-light">Home</a></li>
          <li className="nav-item mb-2"><a href="/products" className="nav-link p-0 text-light">Products</a></li>
          <li className="nav-item mb-2"><a href="/ourStory" className="nav-link p-0 text-light">Our Story</a></li>
          <li className="nav-item mb-2"><a href="/materials" className="nav-link p-0 text-light">Our Materials</a></li>
        </ul>
      </div>

      <div className="col-6 col-md-2 mb-3">
        <h5>Help</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="tel:222-222-2222" className="nav-link p-0 text-light">+1 222-222-2222</a></li>
          <li className="nav-item mb-2"><a href="mailto:support@website.com" className="nav-link p-0 text-light">support@website.com</a></li>
          <li className="nav-item mb-2"><a href="/returns" className="nav-link p-0 text-light">Returns/Exchanges</a></li>
          <li className="nav-item mb-2"><a href="/faq" className="nav-link p-0 text-light">FAQs/Contact Us</a></li>
        </ul>
      </div>


      <div className="col-md-5 offset-md-1 mb-3">
        <form>
          <h5>Subscribe to our newsletter</h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <div className="d-flex flex-column flex-sm-row w-100 gap-2">
            <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" className="form-control" placeholder="Email address"/>
            <button className="btn btn-primary" type="button">Subscribe</button>
          </div>
        </form>
      </div>
    </div>

    <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
      <p>&copy; 2023 Company, Inc. All rights reserved.</p>
      <ul className="list-unstyled d-flex">
        <li className="ms-3"><a className="link-light" target="_blank" href="https://twitter.com/"><p>Twitter</p></a></li>
        <li className="ms-3"><a className="link-light" target="_blank" href="https://www.instagram.com/"><p>Instagram</p></a></li>
        <li className="ms-3"><a className="link-light" target="_blank" href="https://www.facebook.com/"><p>Facebook</p></a></li>
      </ul>
    </div>
  </footer>
</div>
</div>
    )
}