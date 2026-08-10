document.addEventListener("DOMContentLoaded", () => {

    // FAQ Accordion click toggles
    try {
        const faqQuestions = document.querySelectorAll(".faq-question");
        faqQuestions.forEach(q => {
            q.addEventListener("click", () => {
                const item = q.closest(".faq-item");
                if (!item) return;
                const isActive = item.classList.contains("active");
                
                // Close all items
                document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
                
                // Toggle clicked item
                if (!isActive) {
                    item.classList.add("active");
                }
            });
        });
    } catch (e) {
        console.error("Error in FAQ accordion logic:", e);
    }

    // General scroll reveal observer for contact page additions
    try {
        const scrollRevealItems = document.querySelectorAll(".reveal-scroll-up, .reveal-fade-up, .reveal-fade-left, .reveal-fade-right");
        if (scrollRevealItems.length > 0 && typeof IntersectionObserver !== "undefined") {
            const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            scrollRevealItems.forEach(item => scrollRevealObserver.observe(item));
        }
    } catch (e) {
        console.error("Error in general scroll reveal:", e);
    }

});
