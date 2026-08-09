/**
 * ============================================================================
 * MUHAMMAD HASHIR ARAIN — DARK AESTHETIC PORTFOLIO ENGINE
 * Dynamic card spotlight physics, smooth interactions & contact handling
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initCardSpotlights();
    initCursorSpotlight();
    initHeaderScroll();
    initMobileNav();
    initContactForm();
});

/* ==========================================================================
   1. DYNAMIC CARD SPOTLIGHT HOVER PHYSICS (Linear/Vercel Aesthetic)
   ========================================================================== */
function initCardSpotlights() {
    const cards = document.querySelectorAll('[data-spotlight]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ==========================================================================
   2. AMBIENT CURSOR TORCHLIGHT (Subtle Atmospheric Flare)
   ========================================================================== */
function initCursorSpotlight() {
    const spotlight = document.getElementById('cursor-spotlight');
    if (!spotlight || window.innerWidth <= 768) return;

    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function renderSpotlight() {
        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;

        spotlight.style.left = `${currentX}px`;
        spotlight.style.top = `${currentY}px`;

        requestAnimationFrame(renderSpotlight);
    }
    renderSpotlight();
}

/* ==========================================================================
   3. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   4. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}

/* ==========================================================================
   5. CONTACT FORM & TOAST ALERTS
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!form || !submitBtn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showToast('Please fill out all required fields.');
            return;
        }

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<span>Sent Successfully!</span> <i class="fa-solid fa-check"></i>';
            showToast(`Thanks ${name}! Your message was sent.`);
            form.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, 1000);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast-popup');
    const toastBody = document.getElementById('toast-body');

    if (!toast || !toastBody) return;

    toastBody.textContent = message;
    toast.classList.add('visible');

    setTimeout(() => {
        toast.classList.remove('visible');
    }, 4000);
}

/* ==========================================================================
   6. DYNAMIC LIVE PROJECT UPDATE HELPER
   ========================================================================== */
window.updateLiveProject = function(data) {
    if (data.title) {
        const titleEl = document.getElementById('live-project-title');
        if (titleEl) titleEl.innerText = data.title;
    }
    if (data.url) {
        const linkEl = document.getElementById('live-project-link');
        const addrBar = document.getElementById('browser-address-bar');
        if (linkEl) linkEl.href = data.url;
        if (addrBar) addrBar.innerHTML = `<i class="fa-solid fa-lock"></i> ${data.url}`;
    }
    if (data.desc) {
        const descEl = document.getElementById('live-project-desc');
        if (descEl) descEl.innerText = data.desc;
    }
};