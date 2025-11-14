# SQLite Database Implementation

Всі серверні ендпоінти тепер працюють з локальною SQLite базою даних замість проксування до зовнішнього API.

## 📁 Структура бази даних

### Таблиці:
- **categories** - Категорії продуктів
- **users** - Користувачі
- **products** - Продукти
- **orders** - Замовлення
- **order_items** - Товари в замовленні
- **auth_tokens** - Токени аутентифікації

## 🚀 Запуск

База даних автоматично ініціалізується при першому запуску сервера:

\`\`\`bash
npm run dev
\`\`\`

При першому запуску:
1. Створюються всі таблиці
2. Додаються тестові дані (категорії, продукти, тестовий користувач)
3. База зберігається в `.data/db.sqlite3`

## 🧪 Тестові дані

### Користувач:
- Email: `admin@email.com`
- Password: `123`

### Продукти:
- 5 товарів у різних категоріях
- Laptop Pro 15, Wireless Mouse, Cotton T-Shirt, Programming Book, Garden Tools Set

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Реєстрація
- `POST /api/auth/login` - Вхід

### Categories
- `GET /api/categories` - Список категорій

### Products
- `GET /api/products?limit=20&offset=0&category_id=1&search=laptop` - Список продуктів
- `GET /api/products/:id` - Продукт за ID

### Orders
- `POST /api/orders` - Створити замовлення (гість)
- `GET /api/orders` - Список замовлень (з авторизацією)
- `POST /api/orders/auth` - Створити замовлення (з авторизацією)

### Favorites
- `GET /api/favorites?email=user@example.com` - Отримати favorites
- `POST /api/favorites` - Зберегти favorites

## 🔐 Аутентифікація

Після login/register отримуєте токен, який потрібно передавати в заголовку:

\`\`\`
Authorization: Bearer <token>
\`\`\`

Токени зберігаються в БД і діють 30 днів.

## 📝 Приклади cURL

\`\`\`bash
# Register
curl --request POST \\
  --url http://localhost:3000/api/auth/register \\
  --header 'Content-Type: application/json' \\
  --data '{
  "email": "admin@email.com",
  "password": "123"
}'

# Login
curl --request POST \\
  --url http://localhost:3000/api/auth/login \\
  --header 'Content-Type: application/json' \\
  --data '{
  "email": "admin@email.com",
  "password": "123"
}'

# Get categories
curl --request GET \\
  --url http://localhost:3000/api/categories

# Get products
curl --request GET \\
  --url 'http://localhost:3000/api/products?limit=10&offset=0'

# Get product by ID
curl --request GET \\
  --url http://localhost:3000/api/products/1

# Create order (guest)
curl --request POST \\
  --url http://localhost:3000/api/orders \\
  --header 'Content-Type: application/json' \\
  --data '{
  "product_ids": [1, 2, 3],
  "email": "order@example.com",
  "password": "password123",
  "delivery_address": "ул. Пушкина, д. 10, кв. 5",
  "name": "Иван Иванов",
  "phone": "+7 (999) 123-45-67"
}'

# Get orders (authenticated)
curl --request GET \\
  --url http://localhost:3000/api/orders \\
  --header 'Authorization: Bearer YOUR_TOKEN_HERE'

# Create order (authenticated)
curl --request POST \\
  --url http://localhost:3000/api/orders/auth \\
  --header 'Authorization: Bearer YOUR_TOKEN_HERE' \\
  --header 'Content-Type: application/json' \\
  --data '{
  "product_ids": [1, 2],
  "delivery_address": "ул. Ленина, д. 20, кв. 15",
  "name": "Иван Петров",
  "phone": "+7 (999) 987-65-43"
}'
\`\`\`

## ⚙️ Налаштування

База даних налаштована в `nuxt.config.ts`:

\`\`\`typescript
nitro: {
  experimental: {
    database: true,
  },
  database: {
    default: {
      connector: 'sqlite',
      options: { name: 'db' }
    }
  }
}
\`\`\`

## 🛠️ Utilities

- `server/utils/db.ts` - Функція для отримання з'єднання з БД та міграцій
- `server/utils/auth.ts` - Функція для валідації токенів
- `server/plugins/database.ts` - Плагін для ініціалізації БД при старті сервера

## ⚠️ Важливо

- Паролі зберігаються у відкритому вигляді (в production потрібно хешувати!)
- База даних SQLite підходить для розробки та невеликих проектів
- Для production рекомендується використовувати PostgreSQL або MySQL
