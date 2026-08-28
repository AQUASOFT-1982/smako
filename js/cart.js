// Smako E-Commerce - Cart & Checkout Page Logic

const SMAKO_PHONE = "201025237420"; // Egypt country code format for WhatsApp

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();

  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  }
});

function renderCartPage() {
  const cartContainer = document.getElementById("cart-items-container");
  const emptyCartState = document.getElementById("empty-cart-state");
  const cartLayout = document.getElementById("cart-layout-wrapper");
  
  if (!cartContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (emptyCartState) emptyCartState.style.display = "block";
    if (cartLayout) cartLayout.style.display = "none";
    return;
  }

  if (emptyCartState) emptyCartState.style.display = "none";
  if (cartLayout) cartLayout.style.display = "grid";

  cartContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    return `
      <tr class="cart-item-row" data-id="${item.id}">
        <td>
          <div class="cart-product-info">
            <img src="${item.image}" alt="${item.name}" class="cart-product-img" onerror="this.src='https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=150&q=80'">
            <div>
              <div class="cart-product-name">${item.name}</div>
              <div class="cart-product-price">${item.price} ج.م / ${item.unit || 'كيلو'}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="qty-control">
            <button type="button" class="qty-btn" onclick="updateCartItemQty('${item.id}', -1)">
              <i class="fa-solid fa-minus"></i>
            </button>
            <input type="number" class="qty-input" value="${item.quantity}" readonly>
            <button type="button" class="qty-btn" onclick="updateCartItemQty('${item.id}', 1)">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </td>
        <td style="font-weight: 800; color: var(--primary); font-size: 1.1rem;">
          ${itemTotal} ج.م
        </td>
        <td style="text-align: center;">
          <button type="button" class="cart-remove-btn" onclick="removeCartItem('${item.id}')" title="حذف من السلة">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");

  updateOrderSummary();
}

function updateCartItemQty(productId, delta) {
  let cart = getCart();
  const index = cart.findIndex(i => i.id === productId);
  if (index > -1) {
    const newQty = cart[index].quantity + delta;
    if (newQty <= 0) {
      removeCartItem(productId);
      return;
    }
    cart[index].quantity = newQty;
    saveCart(cart);
    renderCartPage();
  }
}

function removeCartItem(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
  renderCartPage();
  showToast("تم حذف المنتج من السلة", "error");
}

function updateOrderSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const totalItemsCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  
  const subtotalEl = document.getElementById("cart-subtotal");
  const countEl = document.getElementById("cart-items-count-text");
  const totalEl = document.getElementById("cart-final-total");

  if (subtotalEl) subtotalEl.textContent = `${subtotal} ج.م`;
  if (countEl) countEl.textContent = `${totalItemsCount} صنف / كجم`;
  if (totalEl) totalEl.textContent = `${subtotal} ج.م`;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  
  const cart = getCart();
  if (cart.length === 0) {
    showToast("سلتك فارغة! أضف بعض المنتجات أولاً", "error");
    return;
  }

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const branch = document.getElementById("customer-branch").value;
  const address = document.getElementById("customer-address").value.trim();
  const notes = document.getElementById("customer-notes").value.trim();

  if (!name || !phone || !address) {
    showToast("يرجى ملء جميع الحقول الإلزامية المطلوبة", "error");
    return;
  }

  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  // Build WhatsApp Message
  let message = `*طلب جديد من موقع سمكو (SMAKO)* 🐟🌊\n\n`;
  message += `👤 *اسم العميل:* ${name}\n`;
  message += `📞 *رقم الهاتف:* ${phone}\n`;
  message += `📌 *أقرب فرع / المنطقة:* ${branch}\n`;
  message += `🏠 *العنوان التفصيلي:* ${address}\n`;
  if (notes) {
    message += `📝 *ملاحظات خاصة:* ${notes}\n`;
  }
  
  message += `\n--------------------------------\n`;
  message += `🛒 *تفاصيل الأصناف والطلبية:*\n`;
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    message += `${index + 1}. *${item.name}*\n`;
    message += `   - الكمية: ${item.quantity} ${item.unit || 'كيلو'}\n`;
    message += `   - السعر: ${item.price} ج.م (الإجمالي: ${itemTotal} ج.م)\n`;
  });

  message += `--------------------------------\n`;
  message += `💰 *إجمالي الطلب:* ${subtotal} ج.م\n\n`;
  message += `تحت إشراف مهندسين من خريجي كلية علوم الثروة السمكية 🎓`;

  // Encode message for WhatsApp URL
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${SMAKO_PHONE}?text=${encodedMsg}`;

  // Clear cart after submitting
  localStorage.removeItem("smako_cart");
  updateCartCounter();

  // Redirect to WhatsApp
  showToast("جاري تحويلك إلى واتساب لإرسال الطلب...", "success");
  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
    renderCartPage();
  }, 1200);
}
