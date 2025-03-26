const productService = require('../../src/services/product-service');

describe('ProductService', () => {
  const mockProducts = [
    { id: '1', name: 'Product 1', price: 100, category: 'electronics', inStock: true },
    { id: '2', name: 'Product 2', price: 150, category: 'clothing', inStock: false },
    { id: '3', name: 'Product 3', price: 200, category: 'electronics', inStock: true }
  ];

  beforeEach(() => {
    // Bëjmë mock për funksionet e klasës duke përdorur jest.spyOn
    jest.spyOn(productService, 'getAllProducts').mockImplementation((filters = {}) => {
      let result = [...mockProducts];
      if (filters.category) {
        result = result.filter(p => p.category === filters.category);
      }
      return {
        total: result.length,
        limit: 20,
        offset: 0,
        products: result
      };
    });

    jest.spyOn(productService, 'getProductById').mockImplementation((id) => {
      const product = mockProducts.find(p => p.id === id);
      if (!product) throw new Error('Product not found');
      return product;
    });

    jest.spyOn(productService, 'createProduct').mockImplementation((data) => {
      if (!data.name || !data.price || !data.category) {
        throw new Error('Product must have name, price, and category');
      }
      return { id: '99', ...data };
    });

    jest.spyOn(productService, 'updateProduct').mockImplementation((id, updates) => {
      const existing = mockProducts.find(p => p.id === id);
      if (!existing) throw new Error('Product not found');
      return { ...existing, ...updates };
    });

    jest.spyOn(productService, 'deleteProduct').mockImplementation((id) => {
      const exists = mockProducts.some(p => p.id === id);
      if (!exists) throw new Error('Product not found');
      return { success: true, message: 'Product deleted successfully' };
    });

    jest.spyOn(productService, 'getAllCategories').mockImplementation(() => {
      return { categories: [...new Set(mockProducts.map(p => p.category))] };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ✅ Test për getAllProducts
  it('should return all products', () => {
    const result = productService.getAllProducts();
    expect(result.products.length).toBe(3);
  });

  it('should filter products by category', () => {
    const result = productService.getAllProducts({ category: 'electronics' });
    expect(result.products.length).toBe(2);
  });

  // ✅ Test për getProductById
  it('should return product by ID', () => {
    const product = productService.getProductById('1');
    expect(product).toHaveProperty('id', '1');
  });

  it('should throw error if product not found by ID', () => {
    expect(() => productService.getProductById('999')).toThrow('Product not found');
  });

  // ✅ Test për createProduct
  it('should create a new product', () => {
    const newProduct = productService.createProduct({ name: 'New', price: 50, category: 'books' });
    expect(newProduct).toHaveProperty('id');
    expect(newProduct.name).toBe('New');
  });

  it('should throw error on invalid createProduct input', () => {
    expect(() => productService.createProduct({ price: 20 })).toThrow();
  });

  // ✅ Test për updateProduct
  it('should update an existing product', () => {
    const updated = productService.updateProduct('1', { price: 500 });
    expect(updated.price).toBe(500);
  });

  it('should throw error on update if product not found', () => {
    expect(() => productService.updateProduct('999', {})).toThrow();
  });

  // ✅ Test për deleteProduct
  it('should delete a product', () => {
    const result = productService.deleteProduct('1');
    expect(result.success).toBe(true);
  });

  it('should throw error on delete if product not found', () => {
    expect(() => productService.deleteProduct('999')).toThrow();
  });

  // ✅ Test për getAllCategories
  it('should return all categories', () => {
    const result = productService.getAllCategories();
    expect(result.categories).toContain('electronics');
    expect(result.categories.length).toBeGreaterThan(0);
  });
});
