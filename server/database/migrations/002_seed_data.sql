-- Seed categories
INSERT OR IGNORE INTO categories (id, name, alias) VALUES 
  (1, 'Electronics', 'electronics'),
  (2, 'Clothing', 'clothing'),
  (3, 'Books', 'books'),
  (4, 'Home & Garden', 'home-garden'),
  (5, 'Sports', 'sports');

-- Seed products
INSERT OR IGNORE INTO products (id, name, price, short_description, long_description, sku, discount, images, category_id) VALUES 
  (1, 'Laptop Pro 15', 1299.99, 'High-performance laptop', 'Professional laptop with 16GB RAM and 512GB SSD', 'LAP-001', 10, '["https://via.placeholder.com/300"]', 1),
  (2, 'Wireless Mouse', 29.99, 'Ergonomic wireless mouse', 'Comfortable wireless mouse with precision tracking', 'MOU-001', 0, '["https://via.placeholder.com/300"]', 1),
  (3, 'Cotton T-Shirt', 19.99, 'Comfortable cotton t-shirt', '100% cotton, available in multiple colors', 'TSH-001', 15, '["https://via.placeholder.com/300"]', 2),
  (4, 'Programming Book', 49.99, 'Learn to code', 'Comprehensive guide to modern programming', 'BOO-001', 5, '["https://via.placeholder.com/300"]', 3),
  (5, 'Garden Tools Set', 89.99, 'Complete gardening set', 'Everything you need for your garden', 'GAR-001', 20, '["https://via.placeholder.com/300"]', 4);

-- Seed test user
INSERT OR IGNORE INTO users (id, email, password, name, phone, address) VALUES 
  (1, 'admin@email.com', '123', 'Admin User', '+1234567890', '123 Main St');
