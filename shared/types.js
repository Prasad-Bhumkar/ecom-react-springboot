// Product object structure
export const ProductSchema = {
  id: 0,
  name: '',
  description: '',
  price: 0,
  image: '',
  category: '',
  stock: 0,
  rating: 0,
  reviews: 0,
  brand: '',
  specifications: {}
};

// Category object structure
export const CategorySchema = {
  id: '',
  name: '',
  description: '',
  image: '',
  productCount: 0
};

// Cart item object structure
export const CartItemSchema = {
  id: 0,
  productId: 0,
  quantity: 0,
  product: ProductSchema
};

// Cart object structure
export const CartSchema = {
  id: '',
  items: [],
  total: 0,
  itemCount: 0
};

// API response structure
export const ApiResponseSchema = {
  data: null,
  message: '',
  success: false
};

// Paginated response structure
export const PaginatedResponseSchema = {
  data: [],
  page: 0,
  pageSize: 0,
  total: 0,
  totalPages: 0
};

// Product filters structure
export const ProductFiltersSchema = {
  category: '',
  minPrice: 0,
  maxPrice: 0,
  search: '',
  sortBy: 'name',
  sortOrder: 'asc'
};
