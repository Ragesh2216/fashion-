// STACKLY - checkout.js

document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkout-form");
    const summaryItemsList = document.getElementById("summary-items-list");
    const successModal = document.getElementById("success-modal");

    const subtotalEl = document.getElementById("summary-subtotal");
    const shippingEl = document.getElementById("summary-shipping");
    const taxEl = document.getElementById("summary-tax");
    const totalEl = document.getElementById("summary-total");

    // Inputs
    const shipName = document.getElementById("ship-name");
    const shipEmail = document.getElementById("ship-email");
    const shipAddress = document.getElementById("ship-address");
    const shipCity = document.getElementById("ship-city");
    const shipZip = document.getElementById("ship-zip");
    
    const cardName = document.getElementById("card-name");
    const cardNumber = document.getElementById("card-number");
    const cardExpiry = document.getElementById("card-expiry");
    const cardCvv = document.getElementById("card-cvv");

    // 1. Render Checkout Summary
    function loadSummary() {
        if (!window.StacklyCart) return;
        const cart = window.StacklyCart.get();

        if (cart.length === 0) {
            // No items -> redirect to cart
            window.location.href = "cart.html";
            return;
        }

        if (summaryItemsList) {
            summaryItemsList.innerHTML = "";
            cart.forEach(item => {
                const row = document.createElement("div");
                row.className = "checkout-item-row";
                row.innerHTML = `
                    <div class="checkout-item-details">
                        <img src="${item.image}" alt="${item.title}" class="checkout-item-img">
                        <div>
                            <div class="checkout-item-name">${item.title}</div>
                            <div class="checkout-item-qty">Qty: ${item.quantity}</div>
                        </div>
                    </div>
                    <span class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                summaryItemsList.appendChild(row);
            });
        }

        // Totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 200 ? 0 : 15;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }

    // 2. Real-time formatting for Inputs
    // Format Credit Card: Groups of 4 digits
    if (cardNumber) {
        cardNumber.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formatted = "";
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formatted += " ";
                }
                formatted += value[i];
            }
            e.target.value = formatted;
        });
    }

    // Format Expiry: MM/YY
    if (cardExpiry) {
        cardExpiry.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            if (value.length > 2) {
                e.target.value = value.substring(0, 2) + "/" + value.substring(2, 4);
            } else {
                e.target.value = value;
            }
        });
    }

    // Format CVV: numbers only
    if (cardCvv) {
        cardCvv.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/gi, '');
        });
    }

    // 3. Form Validation Logic
    function validateForm() {
        let isValid = true;

        // Helper to mark errors
        function setFieldError(field, hasError) {
            const group = field.closest(".form-group");
            if (group) {
                if (hasError) {
                    group.classList.add("has-error");
                    isValid = false;
                } else {
                    group.classList.remove("has-error");
                }
            }
        }

        // Validate Ship Name: text only, min 2 chars
        if (shipName) {
            const val = shipName.value.trim();
            const namePattern = /^[a-zA-Z\s]{2,50}$/;
            setFieldError(shipName, val === "" || !namePattern.test(val));
        }

        // Validate Ship Email
        if (shipEmail) {
            const val = shipEmail.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setFieldError(shipEmail, val === "" || !emailPattern.test(val));
        }

        // Validate Ship Address
        if (shipAddress) {
            setFieldError(shipAddress, shipAddress.value.trim() === "");
        }

        // Validate Ship City
        if (shipCity) {
            const val = shipCity.value.trim();
            setFieldError(shipCity, val === "" || val.length < 2);
        }

        // Validate Ship Zip: 5 or 6 digit codes
        if (shipZip) {
            const val = shipZip.value.trim().replace(/\s/g, '');
            const zipPattern = /^[0-9]{5,6}$/;
            setFieldError(shipZip, val === "" || !zipPattern.test(val));
        }

        // Validate Card Name: not empty
        if (cardName) {
            const val = cardName.value.trim();
            const namePattern = /^[a-zA-Z\s]{2,50}$/;
            setFieldError(cardName, val === "" || !namePattern.test(val));
        }

        // Validate Card Number: 16 digits + Luhn algorithm check
        if (cardNumber) {
            const rawCard = cardNumber.value.replace(/\s/g, '');
            const cardPattern = /^[0-9]{16}$/;
            const passesLuhn = cardPattern.test(rawCard) && luhnCheck(rawCard);
            setFieldError(cardNumber, !passesLuhn);
        }

        // Validate Expiry MM/YY
        if (cardExpiry) {
            const val = cardExpiry.value.trim();
            const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
            
            let isExpired = true;
            if (expiryPattern.test(val)) {
                const parts = val.split("/");
                const expMonth = parseInt(parts[0], 10);
                const expYear = parseInt("20" + parts[1], 10);
                
                const now = new Date();
                const currentMonth = now.getMonth() + 1;
                const currentYear = now.getFullYear();
                
                if (expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth)) {
                    isExpired = false;
                }
            }
            setFieldError(cardExpiry, isExpired);
        }

        // Validate CVV: 3 or 4 digits
        if (cardCvv) {
            const val = cardCvv.value.trim();
            const cvvPattern = /^[0-9]{3,4}$/;
            setFieldError(cardCvv, val === "" || !cvvPattern.test(val));
        }

        return isValid;
    }

    // Luhn algorithm helper
    function luhnCheck(num) {
        let arr = (num + '').split('').reverse().map(x => parseInt(x, 10));
        let lastDigit = arr.splice(0, 1)[0];
        let sum = arr.reduce((acc, val, i) => (i % 2 !== 0) ? acc + val : acc + ((val * 2 > 9) ? val * 2 - 9 : val * 2), 0);
        return (sum + lastDigit) % 10 === 0;
    }

    // 4. Form Submit & Success Modal triggers
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            if (validateForm()) {
                // Form is valid! Show Order success screen
                showOrderSuccess();
            } else {
                // Focus on the first element with error
                const firstError = document.querySelector(".form-group.has-error .form-input");
                if (firstError) firstError.focus();
            }
        });
    }

    // Show Success Modal & calculations
    function showOrderSuccess() {
        if (!successModal) return;

        // Generate Order ID
        const orderId = "STK-" + Math.floor(10000 + Math.random() * 90000) + "-" + String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
        document.getElementById("success-order-id").textContent = orderId;

        // Generate delivery fittings date: current date + 3 days
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        document.getElementById("success-delivery-date").textContent = deliveryDate.toLocaleDateString('en-US', options);

        // Display address details
        const addressSummary = `${shipAddress.value.trim()}, ${shipCity.value.trim()}, ${shipZip.value.trim()}`;
        document.getElementById("success-address").textContent = addressSummary;

        // Show modal overlay
        successModal.classList.add("active");

        // Clear local storage cart
        if (window.StacklyCart) {
            window.StacklyCart.save([]);
            window.StacklyCart.updateCount();
        }
    }

    // Navbar Scroll state
    const navbar = document.getElementById("checkout-navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 30);
        });
    }

    // Initialize summary load
    loadSummary();
});
