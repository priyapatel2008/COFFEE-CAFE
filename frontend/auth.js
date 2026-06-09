// ===== AUTHENTICATION MANAGEMENT =====

function isUserLoggedIn() {
  return !!getToken();
}

function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem('currentUser');
}

// Handle Login
async function handleLogin(email, password) {
  try {
    const response = await loginUser(email, password);
    
    if (response.success && response.token) {
      setToken(response.token);
      setCurrentUser(response.user);
      return response;
    } else {
      throw new Error(response.message || 'Login failed');
    }
  } catch (error) {
    throw error;
  }
}

// Handle Register
async function handleRegister(name, email, password, confirmPassword) {
  try {
    const response = await registerUser(name, email, password, confirmPassword);
    
    if (response.success && response.token) {
      setToken(response.token);
      setCurrentUser(response.user);
      return response;
    } else {
      throw new Error(response.message || 'Registration failed');
    }
  } catch (error) {
    throw error;
  }
}

// Handle Logout
function handleLogout() {
  removeToken();
  clearCurrentUser();
  // Redirect to login or home
  window.location.href = 'login.html';
}

// Update UI based on login status
function updateAuthUI() {
  const user = getCurrentUser();
  const authNav = document.getElementById('authNav');
  
  if (!authNav) return;
  
  if (user) {
    // User is logged in
    authNav.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <small class="text-light">Welcome, ${user.name}!</small>
        <button class="btn btn-sm btn-outline-light" onclick="handleLogout()">Logout</button>
      </div>
    `;
  } else {
    // User is not logged in
    authNav.innerHTML = `
      <div class="d-flex gap-2">
        <a href="login.html" class="btn btn-sm btn-outline-light">Login</a>
        <a href="login.html" class="btn btn-sm btn-light">Register</a>
      </div>
    `;
  }
}

// Check server connection on page load
async function checkBackendConnection() {
  try {
    const isHealthy = await checkServerHealth();
    if (!isHealthy) {
      console.warn('Backend server is not running');
      showNotification('Note: Backend server is not running. Using local storage only.', 'warning');
    }
  } catch (error) {
    console.error('Error checking backend:', error);
  }
}

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
  checkBackendConnection();
});
