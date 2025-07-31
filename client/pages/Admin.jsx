import { useState, useEffect } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: ''
  });
  // Category CRUD
  const openCreateCategoryModal = () => {
    setIsEditingCategory(false);
    setSelectedCategory(null);
    setCategoryFormData({ name: '', description: '' });
    setShowCategoryModal(true);
  };

  const openEditCategoryModal = (category) => {
    setIsEditingCategory(true);
    setSelectedCategory(category);
    setCategoryFormData({ name: category.name, description: category.description });
    setShowCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setSelectedCategory(null);
    setIsEditingCategory(false);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditingCategory ? `/api/categories/${selectedCategory?.id}` : '/api/categories';
      const method = isEditingCategory ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryFormData)
      });
      let data = null;
      try { data = await response.json(); } catch {}
      if (response.ok) {
        alert(`Category ${isEditingCategory ? 'updated' : 'created'} successfully!`);
        closeCategoryModal();
        fetchCategories();
      } else {
        alert((data && data.message) || `Failed to ${isEditingCategory ? 'update' : 'create'} category`);
      }
    } catch (err) {
      console.error('Failed to save category:', err);
      alert(`Failed to ${isEditingCategory ? 'update' : 'create'} category`);
    }
  };

  const handleDeleteCategory = async (category) => {
    if (!confirm(`Are you sure you want to delete category "${category.name}"?`)) return;
    try {
      const response = await fetch(`/api/categories/${category.id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Category deleted successfully!');
        fetchCategories();
      } else {
        const data = await response.json().catch(() => ({ message: 'Failed to delete category' }));
        alert(data.message);
      }
    } catch (err) {
      console.error('Failed to delete category:', err);
      alert('Failed to delete category');
    }
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData(prev => ({ ...prev, [name]: value }));
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    categoryId: '',
    stock: 0,
    brand: '',
    rating: 0,
    reviews: 0
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      // data is an array
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: (currentPage - 1).toString(), // backend expects 0-based page
        pageSize: '10'
      });
      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      // data.content is the array of products
      setProducts(Array.isArray(data.content) ? data.content : []);
      setTotalPages(data.totalPages || data.total_pages || 1);
      setTotal(data.totalElements || data.total || 0);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      categoryId: categories[0]?.id || '',
      stock: 0,
      brand: '',
      rating: 0,
      reviews: 0
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      categoryId: product.categoryId || product.category,
      stock: product.stock,
      brand: product.brand || '',
      rating: product.rating,
      reviews: product.reviews
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/products/${selectedProduct?.id}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      let data = null;
      try { data = await response.json(); } catch {}
      if (response.ok) {
        alert(`Product ${isEditing ? 'updated' : 'created'} successfully!`);
        closeModal();
        fetchProducts();
      } else {
        alert((data && data.message) || `Failed to ${isEditing ? 'update' : 'create'} product`);
      }
    } catch (err) {
      console.error('Failed to save product:', err);
      alert(`Failed to ${isEditing ? 'update' : 'create'} product`);
    }
  };

  const handleDelete = async (product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Product deleted successfully!');
        fetchProducts();
      } else {
        const data = await response.json().catch(() => ({ message: 'Failed to delete product' }));
        alert(data.message);
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert('Failed to delete product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };

  // Update category field to categoryId to match backend DTO
  useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData(prev => ({ ...prev, category: categories[0].id }));
    }
  }, [categories]);

  if (loading && products.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 fw-bold">Admin Panel</h1>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={openCreateCategoryModal}>
            <i className="bi bi-tags me-1"></i> Add Categories
          </button>
          <button className="btn btn-primary" onClick={openCreateModal}>
            <i className="bi bi-plus-circle me-2"></i>
            Add Product
          </button>
          
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Category Table */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Categories ({categories.length} total)</h5>
          
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(categories) ? categories.length : 0) === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">No categories found.</td>
                  </tr>
                ) : (
                  (Array.isArray(categories) ? categories : []).map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary" onClick={() => openEditCategoryModal(category)}>
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-outline-danger" onClick={() => handleDeleteCategory(category)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Products ({total} total)</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <tr>
                    <td colSpan="8" className="text-center text-danger py-4">{error}</td>
                  </tr>
                ) : (Array.isArray(products) ? products.length : 0) === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">No products found.</td>
                  </tr>
                ) : (
                  (Array.isArray(products) ? products : []).map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="rounded"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          onError={(e) => { e.target.onerror = null; e.target.src='/placeholder.svg' }}
                        />
                      </td>
                      <td>
                        <div>
                          <strong>{product.name}</strong>
                          {product.brand && <div className="small text-muted">{product.brand}</div>}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {categories.find(c => c.id === product.category)?.name || product.category}
                        </span>
                      </td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="me-1">{product.rating.toFixed(1)}</span>
                          <i className="bi bi-star-fill text-warning"></i>
                          <small className="text-muted ms-1">({product.reviews})</small>
                        </div>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => openEditModal(product)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(product)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Products pagination" className="mt-4">
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
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
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

      {/* Product Form Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                  </h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description *</label>
                      <textarea
                        className="form-control"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Category *</label>
                      <select
                        className="form-select"
                        name="categoryId"
                        value={formData.categoryId || formData.category}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData(prev => ({ ...prev, categoryId: value }));
                        }}
                        required
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Price *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Stock *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Rating</label>
                      <input
                        type="number"
                        className="form-control"
                        name="rating"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Reviews Count</label>
                      <input
                        type="number"
                        className="form-control"
                        name="reviews"
                        min="0"
                        value={formData.reviews}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Image URL *</label>
                      <input
                        type="url"
                        className="form-control"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                      />
                      {formData.image && (
                        <div className="mt-2">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: '100px' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Category Form Modal */}
      {showCategoryModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleCategorySubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditingCategory ? 'Edit Category' : 'Add New Category'}
                  </h5>
                  <button type="button" className="btn-close" onClick={closeCategoryModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={categoryFormData.name}
                      onChange={handleCategoryInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows={2}
                      value={categoryFormData.description}
                      onChange={handleCategoryInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeCategoryModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEditingCategory ? 'Update Category' : 'Create Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
