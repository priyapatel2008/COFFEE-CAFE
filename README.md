# ☕ BeanStack Coffee Shop - Full Stack Project

A complete full-stack coffee shop web application with backend API and frontend web interface.

## 📁 Project Structure

```
COFFEE SHOP/
├── frontend files (HTML, CSS, JS)
│   ├── index.html
│   ├── login.html
│   ├── menu.html
│   ├── about.html
│   ├── contact.html
│   ├── script.js
│   ├── api.js
│   ├── auth.js
│   └── backend-integration.js
│
└── backend/
    ├── server.js
    ├── package.json
    ├── .env
    ├── models/
    │   ├── User.js
    │   ├── Product.js
    │   └── Order.js
    ├── controllers/
    │   ├── authController.js
    │   ├── productController.js
    │   └── orderController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   └── orderRoutes.js
    ├── middleware/
    │   └── auth.js
    ├── seed.js
    └── README.md
```

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v14+) - Download from https://nodejs.org/
- **MongoDB** - Either:
  - Local: https://www.mongodb.com/try/download/community
  - Cloud: https://www.mongodb.com/cloud/atlas (recommended)

### Step 1: Start MongoDB

**If using MongoDB Community Edition locally:**
```bash
# Windows
net start MongoDB

# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**If using MongoDB Atlas (Cloud):**
- Create a cluster and get your connection string from the Atlas dashboard
- Update it in `backend/.env`

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Seed Database with Products

```bash
node seed.js
```

This will add sample coffee products to your database.

### Step 4: Start the Backend Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

You should see: `Server running on port 5000`

### Step 5: Open Frontend

Open `index.html` in your web browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server
```

Then visit: `http://localhost:8000`

## 🔐 Authentication

### Register
1. Click "Sign up now" on login page
2. Enter name, email, password
3. Account is created and you're logged in

### Login
1. Enter email and password
2. Token is stored locally
3. You can now place orders

### Token Storage
- JWT token stored in `localStorage` as `authToken`
- User info stored as `currentUser`
- Tokens expire after 7 days

## 🛍️ Features

### Frontend
- ✅ Product browsing
- ✅ Shopping cart (localStorage)
- ✅ User authentication
- ✅ Order placement
- ✅ User profile
- ✅ Contact form
- ✅ Responsive design

### Backend API
- ✅ User registration & login
- ✅ JWT authentication
- ✅ Product management
- ✅ Order management
- ✅ User profiles
- ✅ Email validation
- ✅ Password hashing (bcrypt)

## 📡 API Endpoints

### Auth Endpoints
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
GET    /api/auth/profile           - Get user profile (requires token)
PUT    /api/auth/profile           - Update profile (requires token)
```

### Product Endpoints
```
GET    /api/products               - Get all products
GET    /api/products/category/:cat - Get by category
GET    /api/products/:id           - Get single product
POST   /api/products               - Create product (requires token)
PUT    /api/products/:id           - Update product (requires token)
DELETE /api/products/:id           - Delete product (requires token)
```

### Order Endpoints
```
POST   /api/orders                 - Create order (requires token)
GET    /api/orders/user/orders     - Get user orders (requires token)
GET    /api/orders/all             - Get all orders (requires token)
GET    /api/orders/:id             - Get order details (requires token)
PUT    /api/orders/:id/status      - Update status (requires token)
PUT    /api/orders/:id/cancel      - Cancel order (requires token)
```

## 🧪 Testing the API

### Using Postman

1. **Download Postman**: https://www.postman.com/downloads/

2. **Register User**
   ```
   POST http://localhost:5000/api/auth/register
   
   Body (JSON):
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "confirmPassword": "password123"
   }
   ```

3. **Login**
   ```
   POST http://localhost:5000/api/auth/login
   
   Body (JSON):
   {
     "email": "john@example.com",
     "password": "password123"
   }
   
   Response includes token:
   {
     "success": true,
     "token": "eyJhbGc...",
     "user": { ... }
   }
   ```

4. **Use Token in Requests**
   - Add header: `Authorization: Bearer <token>`

5. **Get All Products**
   ```
   GET http://localhost:5000/api/products
   ```

6. **Create Order**
   ```
   POST http://localhost:5000/api/orders
   Headers: Authorization: Bearer <token>
   
   Body (JSON):
   {
     "items": [
       {
         "name": "Espresso",
         "price": 3.99,
         "qty": 2,
         "emoji": "☕"
       }
     ],
     "totalAmount": 7.98,
     "deliveryAddress": "123 Main St",
     "paymentMethod": "credit_card"
   }
   ```

## 📝 Environment Variables

Create `.env` file in `backend/` folder:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/coffeeShop
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=development
```

**Important:** Change JWT_SECRET in production!

## 🔧 Configuration

### Change Default Port

Edit `backend/.env`:
```
PORT=3000
```

### Change MongoDB Connection

**Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/coffeeShop
```

**MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coffeeShop
```

## ⚠️ Common Issues

### Backend won't start
- Check if MongoDB is running
- Verify port 5000 is not in use
- Check .env file is in backend folder

### API requests failing
- Make sure backend server is running (port 5000)
- Check browser console for errors
- Verify token is being sent in Authorization header

### Products not showing
- Run `node seed.js` to add sample products
- Check MongoDB connection string
- Verify products collection exists

### Login not working
- Backend server must be running
- Check internet connection for API calls
- Verify user was created with correct credentials

## 📚 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Server**: Express with CORS

## 🎓 Learning Resources

- Node.js: https://nodejs.org/docs/
- Express: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- JWT: https://jwt.io/
- Bootstrap: https://getbootstrap.com/

## 📧 Contact & Support

For issues or questions, check the frontend and backend README files for more details.

---

**Made with ☕ by Your Dev Team**
