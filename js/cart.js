// STACKLY - cart.js

document.addEventListener("DOMContentLoaded", () => {
    const cartItemsList = document.getElementById("cart-items-list");
    const cartSummaryBox = document.getElementById("cart-summary-box");
    const cartEmptyView = document.getElementById("cart-empty-view");

    const subtotalEl = document.getElementById("summary-subtotal");
    const shippingEl = document.getElementById("summary-shipping");
    const taxEl = document.getElementById("summary-tax");
    const totalEl = document.getElementById("summary-total");

    // Load and render cart
    function renderCart() {
        if (!window.StacklyCart) return;
        const cart = window.StacklyCart.get();

        if (cart.length === 0) {
            // Show empty cart view
            if (cartItemsList) cartItemsList.style.display = "none";
            if (cartSummaryBox) cartSummaryBox.style.display = "none";
            if (cartEmptyView) cartEmptyView.style.display = "flex";
            return;
        }

        // Show cart view
        if (cartItemsList) cartItemsList.style.display = "flex";
        if (cartSummaryBox) cartSummaryBox.style.display = "block";
        if (cartEmptyView) cartEmptyView.style.display = "none";

        // Generate items list
        if (cartItemsList) {
            cartItemsList.innerHTML = "";
            cart.forEach(item => {
                const row = document.createElement("div");
                row.className = "cart-item";
                row.innerHTML = `
                    <div class="cart-item-img-wrap">
                        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                    </div>
                    <div class="cart-item-info">
                        <span class="cart-item-category">${item.category}</span>
                        <a href="404.html" class="cart-item-title">${item.title}</a>
                        <div class="cart-item-price">$${item.price}</div>
                    </div>
                    <div class="cart-item-qty-wrap">
                        <button class="qty-btn dec-btn" data-id="${item.id}" aria-label="Decrease quantity">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn inc-btn" data-id="${item.id}" aria-label="Increase quantity">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <div class="cart-item-actions">
                        <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                        <button class="cart-item-delete" data-id="${item.id}" aria-label="Delete item">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                `;
                cartItemsList.appendChild(row);
            });
        }

        // Compute and update summary
        calculateTotals(cart);
        attachCartItemListeners();
    }

    // Calculate subtotal, shipping, tax, total
    function calculateTotals(cart) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Shipping is free over $200, otherwise $15
        const shipping = subtotal > 200 ? 0 : (subtotal > 0 ? 15 : 0);
        
        // Tax is 8%
        const tax = subtotal * 0.08;
        
        const total = subtotal + shipping + tax;

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }

    // Attach listeners to cart buttons
    function attachCartItemListeners() {
        if (!window.StacklyCart) return;

        // Increase quantity
        document.querySelectorAll(".inc-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const cart = window.StacklyCart.get();
                const item = cart.find(i => i.id === id);
                if (item) {
                    item.quantity += 1;
                    window.StacklyCart.save(cart);
                    renderCart();
                }
            });
        });

        // Decrease quantity
        document.querySelectorAll(".dec-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const cart = window.StacklyCart.get();
                const item = cart.find(i => i.id === id);
                if (item) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        // Remove item if quantity is reduced to 0
                        const newCart = cart.filter(i => i.id !== id);
                        window.StacklyCart.save(newCart);
                    }
                    window.StacklyCart.save(cart);
                    renderCart();
                }
            });
        });

        // Delete item
        document.querySelectorAll(".cart-item-delete").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const cart = window.StacklyCart.get();
                const newCart = cart.filter(i => i.id !== id);
                window.StacklyCart.save(newCart);
                renderCart();
                window.StacklyCart.showToast("Item removed from your cart.");
            });
        });
    }

    // Navbar scroll state
    const navbar = document.getElementById("cart-navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 30);
        });
    }

    // Initialize rendering
    renderCart();

    // Listen for storage events (multi-tab sync)
    window.addEventListener("cartUpdated", renderCart);
});
