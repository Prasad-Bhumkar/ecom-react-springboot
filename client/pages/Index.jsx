import { Link } from "react-router-dom";

export default function Index() {
  const featuredCategories = [
    {
      id: 'electronics',
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
      description: 'Latest gadgets and tech'
    },
    {
      id: 'clothing',
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
      description: 'Trendy clothing & accessories'
    },
    {
      id: 'home',
      name: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
      description: 'Everything for your home'
    },
    {
      id: 'sports',
      name: 'Sports & Fitness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      description: 'Stay active and healthy'
    }
  ];

  const features = [
    {
      icon: 'bi-truck',
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: 'bi-arrow-clockwise',
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: 'bi-shield-check',
      title: 'Secure Payment',
      description: 'Your payment information is safe'
    },
    {
      icon: 'bi-headset',
      title: '24/7 Support',
      description: 'Get help whenever you need it'
    }
  ];

  return (
    <div className="min-vh-100">
      {/* Hero Section */}
      <section className="bg-gradient-hero">
        <div className="container py-5">
          <div className="row align-items-center py-5">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold text-dark mb-4 animate-fade-up">
                Discover Amazing Products at{" "}
                <span className="text-gradient">Great Prices</span>
              </h1>
              <p className="lead text-muted mb-4 animate-fade-up-delay-1">
                Shop from thousands of products across multiple categories. 
                Find exactly what you're looking for with our curated selection 
                of quality items at unbeatable prices.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 animate-fade-up-delay-2">
                <Link to="/products" className="btn btn-gradient btn-lg">
                  Shop Now
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <Link to="/products?category=1" className="btn btn-outline-primary btn-lg">
                  View Electronics
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center animate-fade-up-delay-3">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop" 
                alt="Shopping" 
                className="img-fluid rounded shadow-lg"
                style={{maxHeight: '400px'}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">Shop by Category</h2>
            <p className="lead text-muted">Explore our wide range of product categories</p>
          </div>
          <div className="row g-4">
            {featuredCategories.map((category) => (
              <div key={category.id} className="col-md-6 col-lg-3">
                <Link to={`/products?category=${category.id}`} className="text-decoration-none">
                  <div className="card card-feature h-100 overflow-hidden">
                    <img 
                      src={category.image} 
                      className="card-img-top" 
                      alt={category.name}
                      style={{height: '200px', objectFit: 'cover'}}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title fw-bold text-dark">{category.name}</h5>
                      <p className="card-text text-muted small">{category.description}</p>
                      <span className="btn btn-outline-primary btn-sm">
                        Browse Category
                        <i className="bi bi-arrow-right ms-1"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">Why Shop With Us?</h2>
            <p className="lead text-muted">We make shopping easy and enjoyable</p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3 text-center">
                <div className="feature-icon mx-auto mb-3">
                  <i className={`bi ${feature.icon} fs-3`}></i>
                </div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-gradient-cta text-white">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">Stay Updated</h2>
              <p className="mb-4" style={{opacity: '0.9'}}>
                Subscribe to our newsletter for the latest deals and new arrivals
              </p>
              <div className="row g-2 justify-content-center">
                <div className="col-md-8">
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="col-md-4">
                  <button className="btn btn-light btn-lg w-100 text-primary">
                    Subscribe
                  </button>
                </div>
              </div>
              <small className="d-block mt-3" style={{opacity: '0.8'}}>
                No spam, unsubscribe at any time
              </small>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-dark py-5">
        <div className="container">
          <div className="row py-4">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="d-flex align-items-center mb-3">
                <div className="navbar-brand-icon me-2">S</div>
                <span className="fs-4 fw-bold text-white">ShopFusion</span>
              </div>
              <p className="text-muted" style={{maxWidth: '300px'}}>
                Your one-stop destination for quality products at great prices. 
                We bring you the best shopping experience online.
              </p>
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="text-muted fs-4"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-muted fs-4"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-muted fs-4"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-muted fs-4"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <h6 className="fw-bold text-white mb-3">Shop</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/products" className="text-muted">All Products</Link></li>
                <li className="mb-2"><Link to="/products?category=electronics" className="text-muted">Electronics</Link></li>
                <li className="mb-2"><Link to="/products?category=clothing" className="text-muted">Clothing</Link></li>
                <li className="mb-2"><Link to="/products?category=home" className="text-muted">Home & Garden</Link></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <h6 className="fw-bold text-white mb-3">Support</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-muted">Help Center</a></li>
                <li className="mb-2"><a href="#" className="text-muted">Contact Us</a></li>
                <li className="mb-2"><a href="#" className="text-muted">Shipping Info</a></li>
                <li className="mb-2"><a href="#" className="text-muted">Returns</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <h6 className="fw-bold text-white mb-3">Company</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/about" className="text-muted">About</Link></li>
                <li className="mb-2"><a href="#" className="text-muted">Careers</a></li>
                <li className="mb-2"><a href="#" className="text-muted">Privacy Policy</a></li>
                <li className="mb-2"><a href="#" className="text-muted">Terms of Service</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold text-white mb-3">Account</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-muted">Sign In</a></li>
                <li className="mb-2"><a href="#" className="text-muted">Create Account</a></li>
                <li className="mb-2"><a href="#" className="text-muted">Order History</a></li>
                <li className="mb-2"><a href="#" className="text-muted">Wishlist</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-4" style={{borderColor: '#374151'}} />
          <div className="text-center">
            <p className="text-muted mb-0">&copy; 2024 ShopFusion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
