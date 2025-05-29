const products = [
    { name: "iPhone 13", category: "electronics", price: 999, rating: 4.8, image: "https://m.media-amazon.com/images/I/61VuVU94RnL._AC_SL1500_.jpg" },
    { name: "MacBook Air", category: "electronics", price: 1199, rating: 4.7, image: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg" },
    { name: "Denim Jacket", category: "fashion", price: 59, rating: 4.3, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80" },
    { name: "Running Shoes", category: "fashion", price: 89, rating: 4.5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLHE0yWwnQRlY8EeksEPbkEOBCvOfXYL8stg&s" },
    { name: "Harry Potter Book", category: "books", price: 25, rating: 4.9, image: "https://m.media-amazon.com/images/I/51UoqRAxwEL.jpg" },
    { name: "Bluetooth Headphones", category: "electronics", price: 129, rating: 4.4, image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1500_.jpg" },
    { name: "Graphic T-Shirt", category: "fashion", price: 19, rating: 4.2, image: "https://assets.ajio.com/medias/sys_master/root/20230706/XPdB/64a6f249eebac147fc5a69b6/-1117Wx1400H-465975073-black-MODEL.jpg"},
    { name: "Backpack", category: "fashion", price: 49, rating: 4.3, image: "https://m.media-amazon.com/images/I/71KilybDOoL._AC_UL1500_.jpg" },
    { name: "The Hobbit", category: "books", price: 18, rating: 4.8, image: "https://m.media-amazon.com/images/I/41aQPTCmeVL.jpg" },
    { name: "Notebook", category: "books", price: 10, rating: 4.1, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80" },
  ];
  
  const productList = document.getElementById('product-list');
  const categoryFilter = document.getElementById('category-filter');
  const sortBy = document.getElementById('sort-by');
  const searchInput = document.getElementById('search-input');
  const pagination = document.getElementById('pagination');
  
  let currentPage = 1;
  const productsPerPage = 5;
  
  function renderProducts(filteredProducts) {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginated = filteredProducts.slice(start, end);
  
    productList.innerHTML = '';
    paginated.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price}</p>
        <p>Rating: ⭐ ${product.rating}</p>
      `;
      productList.appendChild(div);
    });
  
    renderPagination(filteredProducts.length);
  }
  
  function renderPagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    pagination.innerHTML = '';
  
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = i === currentPage ? 'active' : '';
      btn.addEventListener('click', () => {
        currentPage = i;
        filterAndSortProducts();
      });
      pagination.appendChild(btn);
    }
  }
  
  function filterAndSortProducts() {
    let filtered = [...products];
  
    // Category
    const category = categoryFilter.value;
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
  
    // Search
    const query = searchInput.value.toLowerCase();
    if (query) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
    }
  
    // Sort
    const sort = sortBy.value;
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);
  
    renderProducts(filtered);
  }
  
  // Event listeners
  categoryFilter.addEventListener('change', () => {
    currentPage = 1;
    filterAndSortProducts();
  });
  sortBy.addEventListener('change', () => {
    currentPage = 1;
    filterAndSortProducts();
  });
  searchInput.addEventListener('input', () => {
    currentPage = 1;
    filterAndSortProducts();
  });
  
  // Initial render
  filterAndSortProducts();
  