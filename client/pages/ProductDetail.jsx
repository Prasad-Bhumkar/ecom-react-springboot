import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [relatedProductsError, setRelatedProductsError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product details.");
        console.error("Failed to fetch product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`/api/products/${id}/related`);
        if (!response.ok) {
          setRelatedProducts([]);
          return;
        }
        const data = await response.json();
        setRelatedProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch related products:", err);
        setRelatedProducts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [id]);

  const getCartId = () => {
    return localStorage.getItem('cartId') || 'default-cart';
  };

  const addToCart = async () => {
    try {
      const cartId = getCartId();
      const response = await fetch(`/api/cart/${cartId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      alert('Product added to cart successfully!');
    } catch (err) {
      console.error('Error adding product to cart:', err);
      alert('Failed to add product to cart');
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid rounded" onError={(e) => { e.target.onerror = null; e.target.src='/placeholder.svg' }} />
        </div>
        <div className="col-md-6">
          <h1 className="display-6 fw-bold">{product.name}</h1>
          <div className="d-flex align-items-center mb-3">
            <div className="text-warning me-2">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star'}`}
                ></i>
              ))}
            </div>
            <small className="text-muted">({product.reviews} reviews)</small>
          </div>
          <p className="lead">{product.description}</p>
          {product.price && <p className="h4 text-primary fw-bold">${product.price.toFixed(2)}</p>}
          <div className="mt-4">
            <div className="d-flex gap-2">
              <input 
                type="number" 
                className="form-control" 
                value={quantity}
                min="1" 
                style={{ maxWidth: '80px' }} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
            </div>
            {product.stock < 10 && product.stock > 0 && (
              <div className="mt-3 text-warning">
                Only {product.stock} items left in stock!
              </div>
            )}
            {product.stock === 0 && (
              <div className="mt-3 text-danger">
                Out of stock
              </div>
            )}
          </div>
          <div className="mt-4">
            <h5 className="fw-bold">Details</h5>
            <ul className="list-unstyled">
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Category:</strong> {product.categoryName}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="mb-3">Related Products</h3>
        <div className="row g-4">
          {relatedLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="col-md-4 col-lg-3">
                <div className="card h-100">
                  <img src={relatedProduct.image} className="card-img-top" alt={relatedProduct.name} onError={(e) => { e.target.onerror = null; e.target.src='/placeholder.svg' }} />
                  <div className="card-body">
                    <h5 className="card-title">{relatedProduct.name}</h5>
                    <p className="card-text text-muted small">
                      {relatedProduct.description.substring(0, 100)}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 text-primary fw-bold">${relatedProduct.price.toFixed(2)}</span>
                      <Link to={`/products/${relatedProduct.id}`} className="btn btn-outline-primary btn-sm">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col">
              <p>No related products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
