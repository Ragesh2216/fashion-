document.addEventListener("DOMContentLoaded", () => {

    // 1. Scroll Progress Bar
    const scrollBar = document.getElementById("page-scroll-indicator");
    window.addEventListener("scroll", () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total > 0) scrollBar.style.width = `${(window.scrollY / total) * 100}%`;
    });

    // 2. Navbar — add .scrolled class on scroll
    const navbar = document.getElementById("about-navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 30);
    });



    // 4. Heading lines — stagger in on load
    const ahLines = document.querySelectorAll(".ah-line");
    // Small delay so CSS animations on tagline fire first
    setTimeout(() => {
        ahLines.forEach(line => line.classList.add("ah-line-visible"));
    }, 100);

    // 5. Stats counter animation — fires when stats bar enters viewport
    const statsBar = document.getElementById("about-stats-bar");
    let statsCounted = false;

    function countUp(el) {
        const target = parseInt(el.getAttribute("data-target"), 10);
        const duration = 1800;
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

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsCounted) {
                statsCounted = true;
                document.querySelectorAll(".about-stat-num").forEach(countUp);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (statsBar) statsObserver.observe(statsBar);

    // 6. Parallax tilt on hero image (subtle mouse-follow)
    const ahRight = document.getElementById("ah-right");
    document.addEventListener("mousemove", (e) => {
        if (!ahRight) return;
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        ahRight.style.transform = `perspective(900px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg) translateX(0)`;
    });
    document.addEventListener("mouseleave", () => {
        if (ahRight) ahRight.style.transform = "";
    });

    // 7. Scroll-reveal for all .reveal-scroll-up elements (including story/journey cards)
    const revealEls = document.querySelectorAll(".reveal-scroll-up");
    const revealObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    revealEls.forEach(el => revealObs.observe(el));

    // 8. Subtle mouse-follow tilt on sj-img-frame elements
    document.querySelectorAll(".sj-img-frame[data-tilt]").forEach(frame => {
        frame.addEventListener("mousemove", (e) => {
            const rect = frame.getBoundingClientRect();
            const cx = rect.left + rect.width  / 2;
            const cy = rect.top  + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width  / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            frame.style.transform = `perspective(700px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg) scale(1.02)`;
        });
        frame.addEventListener("mouseleave", () => {
            frame.style.transform = "";
        });
    });

    // 9. Core Values — duplicate track cards for seamless infinite loop
    const vhTrack = document.getElementById("vh-values-track");
    if (vhTrack) {
        // Clone all children and append for seamless loop
        const origCards = Array.from(vhTrack.children);
        origCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            vhTrack.appendChild(clone);
        });
    }

    // 10. Core Values — pause scroll animation on drag (touch/pointer)
    const trackWrapper = document.getElementById("vh-track-wrapper");
    if (trackWrapper && vhTrack) {
        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        trackWrapper.addEventListener("pointerdown", (e) => {
            isDragging = true;
            startX = e.clientX;
            vhTrack.style.animationPlayState = "paused";
            trackWrapper.setPointerCapture(e.pointerId);
        });

        trackWrapper.addEventListener("pointermove", (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            trackWrapper.scrollLeft = scrollLeft - dx;
        });

        trackWrapper.addEventListener("pointerup", () => {
            isDragging = false;
            vhTrack.style.animationPlayState = "running";
        });
    }

});
