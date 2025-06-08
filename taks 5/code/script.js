// E-Commerce Application - Combined JS File with Cart Fix

// Product Data

const products = [
  {
    id: 1,
    name: "Premium Smartphone",
    price: 500,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=200"
  },
  {
    id: 2,
    name: "Winter Jacket",
    price: 80,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=200"
  },
  {
    id: 3,
    name: "Programming Book",
    price: 30,
    category: "books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=200"
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 150,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=200"
  }
];

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('product-list') || document.querySelector('#featured .product-container')) {
    initProductsPage();
  }
  
  if (document.getElementById('cart-items')) {
    initCartPage();
  }
  
  updateCartCount();
});

// Products Page Functionality
function initProductsPage() {
  renderProducts(products);
  
  // Initialize search and filter
  const searchBar = document.getElementById('search-bar');
  const filterCategory = document.getElementById('filter-category');
  
  // Search functionality
  if (searchBar) {
    searchBar.addEventListener('input', function() {
      filterProducts();
    });
  }
  
  // Category filter
  if (filterCategory) {
    filterCategory.addEventListener('change', function() {
      filterProducts();
    });
  }
  
  // Add to cart event delegation
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
      const productId = parseInt(e.target.dataset.id);
      addToCart(productId);
    }
  });
}

function renderProducts(productsToRender) {
  const container = document.getElementById('product-list') || 
                   document.querySelector('#featured .product-container');
  container.innerHTML = '';

  if (productsToRender.length === 0) {
    container.innerHTML = '<p class="no-products">No products match your search criteria.</p>';
    return;
  }

  productsToRender.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.dataset.category = product.category;
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    container.appendChild(productElement);
  });
}

function filterProducts() {
  const searchTerm = (document.getElementById('search-bar')?.value || '').toLowerCase();
  const category = document.getElementById('filter-category')?.value || 'all';
  
  const filteredProducts = products.filter(product => {
    // Check if product matches search term
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    
    // Check if product matches selected category
    const matchesCategory = category === 'all' || product.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
  renderProducts(filteredProducts);
}

// Cart Page Functionality
function initCartPage() {
  const cart = getValidCartItems();
  renderCart(cart);
}

function renderCart(cartItems) {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('total-container');
  
  if (!cartItems || cartItems.length === 0) {
    showEmptyCart(cartContainer, totalContainer);
    return;
  }

  cartContainer.innerHTML = '';
  cartItems.forEach(item => {
    if (item && item.id && item.name) {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.dataset.id = item.id;
      cartItem.innerHTML = `
        <img src="${item.image || ''}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p class="item-price">$${(item.price || 0).toFixed(2)}</p>
        </div>
        <div class="quantity-controls">
          <button class="decrease-quantity">-</button>
          <span class="quantity">${item.quantity || 1}</span>
          <button class="increase-quantity">+</button>
        </div>
        <button class="remove-item">Remove</button>
      `;
      cartContainer.appendChild(cartItem);
    }
  });

  updateTotals(cartItems);
  setupCartEventListeners();
}
function showEmptyCart(cartContainer, totalContainer) {
  cartContainer.innerHTML = `
    <div class="empty-cart">
      <p>Your cart is currently empty</p>
      <a href="products.html" class="checkout-btn">Browse Products</a>
    </div>
  `;
  if (totalContainer) totalContainer.style.display = 'none';
}

function setupCartEventListeners() {
  document.addEventListener('click', function(e) {
    const cartItem = e.target.closest('.cart-item');
    if (!cartItem) return;
    
    const itemId = parseInt(cartItem.dataset.id);
    
    if (e.target.classList.contains('decrease-quantity')) {
      updateCartItemQuantity(itemId, -1);
    } else if (e.target.classList.contains('increase-quantity')) {
      updateCartItemQuantity(itemId, 1);
    } else if (e.target.classList.contains('remove-item')) {
      removeCartItem(itemId);
    }
  });
}

// Cart Management Functions
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    return [];
  }
}

function getValidCartItems() {
  const cart = getCart();
  return cart.filter(item => 
    item && 
    item.id && 
    products.some(p => p.id === item.id) // Only keep items that exist in products
  );
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart.filter(item => item && item.id))); // Only save valid items
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = getValidCartItems();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 0) + 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();
  
  // Show feedback without alert
  const feedback = document.createElement('div');
  feedback.className = 'cart-feedback';
  feedback.textContent = `${product.name} added to cart!`;
  document.body.appendChild(feedback);
  setTimeout(() => feedback.remove(), 2000);
}

function updateCartItemQuantity(itemId, change) {
  let cart = getValidCartItems();
  const itemIndex = cart.findIndex(item => item.id === itemId);
  
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) + change;
    
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    
    saveCart(cart);
    renderCart(cart);
    updateCartCount();
  }
}

function removeCartItem(itemId) {
  let cart = getValidCartItems();
  cart = cart.filter(item => item.id !== itemId);
  saveCart(cart);
  renderCart(cart);
  updateCartCount();
}

function updateTotals(cartItems) {
  const subtotal = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (document.getElementById('subtotal')) {
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
  }
}

function updateCartCount() {
  const cart = getValidCartItems();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartCountElements = document.querySelectorAll('#cart-count');
  
  cartCountElements.forEach(element => {
    element.textContent = totalItems;
    element.style.display = totalItems > 0 ? 'inline-block' : 'none';
  });
}