/* ==========================================================================
   STACKLY Healthcare � loading.js  (v2 � Light theme)
   Injects and controls the animated loading overlay
   ========================================================================== */

(function () {
    'use strict';

    /* -- 1. BUILD OVERLAY HTML -- */
    function buildLoader() {

        /* Particles */
        const particleData = [
            { left: '6%',  dur: '9s',  delay: '0s',   size: '5px' },
            { left: '15%', dur: '7s',  delay: '1.3s', size: '4px' },
            { left: '26%', dur: '11s', delay: '0.6s', size: '6px' },
            { left: '38%', dur: '8s',  delay: '2.2s', size: '3px' },
            { left: '50%', dur: '10s', delay: '0.9s', size: '5px' },
            { left: '63%', dur: '7.5s',delay: '1.8s', size: '4px' },
            { left: '74%', dur: '9.5s',delay: '0.4s', size: '6px' },
            { left: '85%', dur: '8.5s',delay: '2.6s', size: '3px' },
            { left: '93%', dur: '11s', delay: '1.1s', size: '5px' },
        ];
        const particles = particleData.map(p =>
            `<div class="loader-particle" style="left:${p.left};width:${p.size};height:${p.size};animation-duration:${p.dur};animation-delay:${p.delay};"></div>`
        ).join('');

        /* Floating fashion & Fashion Store icons */
        const iconData = [
            { icon: 'fa-shirt',           left: '5%',  top: '12%', dur: '9s',  delay: '0s'   },
            { icon: 'fa-scissors',        left: '87%', top: '18%', dur: '11s', delay: '1.8s' },
            { icon: 'fa-gem',             left: '10%', top: '72%', dur: '10s', delay: '3.2s' },
            { icon: 'fa-bag-shopping',    left: '80%', top: '65%', dur: '8.5s',delay: '2.4s' },
            { icon: 'fa-crown',           left: '54%', top: '6%',  dur: '9s',  delay: '1.2s' },
            { icon: 'fa-socks',           left: '22%', top: '83%', dur: '12s', delay: '4.0s' },
            { icon: 'fa-store',           left: '69%', top: '10%', dur: '8s',  delay: '2.9s' },
            { icon: 'fa-ribbon',          left: '42%', top: '80%', dur: '10s', delay: '3.6s' },
            { icon: 'fa-glasses',         left: '92%', top: '44%', dur: '9.5s',delay: '1.5s' },
            { icon: 'fa-tags',            left: '2%',  top: '44%', dur: '8.5s',delay: '2.7s' },
        ];
        const iconHtml = iconData.map(d =>
            `<i class="loader-icon-float fa-solid ${d.icon}" style="left:${d.left};top:${d.top};animation-duration:${d.dur};animation-delay:${d.delay};font-size:${Math.random() > 0.5 ? '2rem' : '1.6rem'};"></i>`
        ).join('');

        /* Corner sparkle decoration SVG (four-point gold star) */
        const sparkleSvg = `
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                <path d="M50 0 C50 35, 65 50, 100 50 C65 50, 50 65, 50 100 C50 65, 35 50, 0 50 C35 50, 50 35, 50 0 Z" fill="#5EBA9B"/>
            </svg>`;

        /* Silk Drape Wave line � smooth waving path representing fabric flow */
        const ecgPts1 = "0,26 30,22 60,30 90,22 120,30 150,22 180,30 210,22 240,30 270,22 300,30 320,26";
        const ecgPts2 = "320,26 350,22 380,30 410,22 440,30 470,22 500,30 530,22 560,30 590,22 620,30 640,26";

        /* Build full element */
        const loader = document.createElement('div');
        loader.id = 'stackly-loader';
        loader.setAttribute('role', 'status');
        loader.setAttribute('aria-label', 'Loading Stackly Fashion Store');
        loader.innerHTML = `

            <!-- BG gradient -->
            <div class="loader-bg-gradient"></div>

            <!-- Subtle grid -->
            <div class="loader-grid-pattern"></div>

            <!-- Glowing blobs -->
            <div class="loader-blob loader-blob-1"></div>
            <div class="loader-blob loader-blob-2"></div>
            <div class="loader-blob loader-blob-3"></div>

            <!-- Rising particles -->
            <div class="loader-particles">${particles}</div>

            <!-- Floating icons -->
            <div class="loader-icons-bg">${iconHtml}</div>

            <!-- Corner gold sparkles -->
            <div class="loader-cross loader-cross-tl">${sparkleSvg}</div>
            <div class="loader-cross loader-cross-br">${sparkleSvg}</div>

            <!-- -- MAIN CONTENT -- -->
            <div class="loader-content">

                <!-- Logo -->
                <div class="loader-logo-wrap">
                    <img class="loader-logo-img"
                         src="assets/home/stackly-logo.webp"
                         onerror="this.style.display='none';document.getElementById('loader-text-logo').style.display='block';"
                         alt="Stackly Logo">
                    <span id="loader-text-logo" style="display:none;font-family:'Outfit',sans-serif;font-size:1.9rem;font-weight:800;color:#5EBA9B;letter-spacing:-0.02em;">STACKLY</span>
                    <span class="loader-brand-pill">Fashion Store & Studio</span>
                </div>

                <!-- Heartbeat ring with progress arc -->
                <div class="loader-ring-wrap">
                    <div class="loader-ring-outer"></div>
                    <div class="loader-ring-dot"></div>

                    <!-- SVG progress arc -->
                    <svg class="loader-arc-svg" viewBox="0 0 170 170">
                        <defs>
                            <linearGradient id="arcGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%"   stop-color="#C6ECD9"/>
                                <stop offset="100%" stop-color="#163A5F"/>
                            </linearGradient>
                        </defs>
                        <circle class="loader-arc-track" cx="85" cy="85" r="75"/>
                        <circle class="loader-arc-fill"  cx="85" cy="85" r="75"/>
                    </svg>

                    <!-- Glassy inner ring -->
                    <div class="loader-ring-inner-card"></div>

                    <!-- Pulsing hanger core -->
                    <div class="loader-ring-core">
                        <i class="loader-heart-icon fa-solid fa-shirt"></i>
                    </div>
                </div>

                <!-- Silk Wave line -->
                <div class="loader-ecg-wrap">
                    <svg class="loader-ecg-svg" viewBox="0 0 640 52" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="ecgGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stop-color="#C6ECD9" stop-opacity="0.2"/>
                                <stop offset="40%"  stop-color="#5EBA9B" stop-opacity="1"/>
                                <stop offset="60%"  stop-color="#163A5F" stop-opacity="1"/>
                                <stop offset="100%" stop-color="#C6ECD9" stop-opacity="0.2"/>
                            </linearGradient>
                            <filter id="ecgGlowLight">
                                <feGaussianBlur stdDeviation="1.8" result="blur"/>
                                <feMerge>
                                    <feMergeNode in="blur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <polyline points="${ecgPts1}"
                            fill="none" stroke="url(#ecgGradLight)" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round"
                            filter="url(#ecgGlowLight)"/>
                        <polyline points="${ecgPts2}"
                            fill="none" stroke="url(#ecgGradLight)" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round"
                            filter="url(#ecgGlowLight)"/>
                    </svg>
                </div>

                <!-- Progress bar -->
                <div class="loader-progress-wrap">
                    <div class="loader-progress-track">
                        <div class="loader-progress-fill"></div>
                    </div>
                </div>

                <!-- Cycling status -->
                <p class="loader-status-text" id="loader-status">
                    Initialising
                    <span class="loader-dots">
                        <span>.</span><span>.</span><span>.</span>
                    </span>
                </p>

            </div>

            <!-- Bottom tagline -->
            <p class="loader-tagline">Your Style, Our Priority &nbsp;&middot;&nbsp; Stackly Fashion Store&#8482;</p>
        `;

        return loader;
    }

    /* -- 2. STATUS TEXT CYCLING -- */
    const messages = ['Curating collection', 'Unfolding fabrics', 'Fitting check', 'Styling runway', 'Welcome'];
    let msgIdx = 0;

    function cycleStatus(el) {
        if (!el) return;
        msgIdx = (msgIdx + 1) % messages.length;
        el.innerHTML = `${messages[msgIdx]} <span class="loader-dots"><span>.</span><span>.</span><span>.</span></span>`;
    }

    /* -- 3. HIDE LOADER -- */
    function hideLoader(el) {
        el.classList.add('loader-hide');
        setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 750);
    }

    /* -- 4. INIT -- */
    function init() {
        const loaderEl = buildLoader();
        document.body.style.overflow = 'hidden';
        document.body.prepend(loaderEl);

        const statusEl = document.getElementById('loader-status');
        const statusInterval = setInterval(() => cycleStatus(statusEl), 680);

        const MIN_MS = 2800;
        const t0 = Date.now();

        function done() {
            const wait = Math.max(0, MIN_MS - (Date.now() - t0));
            clearInterval(statusInterval);
            if (statusEl) statusEl.textContent = 'Welcome';
            setTimeout(() => {
                document.body.style.overflow = '';
                hideLoader(loaderEl);
            }, wait);
        }

        if (document.readyState === 'complete') {
            done();
        } else {
            window.addEventListener('load', done, { once: true });
            setTimeout(() => {
                clearInterval(statusInterval);
                document.body.style.overflow = '';
                hideLoader(loaderEl);
            }, 5000);
        }
    }

    if (document.body) {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    }

})();


