document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Progress Indicator Bar
    const scrollProgress = document.getElementById("page-scroll-indicator");
    if (scrollProgress) {
        window.addEventListener("scroll", () => {
            const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScrollHeight > 0) {
                const percentage = (window.scrollY / totalScrollHeight) * 100;
                scrollProgress.style.width = `${percentage}%`;
            }
        });
    }



    // 3. Entry Reveals trigger
    const navbar = document.getElementById("navbar-pill-element");
    const revealItems = document.querySelectorAll(".reveal-fade-up, .reveal-fade-right, .reveal-fade-left");

    setTimeout(() => {
        if (navbar) navbar.parentElement.classList.add("active");
        revealItems.forEach(item => item.classList.add("active"));
    }, 150);

    // 4. Role Tabbing Toggles (User vs Admin Selection)
    const tabs = document.querySelectorAll(".auth-tab");
    const formCard = document.querySelector(".auth-form-card");
    const roleInput = document.getElementById("input-role"); // hidden input tracking role

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const selectedRole = tab.getAttribute("data-role"); // "user" or "admin"
            if (roleInput) {
                roleInput.value = selectedRole;
            }

            // Adjust form card styling and roles
            if (selectedRole === "admin") {
                formCard.classList.add("role-admin");
            } else {
                formCard.classList.remove("role-admin");
            }

            // Dynamically alter labels based on selected role
            const userHeadings = document.querySelectorAll(".role-dynamic-text");
            userHeadings.forEach(heading => {
                if (selectedRole === "admin") {
                    heading.textContent = heading.getAttribute("data-admin-label");
                } else {
                    heading.textContent = heading.getAttribute("data-user-label");
                }
            });
        });
    });

    // 5. Toggle Password Visibility (Eye buttons option)
    const eyeToggles = document.querySelectorAll(".btn-eye-toggle");
    eyeToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const wrapper = toggle.closest(".password-input-wrapper");
            if (!wrapper) return;

            const passwordField = wrapper.querySelector(".form-input");
            if (!passwordField) return;

            const isPassword = passwordField.getAttribute("type") === "password";
            passwordField.setAttribute("type", isPassword ? "text" : "password");

            // Swap SVG Eye Icons
            const iconEyeOpen = toggle.querySelector(".icon-eye-open");
            const iconEyeClosed = toggle.querySelector(".icon-eye-closed");

            if (isPassword) {
                iconEyeOpen.style.display = "none";
                iconEyeClosed.style.display = "block";
            } else {
                iconEyeOpen.style.display = "block";
                iconEyeClosed.style.display = "none";
            }
        });
    });

    // 6. Inline Validation Check Listeners (Remove error style on user input)
    const formInputs = document.querySelectorAll(".form-input, .form-checkbox");
    formInputs.forEach(input => {
        const clearError = () => {
            const group = input.closest(".form-group");
            if (group && group.classList.contains("has-error")) {
                group.classList.remove("has-error");
            }
        };
        input.addEventListener("input", clearError);
        if (input.type === "checkbox") {
            input.addEventListener("change", clearError);
        }
    });

    // 7. Form validations and submit Toast notifications
    const authForm = document.getElementById("stackly-auth-form");
    const successToast = document.getElementById("success-toast-message");

    if (authForm) {
        authForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let hasErrors = false;

            // Select elements inside form
            const inputs = authForm.querySelectorAll("[required]");
            inputs.forEach(input => {
                const group = input.closest(".form-group");
                if (!group) return;
                const errorSpan = group.querySelector(".error-message");
                const value = input.value.trim();

                // Check empty / unchecked condition
                let isInvalid = false;
                if (input.type === "checkbox") {
                    isInvalid = !input.checked;
                } else {
                    isInvalid = !value;
                }

                if (isInvalid) {
                    group.classList.add("has-error");
                    if (errorSpan) {
                        if (input.type === "checkbox") {
                            errorSpan.querySelector(".error-text").textContent = "You must agree to the terms to proceed.";
                        } else {
                            errorSpan.querySelector(".error-text").textContent = "Please fill in this field.";
                        }
                    }
                    hasErrors = true;
                } else {
                    group.classList.remove("has-error");
                }

                // Verify Gmail Address matches mandatory domain rule
                if (input.getAttribute("type") === "email" && value && input.type !== "checkbox") {
                    if (!value.endsWith("@gmail.com")) {
                        group.classList.add("has-error");
                        if (errorSpan) {
                            errorSpan.querySelector(".error-text").textContent = "Email domain must be exactly @gmail.com";
                        }
                        hasErrors = true;
                    }
                }
            });

            // Verify Password and Confirm Password matches on Signup form
            const passwordInput = document.getElementById("input-password");
            const confirmInput = document.getElementById("input-confirm");

            if (passwordInput && confirmInput) {
                const passVal = passwordInput.value;
                const confirmVal = confirmInput.value;

                if (passVal && confirmVal && passVal !== confirmVal) {
                    const group = confirmInput.closest(".form-group");
                    group.classList.add("has-error");
                    const errorSpan = group.querySelector(".error-message");
                    if (errorSpan) {
                        errorSpan.querySelector(".error-text").textContent = "Passwords do not match.";
                    }
                    hasErrors = true;
                }
            }

            if (hasErrors) return;

            // Submit Button state change (spinner animation)
            const submitBtn = authForm.querySelector(".btn-form-submit");
            const originalBtnContent = submitBtn.innerHTML;
            const actionText = submitBtn.getAttribute("data-loading-text") || "Processing...";
            
            submitBtn.innerHTML = `<span>${actionText}</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="animate-spin" style="flex-shrink:0;"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity:0.25;"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;
            submitBtn.style.pointerEvents = "none";
            submitBtn.style.opacity = "0.85";

            // Trigger Successful Submission
            setTimeout(() => {
                // Save logged-in email and role to localStorage so dashboards can display it
                const emailInput = authForm.querySelector('[type="email"]');
                const roleInputVal = document.getElementById('input-role');
                if (emailInput) {
                    localStorage.setItem('stacklyUserEmail', emailInput.value.trim());
                }
                if (roleInputVal) {
                    localStorage.setItem('stacklyUserRole', roleInputVal.value || 'user');
                }

                if (successToast) {
                    // Update text if signing up
                    const isSignup = authForm.getAttribute("data-redirect") === "login.html";
                    if (isSignup) {
                        successToast.querySelector(".success-toast-text").textContent = "Account Created Successfully! Redirecting to login...";
                    }
                    successToast.classList.add('active');
                }

                // Determine redirect path
                const isSignup = authForm.getAttribute("data-redirect") === "login.html";
                let redirectPath = "login.html";
                if (!isSignup) {
                    const role = roleInputVal ? roleInputVal.value : 'user';
                    redirectPath = role === 'admin' ? 'admindashboard.html' : 'clientdashboard.html';
                }
                
                setTimeout(() => {
                    if (successToast) successToast.classList.remove('active');
                    window.location.href = redirectPath;
                }, 2000);
            }, 1200);
        });
    }

    // 8. Visual parallax hover effect
    const authImage = document.querySelector(".auth-image-inner");
    if (authImage) {
        document.addEventListener("mousemove", (e) => {
            const mouseX = e.clientX - window.innerWidth / 2;
            const mouseY = e.clientY - window.innerHeight / 2;
            const speed = 0.01;
            const xOffset = mouseX * speed;
            const yOffset = mouseY * speed;
            authImage.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    }
});
