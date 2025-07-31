import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock cart count (will be replaced with real data later)
  const cartItemCount = 0;

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-glass">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <div className="navbar-brand-icon me-2">
            S
          </div>
          <span className="fw-bold fs-4 text-dark">ShopFusion</span>
        </Link>

        {/* Mobile toggle button */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-5`}></i>
        </button>

        {/* Navigation items */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          {/* Center Navigation */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive('/') ? 'text-primary fw-bold' : 'text-muted'}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className={`nav-link ${isActive('/products') ? 'text-primary fw-bold' : 'text-muted'}`}>
                Products
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle text-muted" to="#" role="button" data-bs-toggle="dropdown">
                Categories
              </Link>
              <ul className="dropdown-menu">
                {categories.map(category => (
                  <li key={category.id}>
                    <Link className="dropdown-item" to={`/products?category=${category.id}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${isActive('/about') ? 'text-primary fw-bold' : 'text-muted'}`}>
                About
              </Link>
            </li>
          </ul>

          {/* Right side - Search, Cart, Account */}
          <div className="d-flex align-items-center gap-3">
            {/* Search */}
            <div className="d-none d-lg-block">
              <div className="input-group" style={{width: '250px'}}>
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && navigate(`/products?search=${searchInput}`)}
                />
                <button 
                  className="btn btn-outline-secondary btn-sm" 
                  type="button"
                  onClick={() => navigate(`/products?search=${searchInput}`)}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>

            {/* Cart */}
            <Link to="/cart" className="btn btn-outline-primary position-relative">
              <i className="bi bi-cart3 fs-5"></i>
              {cartItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i className="bi bi-person-circle me-1"></i>
                Account
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/login">Sign In</Link></li>
                <li><Link className="dropdown-item" to="/register">Sign Up</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/admin">Admin Panel</Link></li>
              </ul>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="d-lg-none mt-3">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && navigate(`/products?search=${searchInput}`)}
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => navigate(`/products?search=${searchInput}`)}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
