/**
 * Musharraf Ali — Curriculum Vitae & Interactive Portfolio
 * Zero-Dead-Space Scroll Animation & Contact Validation Engine
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // 1. Campus Cafe Showcase: Seamless Bottom-to-Top Ascent & Zoom Animation
    // ========================================================
    const desktopStage = document.getElementById('desktop-stage');
    const desktopFrame = document.getElementById('desktopFrame');
    
    const mobileStage = document.getElementById('mobile-stage');
    const robotContainer = document.getElementById('robotContainer');

    let scrollTicking = false;

    function animateScroll() {
        const windowHeight = window.innerHeight;

        // --- Desktop Stage Scroll Calculation ---
        if (desktopStage && desktopFrame) {
            const rect = desktopStage.getBoundingClientRect();
            
            // Total range from entering bottom of viewport to leaving top of viewport
            const totalTravel = windowHeight + rect.height;
            const currentTravel = windowHeight - rect.top;
            let progress = currentTravel / totalTravel;
            progress = Math.min(Math.max(progress, 0), 1);

            if (rect.bottom < 0 || rect.top > windowHeight) {
                // Out of viewport
                desktopFrame.style.opacity = '0.5';
            } else {
                if (progress <= 0.45) {
                    // Phase 1: Ascend from bottom (subtle 30px up to 0px) and zoom in (0.92x to 1.0x)
                    const subP = progress / 0.45;
                    const translateY = (1 - subP) * 30; // 30px to 0px
                    const scale = 0.92 + (subP * 0.08); // 0.92 to 1.0
                    const opacity = Math.min(1, 0.6 + subP * 0.4);

                    desktopFrame.style.transform = `translateY(${translateY}px) scale(${scale})`;
                    desktopFrame.style.opacity = `${opacity}`;
                } else if (progress <= 0.75) {
                    // Holding state: full view, stable, prominent
                    desktopFrame.style.transform = 'translateY(0px) scale(1)';
                    desktopFrame.style.opacity = '1';
                } else {
                    // Phase 2: Gentle zoom back out (1.0x to 0.94x) as user continues scrolling past
                    const subP = (progress - 0.75) / 0.25;
                    const scale = 1.0 - (subP * 0.06);
                    const translateY = -subP * 20;
                    const opacity = Math.max(0.5, 1 - (subP * 0.4));

                    desktopFrame.style.transform = `translateY(${translateY}px) scale(${scale})`;
                    desktopFrame.style.opacity = `${opacity}`;
                }
            }
        }

        // --- Mobile / Robot Stage Scroll Calculation ---
        if (mobileStage && robotContainer) {
            const rect = mobileStage.getBoundingClientRect();
            const totalTravel = windowHeight + rect.height;
            const currentTravel = windowHeight - rect.top;
            let progress = currentTravel / totalTravel;
            progress = Math.min(Math.max(progress, 0), 1);

            if (rect.bottom < 0 || rect.top > windowHeight) {
                robotContainer.style.opacity = '0.5';
            } else {
                if (progress <= 0.45) {
                    // Phase 1: Ascend from bottom (subtle 30px up to 0px) and zoom in (0.92x to 1.0x)
                    const subP = progress / 0.45;
                    const translateY = (1 - subP) * 30;
                    const scale = 0.92 + (subP * 0.08);
                    const opacity = Math.min(1, 0.6 + subP * 0.4);

                    robotContainer.style.transform = `translateY(${translateY}px) scale(${scale})`;
                    robotContainer.style.opacity = `${opacity}`;
                } else if (progress <= 0.75) {
                    // Holding state
                    robotContainer.style.transform = 'translateY(0px) scale(1)';
                    robotContainer.style.opacity = '1';
                } else {
                    // Phase 2: Gentle zoom back out
                    const subP = (progress - 0.75) / 0.25;
                    const scale = 1.0 - (subP * 0.06);
                    const translateY = -subP * 20;
                    const opacity = Math.max(0.5, 1 - (subP * 0.4));

                    robotContainer.style.transform = `translateY(${translateY}px) scale(${scale})`;
                    robotContainer.style.opacity = `${opacity}`;
                }
            }
        }

        scrollTicking = false;
    }

    function onScrollRequest() {
        if (!scrollTicking) {
            requestAnimationFrame(animateScroll);
            scrollTicking = true;
        }
    }

    window.addEventListener('scroll', onScrollRequest, { passive: true });
    window.addEventListener('resize', onScrollRequest, { passive: true });

    // Initial calculation
    animateScroll();

    // ========================================================
    // 2. Contact Form: Inline Validation & Rapid Confirmation (<250ms)
    // ========================================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    const fields = {
        name: {
            input: document.getElementById('name'),
            error: document.getElementById('nameError'),
            validate: (val) => val.trim().length >= 2 ? '' : 'Please enter your full name (at least 2 characters).'
        },
        email: {
            input: document.getElementById('email'),
            error: document.getElementById('emailError'),
            validate: (val) => {
                const trimmed = val.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!trimmed) return 'Please enter your email address.';
                if (!emailRegex.test(trimmed)) return 'Please provide a valid email address.';
                return '';
            }
        },
        subject: {
            input: document.getElementById('subject'),
            error: document.getElementById('subjectError'),
            validate: (val) => val.trim().length >= 3 ? '' : 'Please enter a subject (at least 3 characters).'
        },
        message: {
            input: document.getElementById('message'),
            error: document.getElementById('messageError'),
            validate: (val) => val.trim().length >= 10 ? '' : 'Please write a message of at least 10 characters.'
        }
    };

    // Attach real-time validation on blur & input
    Object.keys(fields).forEach(key => {
        const item = fields[key];
        if (!item.input) return;

        item.input.addEventListener('input', () => {
            if (item.input.classList.contains('input-error')) {
                const errorMsg = item.validate(item.input.value);
                if (!errorMsg) {
                    item.input.classList.remove('input-error');
                    if (item.error) item.error.textContent = '';
                }
            }
        });

        item.input.addEventListener('blur', () => {
            const errorMsg = item.validate(item.input.value);
            if (errorMsg) {
                item.input.classList.add('input-error');
                if (item.error) item.error.textContent = errorMsg;
            } else {
                item.input.classList.remove('input-error');
                if (item.error) item.error.textContent = '';
            }
        });
    });

    // Form Submit Handler
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let hasError = false;
            let firstInvalidField = null;

            // Validate all fields
            Object.keys(fields).forEach(key => {
                const item = fields[key];
                if (!item.input) return;

                const errorMsg = item.validate(item.input.value);
                if (errorMsg) {
                    hasError = true;
                    item.input.classList.add('input-error');
                    if (item.error) item.error.textContent = errorMsg;
                    if (!firstInvalidField) firstInvalidField = item.input;
                } else {
                    item.input.classList.remove('input-error');
                    if (item.error) item.error.textContent = '';
                }
            });

            if (hasError) {
                if (firstInvalidField) firstInvalidField.focus();
                return;
            }

            const senderName = fields.name.input.value.trim() || 'Colleague';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span>`;
            }

            setTimeout(() => {
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';
                    formStatus.innerHTML = `<strong>Thank you, ${senderName}!</strong> Your message has been received. I will follow up with you directly at ${fields.email.input.value.trim()}.`;
                }

                contactForm.reset();

                // Clear any leftover field classes
                Object.keys(fields).forEach(key => {
                    fields[key].input.classList.remove('input-error');
                    if (fields[key].error) fields[key].error.textContent = '';
                });

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Message Sent</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = `<span>Send Message</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
                    }, 3500);
                }
            }, 250);
        });
    }

});