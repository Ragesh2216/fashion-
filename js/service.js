document.addEventListener("DOMContentLoaded", () => {

    // 1. Scroll progress bar
    const scrollBar = document.getElementById("page-scroll-indicator");
    window.addEventListener("scroll", () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total > 0) scrollBar.style.width = `${(window.scrollY / total) * 100}%`;
    });

    // 2. Navbar scrolled state
    const navbar = document.getElementById("service-navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 30);
    });



    // 4. Heading words stagger — trigger after short delay
    const words = document.querySelectorAll(".sh-word");
    setTimeout(() => {
        words.forEach(w => w.classList.add("sh-visible"));
    }, 80);

    // 5. Mouse parallax tilt on hero image
    const shRight = document.getElementById("sh-right");
    document.addEventListener("mousemove", (e) => {
        if (!shRight) return;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        shRight.style.transform =
            `perspective(900px) rotateY(${dx * 3.5}deg) rotateX(${-dy * 2.5}deg) translateX(0) scale(1)`;
    });
    document.addEventListener("mouseleave", () => {
        if (shRight) shRight.style.transform = "";
    });

    // 6. Scroll-reveal for .reveal-scroll-up elements
    const revealEls = document.querySelectorAll(".reveal-scroll-up");
    const revealObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(el => revealObs.observe(el));

    // 7. Primary care header animated reveal
    const svcHeader = document.getElementById("svc-header");
    const headerObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    if (svcHeader) headerObs.observe(svcHeader);

    // 8. Primary care cards — stagger card-in
    const pcards = document.querySelectorAll(".svc-pcard");
    const pcardObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("card-in");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });
    pcards.forEach(c => pcardObs.observe(c));

    // 9. Specialist block + its inner cards
    const specBlock = document.getElementById("svc-specialist-block");
    const specObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("card-in");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    if (specBlock) specObs.observe(specBlock);

    // 10. Hover tilt on specialist mini-cards
    document.querySelectorAll(".svc-spec-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            card.style.transform =
                `translateY(-7px) scale(1.025) perspective(600px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    // 11. Advanced fashion Devices rows — slide in on scroll
    const devRows = document.querySelectorAll(".svc-devices-row");
    const devObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("row-in");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    devRows.forEach(r => devObs.observe(r));

    // 12. Image tilt on device frames
    document.querySelectorAll(".svc-dev-img-frame[data-tilt]").forEach(frame => {
        frame.addEventListener("mousemove", (e) => {
            const rect = frame.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            frame.style.transform =
                `perspective(700px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg) scale(1.02) rotate(0.3deg)`;
        });
        frame.addEventListener("mouseleave", () => { frame.style.transform = ""; });
    });

    // 13. Trusted stylecare — header + cards
    const trustedHeader = document.getElementById("svc-trusted-header");
    const trustedHeaderObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add("in"); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.2 });
    if (trustedHeader) trustedHeaderObs.observe(trustedHeader);

    const trustedCards = document.querySelectorAll(".svc-trusted-card");
    const tcObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add("tc-in"), i * 120);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    trustedCards.forEach(c => tcObs.observe(c));

    // 14. FAQ — header + accordion items
    const faqHeader = document.getElementById("svc-faq-header");
    const faqHeaderObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add("in"); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.2 });
    if (faqHeader) faqHeaderObs.observe(faqHeader);

    const faqItems = document.querySelectorAll(".svc-faq-item");
    const faqItemObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add("faq-in"), i * 100);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    faqItems.forEach(item => faqItemObs.observe(item));

    // 15. FAQ accordion toggle
    faqItems.forEach(item => {
        const btn = item.querySelector(".svc-faq-q");
        if (!btn) return;
        btn.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");
            // Close all
            faqItems.forEach(i => {
                i.classList.remove("open");
                i.querySelector(".svc-faq-q").setAttribute("aria-expanded", "false");
            });
            // Open clicked if it was closed
            if (!isOpen) {
                item.classList.add("open");
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });

    // 16. Reveal CTA card
    const ctaCards = document.querySelectorAll(".cta-card");
    const ctaObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add("active"); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.1 });
    ctaCards.forEach(c => ctaObs.observe(c));

});
