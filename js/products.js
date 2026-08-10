// STACKLY - products.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Products Database (35 unique premium items)
    const PRODUCTS_DB = [
        { id: "p1", title: "Sartorial Cashmere Blazer", price: 650, category: "Outerwear", image: "assets/img_6.webp", rating: 4.9, likes: 124 },
        { id: "p2", title: "Silk Georgette Gown", price: 450, category: "Dresses", image: "assets/img_8.webp", rating: 4.8, likes: 89 },
        { id: "p3", title: "Double-Breasted Wool Suit", price: 890, category: "Suits", image: "assets/img_10.webp", rating: 5.0, likes: 205 },
        { id: "p4", title: "Classic Wool Trench Coat", price: 780, category: "Outerwear", image: "assets/img_11.webp", rating: 4.7, likes: 110 },
        { id: "p5", title: "Bespoke Peak Lapel Suit", price: 950, category: "Suits", image: "assets/img_12.webp", rating: 4.9, likes: 184 },
        { id: "p6", title: "Velvet Evening Blazer", price: 580, category: "Outerwear", image: "assets/img_13.webp", rating: 4.6, likes: 72 },
        { id: "p7", title: "Pleated Silk Cocktail Dress", price: 390, category: "Dresses", image: "assets/img_14.webp", rating: 4.7, likes: 98 },
        { id: "p8", title: "Suede Chelsea Boots", price: 320, category: "Shoes", image: "assets/img_15.webp", rating: 4.5, likes: 140 },
        { id: "p9", title: "Italian Leather Oxford Shoes", price: 380, category: "Shoes", image: "assets/img_16.webp", rating: 4.8, likes: 112 },
        { id: "p10", title: "Cashmere Knit Scarf", price: 150, category: "Accessories", image: "assets/img_17.webp", rating: 4.9, likes: 64 },
        { id: "p11", title: "Structured Leather Handbag", price: 480, category: "Accessories", image: "assets/img_18.webp", rating: 4.6, likes: 83 },
        { id: "p12", title: "Linen Summer Suit", price: 720, category: "Suits", image: "assets/img_19.webp", rating: 4.8, likes: 151 },
        { id: "p13", title: "Draped Crepe Jumpsuit", price: 340, category: "Dresses", image: "assets/img_20.webp", rating: 4.5, likes: 92 },
        { id: "p14", title: "Shearling Aviator Jacket", price: 1200, category: "Outerwear", image: "assets/img_21.webp", rating: 5.0, likes: 230 },
        { id: "p15", title: "Leather Monk Strap Shoes", price: 360, category: "Shoes", image: "assets/img_22.webp", rating: 4.7, likes: 79 },
        { id: "p16", title: "Bespoke Silk Bow Tie", price: 85, category: "Accessories", image: "assets/img_23.webp", rating: 4.9, likes: 45 },
        { id: "p17", title: "Hand-Stitched Leather Belt", price: 110, category: "Accessories", image: "assets/img_24.webp", rating: 4.8, likes: 58 },
        { id: "p18", title: "Minimalist Trench Coat", price: 690, category: "Outerwear", image: "assets/img_25.webp", rating: 4.6, likes: 104 },
        { id: "p19", title: "A-Line Satin Midi Dress", price: 420, category: "Dresses", image: "assets/img_26.webp", rating: 4.7, likes: 118 },
        { id: "p20", title: "Slim-Fit Herringbone Suit", price: 860, category: "Suits", image: "assets/img_29.webp", rating: 4.9, likes: 167 },
        { id: "p21", title: "Fine Wool Knit Cardigan", price: 280, category: "Outerwear", image: "assets/img_30.webp", rating: 4.4, likes: 61 },
        { id: "p22", title: "Lace Overlay Prom Gown", price: 590, category: "Dresses", image: "assets/img_31.webp", rating: 4.9, likes: 145 },
        { id: "p23", title: "Modern Tuxedo Suit", price: 990, category: "Suits", image: "assets/img_32.webp", rating: 5.0, likes: 211 },
        { id: "p24", title: "Leather Driving Loafers", price: 290, category: "Shoes", image: "assets/img_33.webp", rating: 4.6, likes: 88 },
        { id: "p25", title: "Gold Plated Cufflinks", price: 180, category: "Accessories", image: "assets/img_34.webp", rating: 4.8, likes: 37 },
        { id: "p26", title: "Premium Silk Scarf", price: 160, category: "Accessories", image: "assets/img_35.webp", rating: 4.7, likes: 49 },
        { id: "p27", title: "Alpaca Wool Overcoat", price: 890, category: "Outerwear", image: "assets/img_36.webp", rating: 4.9, likes: 132 },
        { id: "p28", title: "Floral Silk Wrap Dress", price: 380, category: "Dresses", image: "assets/img_37.webp", rating: 4.5, likes: 76 },
        { id: "p29", title: "Tweed Plaid Blazer", price: 540, category: "Outerwear", image: "assets/img_38.webp", rating: 4.6, likes: 69 },
        { id: "p30", title: "Pinstripe Wool Suit", price: 870, category: "Suits", image: "assets/img_40.webp", rating: 4.8, likes: 119 },
        { id: "p31", title: "Patent Leather Pumps", price: 340, category: "Shoes", image: "assets/img_41.webp", rating: 4.7, likes: 94 },
        { id: "p32", title: "Merino Wool Crewneck", price: 220, category: "Outerwear", image: "assets/img_42.webp", rating: 4.6, likes: 53 },
        { id: "p33", title: "Hand-Tailored Velvet Gown", price: 750, category: "Dresses", image: "assets/img_43.webp", rating: 5.0, likes: 198 },
        { id: "p34", title: "Braided Leather Loafers", price: 310, category: "Shoes", image: "assets/img_1.webp", rating: 4.7, likes: 85 },
        { id: "p35", title: "Three-Piece Classic Suit", price: 1050, category: "Suits", image: "assets/img_3.webp", rating: 4.9, likes: 172 }
    ];

    // State Variables
    let currentCategory = "all";
    let searchQuery = "";
    let currentSort = "default";
    let likedProducts = JSON.parse(localStorage.getItem("stacklyLikedProducts") || "[]");

    const grid = document.getElementById("products-grid");
    const emptyState = document.getElementById("products-empty-state");
    const searchInput = document.getElementById("search-input");
    const categoryFilters = document.getElementById("category-filters");
    const sortSelect = document.getElementById("sort-select");

    // 2. Render Products
    function renderProducts() {
        // Clear previous cards (keeping empty state block)
        const cards = grid.querySelectorAll(".product-card");
        cards.forEach(c => c.remove());

        // Filter database
        let filtered = PRODUCTS_DB.filter(p => {
            const matchesCategory = (currentCategory === "all" || p.category === currentCategory);
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  p.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // Sort database
        if (currentSort === "price-asc") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === "price-desc") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === "likes-desc") {
            filtered.sort((a, b) => b.likes - a.likes);
        }

        // Show/Hide Empty State
        if (filtered.length === 0) {
            emptyState.style.display = "flex";
        } else {
            emptyState.style.display = "none";
        }

        // Generate Cards
        filtered.forEach((p, idx) => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.style.setProperty("--bl-delay", `${idx * 0.04}s`);
            
            const isLiked = likedProducts.includes(p.id);
            const stars = getStarsHtml(p.rating);

            card.innerHTML = `
                <div class="prod-img-wrap">
                    <img src="${p.image}" alt="${p.title}" class="prod-img" loading="lazy">
                    <button class="prod-like-btn ${isLiked ? 'liked' : ''}" data-id="${p.id}" aria-label="Add to favorites">
                        <i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                </div>
                <div class="prod-info">
                    <span class="prod-category">${p.category}</span>
                    <a href="404.html" class="prod-title">${p.title}</a>
                    <div class="prod-rating">
                        <div class="prod-rating-stars">${stars}</div>
                        <span class="prod-likes-text">(${p.likes} likes)</span>
                    </div>
                    <div class="prod-footer">
                        <span class="prod-price">$${p.price}</span>
                        <button class="prod-btn-add" data-id="${p.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            grid.insertBefore(card, emptyState);

            // Trigger stagger entry reveal
            setTimeout(() => {
                card.classList.add("card-in");
            }, 50);
        });

        // Re-attach listeners to dynamically created elements
        attachCardListeners();
    }

    // Helper: generate star ratings HTML
    function getStarsHtml(rating) {
        let html = '';
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                html += '<i class="fa-solid fa-star"></i>';
            } else if (i === fullStars && hasHalf) {
                html += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                html += '<i class="fa-regular fa-star"></i>';
            }
        }
        return html;
    }

    // 3. Attach Likes and Cart handlers
    function attachCardListeners() {
        // Likes Click
        grid.querySelectorAll(".prod-like-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const id = btn.getAttribute("data-id");
                const product = PRODUCTS_DB.find(p => p.id === id);
                if (!product) return;

                const icon = btn.querySelector("i");
                if (likedProducts.includes(id)) {
                    likedProducts = likedProducts.filter(item => item !== id);
                    btn.classList.remove("liked");
                    icon.className = "fa-regular fa-heart";
                    product.likes -= 1;
                } else {
                    likedProducts.push(id);
                    btn.classList.add("liked");
                    icon.className = "fa-solid fa-heart";
                    product.likes += 1;
                    if (window.StacklyCart) window.StacklyCart.showToast("Added to your favorites!");
                }
                
                // Update local storage and re-render count text on card
                localStorage.setItem("stacklyLikedProducts", JSON.stringify(likedProducts));
                const countText = btn.closest(".product-card").querySelector(".prod-likes-text");
                if (countText) {
                    countText.textContent = `(${product.likes} likes)`;
                }
            });
        });

        // Add to Cart Click
        grid.querySelectorAll(".prod-btn-add").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const product = PRODUCTS_DB.find(p => p.id === id);
                if (product && window.StacklyCart) {
                    window.StacklyCart.add({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        category: product.category
                    });
                }
            });
        });
    }

    // 4. Set Controls Listeners
    // Search input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderProducts();
        });
    }

    // Category Filter pills
    if (categoryFilters) {
        categoryFilters.querySelectorAll(".filter-pill").forEach(pill => {
            pill.addEventListener("click", () => {
                categoryFilters.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
                pill.classList.add("active");
                currentCategory = pill.getAttribute("data-category");
                renderProducts();
            });
        });
    }

    // Sort dropdown
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }

    // 5. Navbar Scrolled transition
    const navbar = document.getElementById("products-navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 30);
        });
    }

    // Initial render
    renderProducts();
});
