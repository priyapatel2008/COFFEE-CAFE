// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBtn   = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

/* ===== OPEN CART ===== */
if(cartBtn){
  cartBtn.onclick = (e)=>{
    e.preventDefault();
    renderCart();
    if(cartModal) cartModal.classList.add("active");
  };
}

/* ===== CLOSE CART ===== */
function closeCart(e){
  if(!e || e.target.id === "cartModal"){
    if(cartModal) cartModal.classList.remove("active");
  }
}

/* ===== RENDER CART ===== */
function renderCart(){
  if(!cartItems || !cartTotal) return;
  
  cartItems.innerHTML = "";
  let total = 0;

  if(cart.length === 0){
    cartItems.innerHTML = "<p class='text-center text-muted'>Your cart is empty</p>";
    cartTotal.innerText = "0.00";
    return;
  }

  cart.forEach((item, index)=>{
    total += item.qty * item.price;
    cartItems.innerHTML += `
      <div class="d-flex justify-content-between mb-3 p-2 bg-light rounded">
        <div>
          <span>${item.emoji} ${item.name}</span>
          <br>
          <small class="text-muted">$${item.price.toFixed(2)} × ${item.qty}</small>
        </div>
        <button class="btn btn-sm btn-danger"
          onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  cartTotal.innerText = total.toFixed(2);
}

/* ===== REMOVE ITEM ===== */
function removeItem(index){
  if(index < 0 || index >= cart.length) return;
  
  const itemName = cart[index].name;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
  
  // Show toast notification
  showNotification(`${itemName} removed from cart`, 'info');
}

/* ===== UPDATE CART COUNT ===== */
function updateCartCount(){
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const countElement = document.getElementById("cartCount");
  if(countElement){
    countElement.innerText = totalQty;
  }
}

/* ===== CLEAR CART ===== */
function clearCart(){
  if(confirm('Are you sure you want to clear your cart?')){
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
    showNotification('Cart cleared', 'info');
  }
}

/* ===== CHECKOUT ===== */
function checkout(){
  // Try to use backend checkout if available
  if(typeof checkoutWithBackend === 'function'){
    checkoutWithBackend();
  } else {
    // Fallback to local storage
    if(cart.length === 0){
      alert('Your cart is empty!');
      return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    const confirmation = confirm(`Total: $${total.toFixed(2)}\n\nProceed to checkout?`);
    
    if(confirmation){
      alert('✅ Thank you for your order!\n\nOrder placed successfully.');
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
      closeCart();
    }
  }
}

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById("contactForm");
if(contactForm){
  contactForm.onsubmit = (e) => {
    e.preventDefault();
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    const name = inputs[0]?.value?.trim() || '';
    const email = inputs[1]?.value?.trim() || '';
    const message = inputs[2]?.value?.trim() || '';
    
    // Validation
    if(!name || !email || !message) {
      showNotification("Please fill all fields!", 'error');
      return;
    }
    
    if(!isValidEmail(email)){
      showNotification("Please enter a valid email!", 'error');
      return;
    }
    
    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem("contacts")) || [];
    submissions.push({
      name,
      email,
      message,
      date: new Date().toLocaleString()
    });
    localStorage.setItem("contacts", JSON.stringify(submissions));
    
    // Show success message
    showNotification("✅ Thank you! Your message has been received.", 'success');
    
    // Reset form
    contactForm.reset();
  };
}

/* ===== EMAIL VALIDATION ===== */
function isValidEmail(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/* ===== NOTIFICATION FUNCTION ===== */
function showNotification(message, type = 'info'){
  // Check if Toastify is available
  if(typeof Toastify !== 'undefined'){
    const bgColors = {
      'success': '#28a745',
      'error': '#dc3545',
      'info': '#17a2b8',
      'warning': '#ffc107'
    };
    
    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      style: {
        background: bgColors[type] || bgColors['info'],
        color: type === 'warning' ? '#000' : '#fff',
        fontWeight: 'bold'
      }
    }).showToast();
  } else {
    // Fallback to alert if Toastify not available
    alert(message);
  }
}

/* ===== TOGGLE CART VISIBILITY ===== */
function toggleCart(){
  if(cartModal && cartModal.classList.contains('active')){
    closeCart();
  } else {
    cartBtn?.click();
  }
}

/* ===== INITIALIZE ON PAGE LOAD ===== */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
  initializeCarouselTimer();
});

/* ===== CAROUSEL TIMER ===== */
function initializeCarouselTimer(){
  const carousel = document.getElementById('heroCarousel');
  
  if(!carousel) return; // Exit if carousel doesn't exist
  
  let timerInterval = null;
  let currentTime = 15;

  function startTimer() {
    currentTime = 15;
    updateTimerDisplay();
    
    if(timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
      currentTime--;
      updateTimerDisplay();
      
      if(currentTime <= 0) {
        clearInterval(timerInterval);
      }
    }, 5000);
  }

  function updateTimerDisplay() {
    const timerElements = document.querySelectorAll('#timerSeconds');
    timerElements.forEach(el => {
      el.textContent = currentTime;
    });
  }

  // Start timer when carousel slides
  carousel.addEventListener('slide.bs.carousel', () => {
    startTimer();
  });

  // Initialize timer on page load
  startTimer();
}