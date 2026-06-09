// ===== MOCK DATA (Local Storage Based) =====

// Mock Products Database
const MOCK_PRODUCTS = [
  { id: 1, name: 'Espresso', category: 'coffee', price: 2.50, emoji: '☕', description: 'Strong and bold espresso shot' },
  { id: 2, name: 'Americano', category: 'coffee', price: 3.00, emoji: '☕', description: 'Espresso with hot water' },
  { id: 3, name: 'Cappuccino', category: 'coffee', price: 4.00, emoji: '☕', description: 'Espresso with steamed milk' },
  { id: 4, name: 'Latte', category: 'coffee', price: 4.50, emoji: '🍶', description: 'Smooth and creamy latte' },
  { id: 5, name: 'Macchiato', category: 'coffee', price: 3.50, emoji: '☕', description: 'Espresso topped with foam' },
  { id: 6, name: 'Mocha', category: 'coffee', price: 4.75, emoji: '🍫', description: 'Coffee with chocolate' },
  { id: 7, name: 'Iced Coffee', category: 'cold', price: 3.50, emoji: '🧊', description: 'Cold brew iced coffee' },
  { id: 8, name: 'Cold Brew', category: 'cold', price: 4.00, emoji: '❄️', description: 'Smooth cold brew concentrate' },
  { id: 9, name: 'Iced Latte', category: 'cold', price: 4.50, emoji: '🧊', description: 'Chilled latte with ice' },
  { id: 10, name: 'Cappuccino Freddo', category: 'cold', price: 5.00, emoji: '❄️', description: 'Italian iced cappuccino' },
  { id: 11, name: 'Green Tea', category: 'tea', price: 2.75, emoji: '🍵', description: 'Fresh brewed green tea' },
  { id: 12, name: 'Black Tea', category: 'tea', price: 2.75, emoji: '🍵', description: 'Classic black tea' }
];

// ===== TOKEN MANAGEMENT =====

function getToken() {
  return localStorage.getItem('authToken');
}

function setToken(token) {
  localStorage.setItem('authToken', token);
}

function removeToken() {
  localStorage.removeItem('authToken');
}

function getAuthHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// ===== AUTH API CALLS (MOCK) =====

async function registerUser(name, email, password, confirmPassword) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (password !== confirmPassword) {
        resolve({ success: false, message: 'Passwords do not match' });
        return;
      }
      
      let users = JSON.parse(localStorage.getItem('users')) || [];
      
      if (users.find(u => u.email === email)) {
        resolve({ success: false, message: 'Email already registered' });
        return;
      }
      
      const newUser = { id: Date.now(), name, email, password, address: '' };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      const token = 'token_' + Date.now();
      setToken(token);
      setCurrentUser({ id: newUser.id, name, email, address: '' });
      
      resolve({ 
        success: true, 
        token, 
        user: { id: newUser.id, name, email, address: '' },
        message: 'Registration successful!'
      });
    }, 500);
  });
}

async function loginUser(email, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        resolve({ success: false, message: 'Invalid email or password' });
        return;
      }
      
      const token = 'token_' + Date.now();
      setToken(token);
      setCurrentUser({ id: user.id, name: user.name, email: user.email, address: user.address });
      
      resolve({ 
        success: true, 
        token, 
        user: { id: user.id, name: user.name, email: user.email, address: user.address },
        message: 'Login successful!'
      });
    }, 500);
  });
}

async function getUserProfile() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (user) {
        resolve({ success: true, user });
      } else {
        resolve({ success: false, message: 'User not logged in' });
      }
    }, 300);
  });
}

async function updateUserProfile(name, phone, address) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'User not logged in' });
        return;
      }
      
      const updatedUser = { ...user, name, phone, address };
      setCurrentUser(updatedUser);
      
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], name, phone, address };
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      resolve({ success: true, user: updatedUser, message: 'Profile updated!' });
    }, 300);
  });
}

// ===== PRODUCT API CALLS (MOCK) =====

async function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, products: MOCK_PRODUCTS });
    }, 300);
  });
}

async function getProductsByCategory(category) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = MOCK_PRODUCTS.filter(p => p.category === category);
      resolve({ success: true, products });
    }, 300);
  });
}

async function getProduct(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      if (product) {
        resolve({ success: true, product });
      } else {
        resolve({ success: false, message: 'Product not found' });
      }
    }, 300);
  });
}

// ===== ORDER API CALLS (MOCK) =====

async function createOrder(items, totalAmount, deliveryAddress, paymentMethod) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, message: 'User not logged in' });
        return;
      }
      
      const order = {
        id: Date.now(),
        userId: user.id,
        items,
        totalAmount,
        deliveryAddress,
        paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      resolve({ 
        success: true, 
        order,
        message: 'Order placed successfully!'
      });
    }, 500);
  });
}

async function getUserOrders() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      if (!user) {
        resolve({ success: false, orders: [], message: 'User not logged in' });
        return;
      }
      
      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders = orders.filter(o => o.userId === user.id);
      
      resolve({ success: true, orders });
    }, 300);
  });
}

async function getOrder(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      const order = orders.find(o => o.id === id);
      
      if (order) {
        resolve({ success: true, order });
      } else {
        resolve({ success: false, message: 'Order not found' });
      }
    }, 300);
  });
}

async function cancelOrder(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      const order = orders.find(o => o.id === id);
      
      if (!order) {
        resolve({ success: false, message: 'Order not found' });
        return;
      }
      
      if (order.status === 'completed' || order.status === 'cancelled') {
        resolve({ success: false, message: 'Cannot cancel this order' });
        return;
      }
      
      order.status = 'cancelled';
      localStorage.setItem('orders', JSON.stringify(orders));
      
      resolve({ success: true, order, message: 'Order cancelled!' });
    }, 300);
  });
}

// ===== CONTACT FORM API CALLS (MOCK) =====

async function submitContactForm(name, email, phone, subject, message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const contact = {
        id: Date.now(),
        name,
        email,
        phone,
        subject,
        message,
        createdAt: new Date().toISOString()
      };
      
      let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      
      resolve({ 
        success: true, 
        contact,
        message: 'Contact form submitted successfully!'
      });
    }, 500);
  });
}

async function getContactMessages() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      resolve({ success: true, contacts });
    }, 300);
  });
}
