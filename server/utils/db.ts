export async function useDB() {
  const db = useDatabase();

  try {
    // Check if tables exist
    const tables = await db.sql`
      SELECT name FROM sqlite_master WHERE type='table' AND name='categories'
    `;

    if (tables.rows && tables.rows.length === 0) {
      console.log("Running database migrations...");

      // Initial schema
      await db.exec(`
        -- Categories table
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          alias TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Users table
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          name TEXT,
          phone TEXT,
          address TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Products table
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price REAL NOT NULL,
          short_description TEXT,
          long_description TEXT,
          sku TEXT UNIQUE,
          discount INTEGER DEFAULT 0,
          images TEXT,
          category_id INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories(id)
        );

        -- Orders table
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          email TEXT NOT NULL,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          delivery_address TEXT NOT NULL,
          total_amount REAL NOT NULL,
          status TEXT DEFAULT 'pending',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );

        -- Order items table
        CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id INTEGER NOT NULL,
          product_id INTEGER NOT NULL,
          quantity INTEGER DEFAULT 1,
          price REAL NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
          FOREIGN KEY (product_id) REFERENCES products(id)
        );

        -- Auth tokens table
        CREATE TABLE IF NOT EXISTS auth_tokens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          token TEXT NOT NULL UNIQUE,
          user_id INTEGER NOT NULL,
          expires_at DATETIME NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        -- Indexes
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
        CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
        CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
        CREATE INDEX IF NOT EXISTS idx_auth_tokens_token ON auth_tokens(token);
        CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
      `);

      // Seed data
      await db.exec(`
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
      `);

      console.log("✓ Database migrations completed");
    }
  } catch (error) {
    console.error("Migration error:", error);
  }

  return db;
}
