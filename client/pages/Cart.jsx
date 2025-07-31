import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('processing');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    fetchCart();
  }, []);

  const getCartId = () => {
    return localStorage.getItem('cartId') || 'default-cart';
  };

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const cartId = getCartId();
      const response = await fetch(`/api/cart/${cartId}`);
      const data = await response.json();
      
      setCart(data);
    } catch (err) {
      setError('Failed to fetch cart');
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (itemId, newQuantity) => {
    if (!cart) return;
    
    setUpdatingItems(prev => new Set(prev).add(itemId));
    
    try {
      const cartId = getCartId();
      const response = await fetch(`/api/cart/${cartId}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error('Failed to update item:', err);
      alert('Failed to update item');
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const removeItem = async (itemId) => {
    if (!cart) return;
    
    setUpdatingItems(prev => new Set(prev).add(itemId));
    
    try {
      const cartId = getCartId();
      const response = await fetch(`/api/cart/${cartId}/items/${itemId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error('Failed to remove item:', err);
      alert('Failed to remove item');
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const clearCart = async () => {
    if (!cart || cart.items.length === 0) return;
    
    if (!confirm('Are you sure you want to clear your cart?')) return;
    
    setLoading(true);
    
    try {
      const cartId = getCartId();
      const response = await fetch(`/api/cart/${cartId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error('Failed to clear cart:', err);
      alert('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) return;
    
    setShowCheckoutModal(true);
    setCheckoutStep('processing');
    setCountdown(5);
    
    // Simulate processing for 2 seconds, then show success/failure
    setTimeout(() => {
      // 90% success rate for demo
      const isSuccess = Math.random() > 0.1;
      setCheckoutStep(isSuccess ? 'success' : 'failed');
      
      if (isSuccess) {
        // Start countdown for success
        const countdownInterval = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              setShowCheckoutModal(false);
              // Clear cart on successful checkout
              clearCart();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }, 2000);
  };

  const closeCheckoutModal = () => {
    setShowCheckoutModal(false);
    setCheckoutStep('processing');
    setCountdown(5);
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <i className="bi bi-exclamation-triangle fs-1 text-warning mb-3 d-block"></i>
          <h4>Error Loading Cart</h4>
          <p className="text-muted">{error}</p>
          <button className="btn btn-primary" onClick={fetchCart}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <i className="bi bi-cart3 fs-1 text-muted mb-3 d-block"></i>
          <h4>Your cart is empty</h4>
          <p className="text-muted">Start shopping to add items to your cart</p>
          <Link to="/products" className="btn btn-primary">
            <i className="bi bi-arrow-left me-2"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 fw-bold">Shopping Cart</h1>
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={clearCart}
              disabled={cart.items.length === 0}
            >
              <i className="bi bi-trash me-1"></i>
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                Cart Items ({cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'})
              </h5>
            </div>
            <div className="card-body p-0">
              {cart.items.map((item) => (
                <div key={item.id} className="p-4 border-bottom">
                  <div className="row align-items-center">
                    {/* Product Image */}
                    <div className="col-md-2 text-center mb-3 mb-md-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: '80px', maxWidth: '80px', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="col-md-4 mb-3 mb-md-0">
                      <h6 className="fw-bold mb-1">
                        <Link 
                          to={`/products/${item.product.id}`} 
                          className="text-decoration-none text-dark"
                        >
                          {item.product.name}
                        </Link>
                      </h6>
                      {item.product.brand && (
                        <p className="text-muted small mb-1">by {item.product.brand}</p>
                      )}
                      <p className="text-muted small mb-0">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div className="input-group" style={{ maxWidth: '140px' }}>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={updatingItems.has(item.id) || item.quantity <= 1}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <input
                          type="number"
                          className="form-control form-control-sm text-center"
                          value={item.quantity}
                          min="1"
                          max={item.product.stock}
                          onChange={(e) => {
                            const newQty = Math.max(1, Math.min(item.product.stock, parseInt(e.target.value) || 1));
                            updateItemQuantity(item.id, newQty);
                          }}
                          disabled={updatingItems.has(item.id)}
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => updateItemQuantity(item.id, Math.min(item.product.stock, item.quantity + 1))}
                          disabled={updatingItems.has(item.id) || item.quantity >= item.product.stock}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                      {item.quantity > item.product.stock && (
                        <small className="text-danger">Only {item.product.stock} available</small>
                      )}
                    </div>

                    {/* Price and Actions */}
                    <div className="col-md-3 text-md-end">
                      <div className="fw-bold text-primary mb-2">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeItem(item.id)}
                        disabled={updatingItems.has(item.id)}
                      >
                        {updatingItems.has(item.id) ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <i className="bi bi-trash"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-4">
            <Link to="/products" className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cart.itemCount} items)</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${(cart.total * 0.08).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold h5">
                <span>Total</span>
                <span className="text-primary">${(cart.total * 1.08).toFixed(2)}</span>
              </div>
              
              <div className="d-grid gap-2 mt-4">
                <button 
                  className="btn btn-gradient btn-lg"
                  onClick={handleCheckout}
                  disabled={!cart || cart.items.length === 0}
                >
                  <i className="bi bi-credit-card me-2"></i>
                  Proceed to Checkout
                </button>
                <small className="text-muted text-center">
                  Secure checkout with 256-bit SSL encryption
                </small>
              </div>

              {/* Security Features */}
              <div className="mt-4 pt-3 border-top">
                <div className="row text-center">
                  <div className="col-4">
                    <i className="bi bi-shield-check text-success d-block mb-1"></i>
                    <small className="text-muted">Secure</small>
                  </div>
                  <div className="col-4">
                    <i className="bi bi-truck text-primary d-block mb-1"></i>
                    <small className="text-muted">Free Ship</small>
                  </div>
                  <div className="col-4">
                    <i className="bi bi-arrow-clockwise text-info d-block mb-1"></i>
                    <small className="text-muted">Returns</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="card mt-4">
            <div className="card-body">
              <h6 className="card-title">Have a promo code?</h6>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter code"
                  disabled
                />
                <button className="btn btn-outline-secondary" disabled>
                  Apply
                </button>
              </div>
              <small className="text-muted">Promo codes coming soon</small>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  {checkoutStep === 'processing' && 'Processing Order...'}
                  {checkoutStep === 'success' && 'Order Successful!'}
                  {checkoutStep === 'failed' && 'Order Failed'}
                </h5>
                {checkoutStep !== 'processing' && (
                  <button type="button" className="btn-close" onClick={closeCheckoutModal}></button>
                )}
              </div>
              <div className="modal-body text-center py-5">
                {checkoutStep === 'processing' && (
                  <>
                    <div className="spinner-border text-primary mb-4" style={{ width: '3rem', height: '3rem' }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <h4 className="mb-3">Processing your payment...</h4>
                    <p className="text-muted">Please wait while we securely process your order.</p>
                    <div className="progress mt-4">
                      <div 
                        className="progress-bar progress-bar-striped progress-bar-animated" 
                        role="progressbar" 
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </>
                )}
                
                {checkoutStep === 'success' && (
                  <>
                    <div className="text-success mb-4">
                      <i className="bi bi-check-circle-fill" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h4 className="text-success mb-3">Payment Successful!</h4>
                    <p className="text-muted mb-4">
                      Thank you for your order! You will receive a confirmation email shortly.
                    </p>
                    <div className="alert alert-success">
                      <strong>Order #</strong> ORD-{Date.now().toString().slice(-6)}
                      <br />
                      <strong>Total:</strong> ${(cart?.total ? cart.total * 1.08 : 0).toFixed(2)}
                    </div>
                    <p className="small text-muted">
                      This window will close automatically in <strong>{countdown}</strong> seconds
                    </p>
                  </>
                )}
                
                {checkoutStep === 'failed' && (
                  <>
                    <div className="text-danger mb-4">
                      <i className="bi bi-x-circle-fill" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h4 className="text-danger mb-3">Payment Failed</h4>
                    <p className="text-muted mb-4">
                      We were unable to process your payment. Please try again or contact support.
                    </p>
                    <div className="alert alert-danger">
                      <strong>Error:</strong> Payment could not be processed at this time.
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer border-0 justify-content-center">
                {checkoutStep === 'failed' && (
                  <>
                    <button type="button" className="btn btn-secondary" onClick={closeCheckoutModal}>
                      Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleCheckout}>
                      Try Again
                    </button>
                  </>
                )}
                {checkoutStep === 'success' && (
                  <button type="button" className="btn btn-primary" onClick={closeCheckoutModal}>
                    Continue Shopping
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
