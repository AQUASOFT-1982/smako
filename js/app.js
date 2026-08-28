// Smako E-Commerce & Corporate Website - Main App Logic

const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "جمبري جامبو طازج",
    category: "shrimp",
    categoryName: "جمبري وبحريات",
    price: 420,
    oldPrice: 480,
    unit: "كيلو",
    discount: 12,
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80",
    description: "جمبري بحري طازج حجم جامبو ممتاز للشوي والقلي وصواني السي فود الفاخرة، طازج يومياً تحت إشراف متخصصين.",
    featured: true
  },
  {
    id: "p2",
    name: "سمك قاروص بلدي ممتاز",
    category: "fish",
    categoryName: "أسماك طازجة",
    price: 280,
    oldPrice: 320,
    unit: "كيلو",
    discount: 15,
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80",
    description: "سمك قاروص بلدي عالي الجودة غني بالأوميجا 3، مثالي للزيت والليمون والشوي سنجاري.",
    featured: true
  },
  {
    id: "p3",
    name: "فيليه سلمون نرويجي طازج",
    category: "fillet",
    categoryName: "فيليهات ومخلية",
    price: 550,
    oldPrice: 620,
    unit: "كيلو",
    discount: 10,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
    description: "قطع فيليه سلمون نرويجي أحمر فاخر خالي تماماً من الشوك، طازج ومناسب لأشهى الوجبات الصحية.",
    featured: true
  },
  {
    id: "p4",
    name: "سبيط (كاليماري) بلدي طازج",
    category: "seafood",
    categoryName: "جمبري وبحريات",
    price: 340,
    oldPrice: 380,
    unit: "كيلو",
    discount: 10,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    description: "سبيط بلدي طري ولذيذ جداً، جاهز للتقطيع للحلقات أو الطواجن بالخلطة الإسكندراني الشهيرة.",
    featured: true
  },
  {
    id: "p5",
    name: "سمك دنيس بلدي فاخر",
    category: "fish",
    categoryName: "أسماك طازجة",
    price: 260,
    oldPrice: 290,
    unit: "كيلو",
    discount: 10,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    description: "سمك دنيس بحري طازج ومغذي، لحم أبيض ناصع وطعم استثنائي لا يُقاوم.",
    featured: true
  },
  {
    id: "p6",
    name: "كابوريا نتي مبطرخة",
    category: "seafood",
    categoryName: "جمبري وبحريات",
    price: 220,
    oldPrice: 260,
    unit: "كيلو",
    discount: 15,
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=600&q=80",
    description: "كابوريا نتي حجم وسط لكبير بطارخ مليانة وطعم رائع في الشوربة والطهي بالبخار.",
    featured: true
  },
  {
    id: "p7",
    name: "سمك بلطي بلدي مزارع علمية",
    category: "fish",
    categoryName: "أسماك طازجة",
    price: 95,
    oldPrice: 110,
    unit: "كيلو",
    discount: 13,
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=600&q=80",
    description: "بلطي مميز منتقى بعناية تحت إشراف مهندسي علوم الثروة السمكية، لحم نظيف وصحي 100%.",
    featured: false
  },
  {
    id: "p8",
    name: "سمك بوري بلدي مبطرخ",
    category: "fish",
    categoryName: "أسماك طازجة",
    price: 180,
    oldPrice: 200,
    unit: "كيلو",
    discount: 10,
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=600&q=80",
    description: "بوري بلدي طازج سمين ممتاز للشوي بالردة والزيت والليمون والفسيخ المنزلي الفاخر.",
    featured: false
  },
  {
    id: "p9",
    name: "فيليه قشر بياض طازج",
    category: "fillet",
    categoryName: "فيليهات ومخلية",
    price: 310,
    oldPrice: 350,
    unit: "كيلو",
    discount: 11,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    description: "فيليه قشر بياض نيللي بدون شوك ولا جلد، متماسك ومثالي للأطفال وصواني الفرن والتحمير.",
    featured: false
  }
];

// Data Layer
function getProducts() {
  const stored = localStorage.getItem("smako_products");
  if (!stored) {
    localStorage.setItem("smako_products", JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_PRODUCTS;
  }
}

function saveProducts(products) {
  localStorage.setItem("smako_products", JSON.stringify(products));
}

// Cart Layer
function getCart() {
  const stored = localStorage.getItem("smako_cart");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("smako_cart", JSON.stringify(cart));
  updateCartCounter();
}

function addToCart(productId, quantity = 1) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit || "كيلو",
      image: product.image,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast(`تمت إضافة ${quantity} ${product.unit || "كيلو"} من ${product.name} إلى السلة!`, "success");
}

function updateCartCounter() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const counters = document.querySelectorAll(".cart-count");
  counters.forEach(c => {
    c.textContent = totalCount;
  });
}

// Toast Notifications
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icon = type === "success" ? "fa-circle-check" : "fa-triangle-exclamation";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Product Card Template
function createProductCard(product) {
  const hasDiscount = product.discount && product.discount > 0;
  return `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      ${hasDiscount ? `<span class="product-badge-discount">خصم ${product.discount}%</span>` : ''}
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80'">
        <span class="product-category-tag">${product.categoryName || 'بحريات فاخرة'}</span>
      </div>
      <div class="product-body">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-pricing">
          <span class="current-price">${product.price} ج.م</span>
          <span class="unit-label">/ ${product.unit || 'كيلو'}</span>
          ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ج.م</span>` : ''}
        </div>
        <div class="product-actions">
          <div class="qty-control">
            <button type="button" class="qty-btn minus-btn" onclick="changeCardQty('${product.id}', -1)">
              <i class="fa-solid fa-minus"></i>
            </button>
            <input type="number" id="qty-${product.id}" class="qty-input" value="1" min="1" max="99" readonly>
            <button type="button" class="qty-btn plus-btn" onclick="changeCardQty('${product.id}', 1)">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <button type="button" class="btn-add-cart" onclick="addProductToCart('${product.id}')">
            <i class="fa-solid fa-cart-shopping"></i>
            <span>إضافة للسلة</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function changeCardQty(productId, delta) {
  const input = document.getElementById(`qty-${productId}`);
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val = Math.max(1, Math.min(99, val + delta));
  input.value = val;
}

function addProductToCart(productId) {
  const input = document.getElementById(`qty-${productId}`);
  const qty = input ? parseInt(input.value) || 1 : 1;
  addToCart(productId, qty);
}

// Global Nav & Setup
document.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();

  // Mobile menu toggle & drawer
  const menuBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  
  // Create or get backdrop
  let backdrop = document.querySelector(".nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);
  }

  const toggleMobileMenu = (forceClose = false) => {
    if (!navLinks) return;
    const isOpen = navLinks.classList.contains("show");
    if (isOpen || forceClose) {
      navLinks.classList.remove("show");
      backdrop.classList.remove("show");
      document.body.style.overflow = "";
      if (menuBtn) menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    } else {
      navLinks.classList.add("show");
      backdrop.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
      if (menuBtn) menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
  };

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    backdrop.addEventListener("click", () => toggleMobileMenu(true));

    // Close on link click
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => toggleMobileMenu(true));
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") toggleMobileMenu(true);
    });
  }

  // Render featured on index page
  const featuredContainer = document.getElementById("featured-products-grid");
  if (featuredContainer) {
    const products = getProducts();
    const featured = products.filter(p => p.featured).slice(0, 6);
    featuredContainer.innerHTML = featured.map(p => createProductCard(p)).join("");
  }

  // Render all products on shop page
  const shopGrid = document.getElementById("shop-products-grid");
  if (shopGrid) {
    renderShopProducts("all");
    setupShopFilters();
  }
});

function renderShopProducts(category = "all", searchTerm = "") {
  const shopGrid = document.getElementById("shop-products-grid");
  if (!shopGrid) return;

  const products = getProducts();
  let filtered = products;

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (searchTerm.trim() !== "") {
    const term = searchTerm.trim().toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term)
    );
  }

  if (filtered.length === 0) {
    shopGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px;">
        <i class="fa-solid fa-fish" style="font-size: 3.5rem; color: var(--gray); margin-bottom: 15px;"></i>
        <h3 style="font-size: 1.4rem; color: var(--dark); margin-bottom: 8px;">لم يتم العثور على منتجات</h3>
        <p style="color: var(--gray);">جرب البحث بكلمات أخرى أو اختر فئة مختلفة</p>
      </div>
    `;
    return;
  }

  shopGrid.innerHTML = filtered.map(p => createProductCard(p)).join("");
}

function setupShopFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("shop-search-input");

  let currentCategory = "all";

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category");
      renderShopProducts(currentCategory, searchInput ? searchInput.value : "");
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderShopProducts(currentCategory, e.target.value);
    });
  }
}
