import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const popularPages = [
    { name: "Home", path: "/", icon: "bi-house" },
    { name: "Products", path: "/products", icon: "bi-grid" },
    { name: "Electronics", path: "/products?category=electronics", icon: "bi-phone" },
    { name: "Clothing", path: "/products?category=clothing", icon: "bi-bag" },
    { name: "Cart", path: "/cart", icon: "bi-cart3" },
    { name: "About", path: "/about", icon: "bi-info-circle" }
  ];

  return (
    <div className="min-vh-100 bg-gradient-hero d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-6">
            {/* 404 Illustration */}
            <div className="mb-5">
              <div className="display-1 fw-bold text-primary mb-3" style={{ fontSize: '8rem' }}>
                404
              </div>
              <div className="mb-4">
                <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="h2 fw-bold mb-3">Oops! Page Not Found</h1>
            <p className="lead text-muted mb-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-muted mb-5">
              You tried to access: <code className="bg-light p-1 rounded">{location.pathname}</code>
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
              <Link to="/" className="btn btn-gradient btn-lg">
                <i className="bi bi-house me-2"></i>
                Go Home
              </Link>
              <Link to="/products" className="btn btn-outline-primary btn-lg">
                <i className="bi bi-grid me-2"></i>
                Browse Products
              </Link>
            </div>

            {/* Popular Pages */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-4">Popular Pages</h5>
                <div className="row g-3">
                  {popularPages.map((page, index) => (
                    <div key={index} className="col-md-4 col-6">
                      <Link 
                        to={page.path} 
                        className="text-decoration-none d-block p-3 rounded hover-bg-light border"
                        style={{ transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <i className={`bi ${page.icon} fs-4 text-primary d-block mb-2`}></i>
                        <span className="small fw-semibold text-dark">{page.name}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-5 pt-4 border-top">
              <p className="text-muted mb-3">Still can't find what you're looking for?</p>
              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                <a href="mailto:support@shopfusion.com" className="btn btn-outline-secondary btn-sm">
                  <i className="bi bi-envelope me-1"></i>
                  Contact Support
                </a>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => window.history.back()}
                >
                  <i className="bi bi-arrow-left me-1"></i>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
