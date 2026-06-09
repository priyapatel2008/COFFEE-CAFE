# ⚡ Quick Start - 5 Minutes to Running

## Prerequisites Check

```bash
# Check Node.js
node --version      # Should be v14+

# Check npm
npm --version       # Should be latest
```

---

## 1️⃣ Start MongoDB (Choose One)

### Option A: Local MongoDB (If Installed)
```bash
# Windows - Start MongoDB service
net start MongoDB

# Then verify connection
mongosh  # or mongo for older versions
```

### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create Free Account
3. Create Cluster
4. Get Connection String
5. Update `backend/.env` with connection string

---

## 2️⃣ Start Backend

### Terminal 1:
```bash
cd "d:\Javascript\Revision JS\PROJECT\COFFEE SHOP\backend"

npm install              # First time only

npm run dev              # Start with auto-restart

# Expected: "Server running on port 5000"
```

✅ Backend ready at `http://localhost:5000`

---

## 3️⃣ Start Frontend

### Terminal 2:
```bash
cd "d:\Javascript\Revision JS\PROJECT\COFFEE SHOP\frontend"

npx http-server -p 3000

# Expected: "Server running at http://localhost:3000"
```

✅ Frontend ready at `http://localhost:3000`

---

## 4️⃣ Open in Browser

```
http://localhost:3000
```

✅ You should see the coffee shop website!

---

## 5️⃣ Test Features

### Test Registration
1. Go to Login page
2. Click "Register"
3. Fill form: Name, Email, Password, Confirm Password
4. Click "Register"
5. Should redirect to home with "Welcome" message

### Test Login
1. Login with registered email/password
2. You should see your name in top-right
3. Click "Profile" to see dashboard

### Test Products
1. Go to Menu
2. Click "Add to Cart"
3. Click Cart button
4. See items in cart

### Test Checkout
1. Have items in cart
2. Click "Checkout"
3. You're prompted for delivery address
4. Order is created!

### Test Contact Form
1. Go to Contact
2. Fill form
3. Submit
4. See success message

---

## 🔧 File Locations

```
Backend Server:    d:\Javascript\Revision JS\PROJECT\COFFEE SHOP\backend\
  └─ server.js
  └─ .env
  └─ package.json

Frontend:          d:\Javascript\Revision JS\PROJECT\COFFEE SHOP\frontend\
  └─ index.html
  └─ api.js
  └─ auth.js
  └─ script.js
```

---

## 📝 Key Files to Know

| File | Purpose |
|------|---------|
| `backend/.env` | Database connection & secrets |
| `backend/server.js` | Backend entry point |
| `frontend/api.js` | API communication |
| `frontend/auth.js` | Authentication logic |
| `frontend/script.js` | Frontend functionality |

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error:** `Error: connect ECONNREFUSED`
```bash
# MongoDB not running
# Windows:
net start MongoDB

# Then restart backend
npm run dev
```

**Error:** `EADDRINUSE: address already in use :::5000`
```bash
# Port 5000 already in use
# Windows: Kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port in .env
PORT=5001
```

### Frontend Can't Reach Backend

**Error:** `Failed to fetch from http://localhost:5000/api/...`
```bash
# Make sure backend is running
# Check in Terminal 1

# Or try in browser:
http://localhost:5000/api/health
# Should return: {"message": "Server is running"}
```

### Can't Login

**Check:**
1. Backend running? ✓
2. Database has users? ✓
3. Email correct? ✓
4. Check browser console for errors ✓

---

##  After Initial Setup

### See Products
```javascript
// In browser console
const products = await getProducts();
console.log(products);
```

### Create Test User
- Register with: testuser@test.com / password123

### Test API Endpoint
```bash
curl http://localhost:5000/api/health
# Expected: {"message":"Server is running"}
```

---

## ✨ Next Steps

1. **Add Products to Database**
   ```javascript
   // In MongoDB console
   db.products.insertMany([...])
   ```

2. **Test All Features**
   - Register & Login
   - Browse Products
   - Add to Cart
   - Checkout
   - Submit Contact Form

3. **Deploy** (Later)
   - Frontend: Vercel / Netlify
   - Backend: Heroku / Railway / Render
   - Database: MongoDB Atlas (already cloud-ready)

---

## 🆘 Quick Reference

```bash
# Backend commands
cd backend
npm install              # Install dependencies
npm run dev              # Start dev server
npm start                # Start production

# Frontend commands
cd frontend
npx http-server -p 3000  # Start server

# MongoDB
mongosh                  # Start MongoDB shell
show dbs                 # List databases
use coffee-shop          # Switch database
db.users.find()         # List all users
```

---

## ✅ Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can open http://localhost:3000
- [ ] Can register new user
- [ ] Can login
- [ ] Can see products
- [ ] Can add to cart
- [ ] Can checkout (after login)
- [ ] Can submit contact form

Once all checked ✅, you're ready to go! 🎉

---

**Need help?**
1. Check browser console (F12) for errors
2. Check terminal for backend errors
3. Check MongoDB connection in backend/.env

**Happy coding! ☕**
