// Smako Admin Dashboard Logic

const ADMIN_PASSWORD = "smako2024";

document.addEventListener("DOMContentLoaded", () => {
  checkAdminAuth();
  setupAdminEvents();
  renderAdminProducts();
  updateAdminStats();
});

function checkAdminAuth() {
  const isAuth = sessionStorage.getItem("smako_admin_auth");
  const loginModal = document.getElementById("admin-login-modal");
  const adminContent = document.getElementById("admin-main-content");

  if (isAuth === "true") {
    if (loginModal) loginModal.classList.remove("active");
    if (adminContent) adminContent.style.display = "block";
  } else {
    if (loginModal) loginModal.classList.add("active");
    if (adminContent) adminContent.style.display = "none";
  }
}

function handleAdminLogin(e) {
  e.preventDefault();
  const passInput = document.getElementById("admin-password-input");
  const enteredPass = passInput.value.trim();

  if (enteredPass === ADMIN_PASSWORD) {
    sessionStorage.setItem("smako_admin_auth", "true");
    showToast("تم تسجيل الدخول بنجاح كمدير للنظام", "success");
    checkAdminAuth();
  } else {
    showToast("كلمة المرور غير صحيحة!", "error");
    passInput.value = "";
    passInput.focus();
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem("smako_admin_auth");
  showToast("تم تسجيل الخروج بنجاح", "success");
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

function setupAdminEvents() {
  const loginForm = document.getElementById("admin-login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleAdminLogin);
  }

  const logoutBtn = document.getElementById("admin-logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleAdminLogout);
  }

  const productForm = document.getElementById("admin-product-form");
  if (productForm) {
    productForm.addEventListener("submit", handleProductFormSubmit);
  }

  const cancelEditBtn = document.getElementById("cancel-edit-btn");
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener("click", resetProductForm);
  }

  const fileInput = document.getElementById("product-image-file");
  const urlInput = document.getElementById("product-image-url");
  const imgPreview = document.getElementById("form-image-preview");

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (urlInput) urlInput.value = event.target.result;
          if (imgPreview) {
            imgPreview.src = event.target.result;
            imgPreview.style.display = "block";
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (urlInput) {
    urlInput.addEventListener("input", (e) => {
      if (imgPreview && e.target.value) {
        imgPreview.src = e.target.value;
        imgPreview.style.display = "block";
      }
    });
  }

  // Calculate discount dynamically
  const priceInput = document.getElementById("product-price");
  const oldPriceInput = document.getElementById("product-old-price");
  const discountInput = document.getElementById("product-discount");

  if (oldPriceInput && priceInput && discountInput) {
    const calcDiscount = () => {
      const price = parseFloat(priceInput.value) || 0;
      const oldPrice = parseFloat(oldPriceInput.value) || 0;
      if (oldPrice > price && price > 0) {
        const disc = Math.round(((oldPrice - price) / oldPrice) * 100);
        discountInput.value = disc;
      } else {
        discountInput.value = 0;
      }
    };
    priceInput.addEventListener("input", calcDiscount);
    oldPriceInput.addEventListener("input", calcDiscount);
  }
}

function renderAdminProducts() {
  const tableBody = document.getElementById("admin-products-table-body");
  if (!tableBody) return;

  const products = getProducts();

  if (products.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 30px; color: var(--gray);">
          لا توجد منتجات حالياً. أضف منتجك الأول من النموذج أعلاه!
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = products.map((p, index) => {
    return `
      <tr>
        <td>
          <img src="${p.image}" alt="${p.name}" class="admin-product-thumb" onerror="this.src='https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=100&q=80'">
        </td>
        <td>
          <strong style="color: var(--dark); font-size: 1rem;">${p.name}</strong>
          ${p.featured ? '<span class="badge badge-gold" style="margin-right: 6px; font-size: 0.72rem;">مميز</span>' : ''}
          <div style="font-size: 0.8rem; color: var(--gray);">${p.categoryName || p.category}</div>
        </td>
        <td style="font-weight: 800; color: var(--primary);">
          ${p.price} ج.م <span style="font-size: 0.8rem; color: var(--gray);">/ ${p.unit || 'كيلو'}</span>
        </td>
        <td>
          ${p.discount > 0 ? `<span class="badge badge-accent">خصم ${p.discount}%</span>` : '<span style="color: var(--gray); font-size: 0.85rem;">بدون خصم</span>'}
        </td>
        <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.85rem; color: var(--gray-dark);">
          ${p.description || '-'}
        </td>
        <td>
          <div class="admin-actions-cell">
            <button type="button" class="action-btn-sm edit-btn" onclick="editProduct('${p.id}')" title="تعديل المنتج">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="action-btn-sm delete-btn" onclick="deleteProduct('${p.id}')" title="حذف المنتج">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function updateAdminStats() {
  const products = getProducts();
  const totalCountEl = document.getElementById("stat-total-products");
  const discountCountEl = document.getElementById("stat-discount-products");
  const featuredCountEl = document.getElementById("stat-featured-products");

  if (totalCountEl) totalCountEl.textContent = products.length;
  if (discountCountEl) discountCountEl.textContent = products.filter(p => p.discount > 0).length;
  if (featuredCountEl) featuredCountEl.textContent = products.filter(p => p.featured).length;
}

function handleProductFormSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById("product-edit-id").value;
  const name = document.getElementById("product-name").value.trim();
  const category = document.getElementById("product-category").value;
  const categorySelect = document.getElementById("product-category");
  const categoryName = categorySelect.options[categorySelect.selectedIndex].text;
  const price = parseFloat(document.getElementById("product-price").value) || 0;
  const oldPrice = parseFloat(document.getElementById("product-old-price").value) || null;
  const discount = parseInt(document.getElementById("product-discount").value) || 0;
  const unit = document.getElementById("product-unit").value.trim() || "كيلو";
  const image = document.getElementById("product-image-url").value.trim() || "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80";
  const description = document.getElementById("product-description").value.trim();
  const featured = document.getElementById("product-featured").checked;

  if (!name || price <= 0) {
    showToast("يرجى إدخال اسم وسعر صحيح للمنتج", "error");
    return;
  }

  let products = getProducts();

  if (editId) {
    // Edit existing
    const index = products.findIndex(p => p.id === editId);
    if (index > -1) {
      products[index] = {
        ...products[index],
        name,
        category,
        categoryName,
        price,
        oldPrice: oldPrice > price ? oldPrice : null,
        discount,
        unit,
        image,
        description,
        featured
      };
      showToast("تم تحديث المنتج بنجاح!", "success");
    }
  } else {
    // Add new
    const newProduct = {
      id: "p_" + Date.now(),
      name,
      category,
      categoryName,
      price,
      oldPrice: oldPrice > price ? oldPrice : null,
      discount,
      unit,
      image,
      description,
      featured
    };
    products.unshift(newProduct);
    showToast("تم إضافة المنتج الجديد بنجاح!", "success");
  }

  saveProducts(products);
  resetProductForm();
  renderAdminProducts();
  updateAdminStats();
}

function editProduct(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById("product-edit-id").value = product.id;
  document.getElementById("product-name").value = product.name;
  document.getElementById("product-category").value = product.category;
  document.getElementById("product-price").value = product.price;
  document.getElementById("product-old-price").value = product.oldPrice || "";
  document.getElementById("product-discount").value = product.discount || 0;
  document.getElementById("product-unit").value = product.unit || "كيلو";
  document.getElementById("product-image-url").value = product.image;
  document.getElementById("product-description").value = product.description;
  document.getElementById("product-featured").checked = !!product.featured;

  const imgPreview = document.getElementById("form-image-preview");
  if (imgPreview) {
    imgPreview.src = product.image;
    imgPreview.style.display = "block";
  }

  document.getElementById("form-submit-btn").innerHTML = `<i class="fa-solid fa-check"></i> حفظ التعديلات`;
  document.getElementById("cancel-edit-btn").style.display = "inline-flex";
  document.getElementById("form-card-title").innerHTML = `<i class="fa-solid fa-pen-to-square"></i> تعديل المنتج: ${product.name}`;

  // Scroll to form
  document.getElementById("admin-product-form").scrollIntoView({ behavior: "smooth" });
}

function deleteProduct(productId) {
  if (confirm("هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً من المتجر؟")) {
    let products = getProducts();
    products = products.filter(p => p.id !== productId);
    saveProducts(products);
    renderAdminProducts();
    updateAdminStats();
    showToast("تم حذف المنتج بنجاح", "error");
  }
}

function resetProductForm() {
  document.getElementById("admin-product-form").reset();
  document.getElementById("product-edit-id").value = "";
  document.getElementById("form-submit-btn").innerHTML = `<i class="fa-solid fa-plus"></i> إضافة المنتج للمتجر`;
  document.getElementById("cancel-edit-btn").style.display = "none";
  document.getElementById("form-card-title").innerHTML = `<i class="fa-solid fa-plus-circle"></i> إضافة منتج جديد`;
  
  const imgPreview = document.getElementById("form-image-preview");
  if (imgPreview) {
    imgPreview.style.display = "none";
    imgPreview.src = "";
  }
}

function resetAllDefaultProducts() {
  if (confirm("هل تريد استعادة المنتجات الافتراضية الأولية؟ سيتم استبدال المنتجات الحالية.")) {
    localStorage.removeItem("smako_products");
    renderAdminProducts();
    updateAdminStats();
    showToast("تمت استعادة البيانات الافتراضية بنجاح", "success");
  }
}
