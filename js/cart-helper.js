/**
 * STACKLY - cart-helper.js
 * Common client-side script to synchronise cart count across all pages
 */

(function() {
    'use strict';

    // Get current cart items
    function getCart() {
        try {
            const cartJson = localStorage.getItem('stacklyCart');
            return cartJson ? JSON.parse(cartJson) : [];
        } catch (e) {
            console.error('Error parsing cart from localStorage:', e);
            return [];
        }
    }

    // Save cart items
    function saveCart(cart) {
        try {
            localStorage.setItem('stacklyCart', JSON.stringify(cart));
            // Dispatch a storage event manually so other tabs/scripts on the same window can listen
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (e) {
            console.error('Error saving cart to localStorage:', e);
        }
    }

    // Update the cart count badge in navigation
    function updateCartCount() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        const badge = document.getElementById('nav-cart-count');
        if (badge) {
            badge.textContent = totalItems;
            if (totalItems > 0) {
                badge.style.display = 'inline-flex';
                badge.style.alignItems = 'center';
                badge.style.justifyContent = 'center';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    // Public API to add items to cart
    function addToCart(product) {
        if (!product || !product.id) return;
        
        const cart = getCart();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: parseFloat(product.price),
                image: product.image,
                category: product.category || 'General',
                quantity: 1
            });
        }
        
        saveCart(cart);
        updateCartCount();
        showToastNotification(`Added "${product.title}" to your cart!`);
    }

    // Custom success toast message
    function showToastNotification(message) {
        let toast = document.getElementById('success-toast-message');
        let toastText = document.getElementById('toast-text-content');
        
        if (!toast) {
            // Create toast if not present
            toast = document.createElement('div');
            toast.id = 'success-toast-message';
            toast.className = 'success-toast';
            toast.innerHTML = `
                <span class="success-toast-icon"><i class="fa-solid fa-check"></i></span>
                <span class="success-toast-text" id="toast-text-content"></span>
            `;
            document.body.appendChild(toast);
            toastText = document.getElementById('toast-text-content');
        }
        
        if (toastText) {
            toastText.textContent = message;
        }
        
        toast.classList.add('active');
        if (window.cartToastTimeout) clearTimeout(window.cartToastTimeout);
        window.cartToastTimeout = setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }

    // Initialize navbar cart state
    document.addEventListener('DOMContentLoaded', () => {
        updateCartCount();
        
        // Ensure the navbar is visible on load
        const wrappers = document.querySelectorAll('.navbar-wrapper');
        wrappers.forEach(w => w.classList.add('active'));
        
        // Mobile hamburger menu toggle (global single source of truth)
        const hamburger = document.getElementById("nav-menu-hamburger");
        const navLinks  = document.getElementById("main-nav-links");
        if (hamburger && navLinks) {
            if (!hamburger.dataset.hasMenuListener) {
                hamburger.dataset.hasMenuListener = "true";
                
                hamburger.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const expanded = hamburger.getAttribute("aria-expanded") === "true";
                    hamburger.setAttribute("aria-expanded", !expanded);
                    hamburger.classList.toggle("active");
                    navLinks.classList.toggle("active");
                });
                
                document.querySelectorAll(".nav-item").forEach(item => {
                    item.addEventListener("click", () => {
                        hamburger.classList.remove("active");
                        navLinks.classList.remove("active");
                        hamburger.setAttribute("aria-expanded", "false");
                    });
                });
            }
        }
        
        // Listen for updates on the same window
        window.addEventListener('cartUpdated', updateCartCount);
        
        // Also listen for cross-window updates (multiple tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'stacklyCart') {
                updateCartCount();
            }
        });
    });

    // Expose functions globally
    window.StacklyCart = {
        get: getCart,
        save: saveCart,
        add: addToCart,
        updateCount: updateCartCount,
        showToast: showToastNotification
    };
})();
