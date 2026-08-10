document.addEventListener("DOMContentLoaded", () => {

    // 1. Scroll progress bar
    try {
        const scrollBar = document.getElementById("page-scroll-indicator");
        if (scrollBar) {
            window.addEventListener("scroll", () => {
                const total = document.documentElement.scrollHeight - window.innerHeight;
                if (total > 0) {
                    scrollBar.style.width = `${(window.scrollY / total) * 100}%`;
                }
            });
        }
    } catch (e) {
        console.error("Error in scroll progress bar:", e);
    }

    // 2. Navbar scrolled state
    try {
        const navbar = document.getElementById("blog-navbar");
        if (navbar) {
            window.addEventListener("scroll", () => {
                navbar.classList.toggle("scrolled", window.scrollY > 30);
            });
        }
    } catch (e) {
        console.error("Error in navbar scroll state:", e);
    }



    // 4. Heading words stagger in on load
    try {
        const words = document.querySelectorAll(".bh-word");
        if (words.length > 0) {
            setTimeout(() => {
                words.forEach(w => w.classList.add("bh-visible"));
            }, 80);
        }
    } catch (e) {
        console.error("Error in heading words stagger:", e);
    }

    // 5. Animated underline under heading
    try {
        const headingLine = document.getElementById("bh-heading-line");
        if (headingLine) {
            setTimeout(() => {
                headingLine.classList.add("line-in");
            }, 800);
        }
    } catch (e) {
        console.error("Error in heading line animation:", e);
    }

    // 6. Stats counter — fires when stats bar enters view
    try {
        const statsBar = document.getElementById("bh-stats-bar");
        let statsCounted = false;

        function countUp(el) {
            if (!el) return;
            const target = parseInt(el.getAttribute("data-target"), 10);
            if (isNaN(target)) return;
            const duration = 1600;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        }

        if (statsBar && typeof IntersectionObserver !== "undefined") {
            const statsObs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !statsCounted) {
                        statsCounted = true;
                        document.querySelectorAll(".bh-stat-num").forEach(countUp);
                        statsObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            statsObs.observe(statsBar);
        }
    } catch (e) {
        console.error("Error in stats counter:", e);
    }

    // 7. Section header — bp-header animated reveal
    try {
        const bpHeader = document.getElementById("bp-header");
        if (bpHeader && typeof IntersectionObserver !== "undefined") {
            const bpHeaderObs = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            bpHeaderObs.observe(bpHeader);
        }
    } catch (e) {
        console.error("Error in bp-header animation:", e);
    }

    // 8. Post rows stagger in on scroll
    try {
        const bpPosts = document.querySelectorAll(".bp-post");
        if (bpPosts.length > 0 && typeof IntersectionObserver !== "undefined") {
            const postObs = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("post-in");
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
            bpPosts.forEach(p => postObs.observe(p));
        }
    } catch (e) {
        console.error("Error in post rows stagger:", e);
    }

    // 9. Tilt on post image frames
    try {
        const frames = document.querySelectorAll(".bp-post-img-frame[data-tilt]");
        frames.forEach(frame => {
            frame.addEventListener("mousemove", (e) => {
                const rect = frame.getBoundingClientRect();
                const cx = rect.left + rect.width  / 2;
                const cy = rect.top  + rect.height / 2;
                const dx = (e.clientX - cx) / (rect.width  / 2);
                const dy = (e.clientY - cy) / (rect.height / 2);
                frame.style.transform =
                    `perspective(700px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg) scale(1.02) rotate(0.4deg)`;
            });
            frame.addEventListener("mouseleave", () => { frame.style.transform = ""; });
        });
    } catch (e) {
        console.error("Error in image frame tilt:", e);
    }

    // 10. Latest Articles section header
    try {
        const blHeader = document.getElementById("bl-header");
        if (blHeader && typeof IntersectionObserver !== "undefined") {
            const blHeaderObs = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.18 });
            blHeaderObs.observe(blHeader);
        }
    } catch (e) {
        console.error("Error in latest articles header:", e);
    }

    // 11. Latest article cards — stagger in
    try {
        const blCards = document.querySelectorAll(".bl-card");
        if (blCards.length > 0 && typeof IntersectionObserver !== "undefined") {
            const blCardObs = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("card-in");
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
            blCards.forEach(c => blCardObs.observe(c));
        }
    } catch (e) {
        console.error("Error in article cards stagger:", e);
    }

    // 12. Latest articles CTA row
    try {
        const blCtaRow = document.getElementById("bl-cta-row");
        if (blCtaRow && typeof IntersectionObserver !== "undefined") {
            const blCtaObs = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            blCtaObs.observe(blCtaRow);
        }
    } catch (e) {
        console.error("Error in CTA row reveal:", e);
    }

    // 13. CTA card reveal
    try {
        const ctaCards = document.querySelectorAll(".cta-card");
        if (ctaCards.length > 0 && typeof IntersectionObserver !== "undefined") {
            ctaCards.forEach(card => {
                const cObs = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("active");
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                cObs.observe(card);
            });
        }
    } catch (e) {
        console.error("Error in CTA card reveal:", e);
    }

    // 14. Hero filter pills
    try {
        const heroFilters = document.querySelectorAll(".bh-filter");
        heroFilters.forEach(btn => {
            btn.addEventListener("click", () => {
                heroFilters.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
            });
        });
    } catch (e) {
        console.error("Error in filter pills:", e);
    }

    // 15. Mouse parallax on hero bg
    try {
        const heroBg = document.querySelector(".bh-bg-img");
        if (heroBg) {
            document.addEventListener("mousemove", (e) => {
                const cx = window.innerWidth  / 2;
                const cy = window.innerHeight / 2;
                const dx = (e.clientX - cx) / cx;
                const dy = (e.clientY - cy) / cy;
                heroBg.style.transform = `scale(1.06) translate(${dx * -8}px, ${dy * -6}px)`;
            });
        }
    } catch (e) {
        console.error("Error in hero parallax:", e);
    }



    // 17. General scroll reveal observer
    try {
        const scrollRevealItems = document.querySelectorAll(".reveal-scroll-up");
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
