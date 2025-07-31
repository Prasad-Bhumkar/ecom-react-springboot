import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'name');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'asc');

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, searchQuery, minPrice, maxPrice, sortBy, sortOrder]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (sortBy !== 'name') params.set('sortBy', sortBy);
    if (sortOrder !== 'asc') params.set('sortOrder', sortOrder);
    if (currentPage !== 1) params.set('page', currentPage.toString());
    
    setSearchParams(params);
  }, [selectedCategory, searchQuery, minPrice, maxPrice, sortBy, sortOrder, currentPage, setSearchParams]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data); // Backend now returns List<Category> directly
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: (currentPage - 1).toString(), // Spring Data JPA is 0-indexed
        size: '12', // Use 'size' for page size
        sort: `${sortBy},${sortOrder}` // Spring Data JPA sort format
      });
      
      if (selectedCategory) params.set('category', selectedCategory);
      if (searchQuery) params.set('search', searchQuery);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);

      const response = await fetch(`/api/products?${params}`);
      const pageData = await response.json(); // Backend now returns Page<ProductDTO>
      
      setProducts(pageData.content);
      setTotalPages(pageData.totalPages);
      setTotal(pageData.totalElements);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('name');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (loading && products.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-lg-3 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Filters</h5>
            </div>
            <div className="card-body">
              {/* Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <label className="form-label fw-bold">Search</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>

              {/* Categories */}
              <div className="mb-4">
                <label className="form-label fw-bold">Category</label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <label className="form-label fw-bold">Price Range</label>
                <div className="row g-2">
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div className="mb-4">
                <label className="form-label fw-bold">Sort By</label>
                <div className="row g-2">
                  <div className="col-8">
                    <select
                      className="form-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <select
                      className="form-select"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="asc">Asc</option>
                      <option value="desc">Desc</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                className="btn btn-outline-secondary w-100"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-lg-9">
          {/* Results Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="h4 mb-1">Products</h2>
              <p className="text-muted mb-0">
                {loading ? 'Loading...' : `Showing ${products.length} of ${total} products`}
              </p>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Products Grid */}
          {!loading && products.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search fs-1 text-muted mb-3 d-block"></i>
              <h4>No products found</h4>
              <p className="text-muted">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <div className="row g-4 mb-4">
                {products.map((product) => (
                  <div key={product.id} className="col-md-6 col-xl-4">
                    <div className="card card-feature h-100">
                      <div className="position-relative overflow-hidden">
                        <img
                          src={product.image}
                          className="card-img-top"
                          alt={product.name}
                          style={{ height: '250px', objectFit: 'cover' }}
                          onError={(e) => { e.target.onerror = null; e.target.src='/placeholder.svg' }}
                        />
                        {product.stock < 10 && product.stock > 0 && (
                          <span className="position-absolute top-0 end-0 m-2 badge bg-warning">
                            Low Stock
                          </span>
                        )}
                        {product.stock === 0 && (
                          <span className="position-absolute top-0 end-0 m-2 badge bg-danger">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <div className="card-body d-flex flex-column">
                        <div className="mb-2">
                          <span className="badge bg-light text-primary small">
                            {product.categoryName}
                          </span>
                        </div>
                        <h5 className="card-title fw-bold" style={{ fontSize: '1rem' }}>
                          {product.name}
                        </h5>
                        <p className="card-text text-muted small flex-fill">
                          {product.description && product.description.length > 100 
                            ? `${product.description.substring(0, 100)}...` 
                            : product.description}
                        </p>
                        <div className="d-flex align-items-center mb-2">
                          <div className="text-warning me-2">
                            {[...Array(5)].map((_, i) => (
                              <i 
                                key={i} 
                                className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star'}`}
                              ></i>
                            ))}
                          </div>
                          <small className="text-muted">({product.reviews})</small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <span className="h5 text-primary fw-bold">${product.price.toFixed(2)}</span>
                            {product.brand && (
                              <div className="small text-muted">{product.brand}</div>
                            )}
                          </div>
                          <Link 
                            to={`/products/${product.id}`} 
                            className="btn btn-primary btn-sm"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav aria-label="Products pagination">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {generatePageNumbers().map(page => (
                      <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}