/* ============================================
   MAISON FITOURI - JavaScript
   ============================================ */

// === Image Configuration ===
// 6 image variables with empty paths (placeholders have black background via CSS)
const IMAGES = {
    logoHero: './img/logo_transparent.png',           // Logo numérique
    logoNavbar: './img/logo_black.png',
    logoFooter: './img/logo_white.png',
    mainPhoto: './img/vitrine_1.jpg',      // Photo principale (hero background)
    interiorPhoto: './img/place.jpg',  // Photo verticale intérieur
    food1: './img/vitrine_2.jpg',          // Vitrine nourriture 1
    food2: './img/vitrine_3.jpg',          // Vitrine nourriture 2
    food3: './img/vitrine_4.jpg',          // Vitrine nourriture 3
    vitrine5: './img/vitrine_5.jpg',       // Vitrine 5
    vitrine6: './img/vitrine_6.jpg'        // Vitrine 6
};

// === DOM Elements ===
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// === Image Loader ===
function loadImages() {
    // Logos - different for each location
    const logoMappings = [
        { id: 'logo-nav', src: IMAGES.logoNavbar },
        { id: 'logo-hero', src: IMAGES.logoHero },
        { id: 'logo-footer', src: IMAGES.logoFooter }
    ];

    logoMappings.forEach(({ id, src }) => {
        const el = document.getElementById(id);
        if (el && src) {
            el.style.backgroundImage = `url(${src})`;
            el.style.backgroundSize = 'contain';
            el.style.backgroundPosition = 'center';
            el.style.backgroundRepeat = 'no-repeat';
            el.style.backgroundColor = 'transparent';
        }
    });

    // Hero background
    const heroBg = document.getElementById('hero-bg');
    if (heroBg && IMAGES.mainPhoto) {
        heroBg.style.backgroundImage = `url(${IMAGES.mainPhoto})`;
        heroBg.style.backgroundColor = 'transparent';
    }

    // Gallery images
    const mainPhoto = document.getElementById('main-photo');
    if (mainPhoto && IMAGES.mainPhoto) {
        mainPhoto.style.backgroundImage = `url(${IMAGES.mainPhoto})`;
    }

    const interiorPhoto = document.getElementById('interior-photo');
    if (interiorPhoto && IMAGES.interiorPhoto) {
        interiorPhoto.style.backgroundImage = `url(${IMAGES.interiorPhoto})`;
    }

    const foodPhotos = [
        { id: 'food-photo-1', src: IMAGES.food1 },
        { id: 'food-photo-2', src: IMAGES.food2 },
        { id: 'food-photo-3', src: IMAGES.food3 },
        { id: 'vitrine-photo-5', src: IMAGES.vitrine5 },
        { id: 'vitrine-photo-6', src: IMAGES.vitrine6 }
    ];

    foodPhotos.forEach(photo => {
        const el = document.getElementById(photo.id);
        if (el && photo.src) {
            el.style.backgroundImage = `url(${photo.src})`;
        }
    });
}

// === Navbar Scroll Effect ===
function handleNavbarScroll() {
    const logoNav = document.getElementById('logo-nav');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        // Switch to black logo when scrolled
        if (logoNav && IMAGES.logoNavbar) {
            logoNav.style.backgroundImage = `url(${IMAGES.logoNavbar})`;
        }
    } else {
        navbar.classList.remove('scrolled');
        // Switch to white logo when at top
        if (logoNav && IMAGES.logoFooter) {
            logoNav.style.backgroundImage = `url(${IMAGES.logoFooter})`;
        }
    }
}

// === Mobile Menu Toggle ===
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// === Smooth Scroll ===
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // Update active state
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');

    if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        closeMobileMenu();
    }
}

// === Scroll Animations (Intersection Observer) ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to animatable elements
    const animatableElements = document.querySelectorAll(
        '.formule-card, .offre-card, .galerie-item, .info-card, .section-header'
    );

    animatableElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// === Menu Panel Logic ===
async function initMenuPanel() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const menuPanel = document.getElementById('menu-panel');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuContent = document.getElementById('menu-content');

    console.log('Menu Panel Init:', { menuToggle, menuPanel, menuContent });

    if (!menuToggle || !menuPanel || !menuContent) {
        console.error('Menu elements missing');
        return;
    }

    // Toggle Menu
    function toggleMenu(e) {
        console.log('Toggle menu clicked');
        e.preventDefault(); // Prevent default behavior
        menuPanel.classList.toggle('active');
        menuToggle.classList.toggle('active'); // Animate button with panel
        if (menuOverlay) menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuPanel.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', toggleMenu);

    // Load Menu Data from JSON
    try {
        const response = await fetch('./data/menu.json');
        const data = await response.json();
        const MENU_DATA = data.menu;

        // Render Menu
        if (MENU_DATA && Array.isArray(MENU_DATA)) {
            menuContent.innerHTML = MENU_DATA.map(item => `
                <div class="menu-item">
                    <div class="menu-item-header">
                        <span class="menu-item-bullet">○</span>
                        <span class="menu-item-name">${item.name}</span>
                        <span class="menu-item-dots"></span>
                        <span class="menu-item-price">${item.price_eur.toFixed(2)}€</span>
                    </div>
                    <p class="menu-item-desc">${item.description}</p>
                </div>
            `).join('');
        } else {
            menuContent.innerHTML = '<p style="text-align:center; color:var(--color-text-light)">Le menu est indisponible pour le moment.</p>';
        }
    } catch (error) {
        console.error('Erreur lors du chargement du menu:', error);
        menuContent.innerHTML = '<p style="text-align:center; color:var(--color-text-light)">Le menu est indisponible pour le moment.</p>';
    }

    // Toggle Menu Color on Scroll (White in Hero)
    function handleMenuColor() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const toggleTop = menuToggle.getBoundingClientRect().top;

        // If toggle is within hero section (plus some buffer), make it white
        if (toggleTop < heroBottom - 50) {
            menuToggle.classList.add('white');
        } else {
            menuToggle.classList.remove('white');
        }
    }

    window.addEventListener('scroll', handleMenuColor);
    handleMenuColor(); // Initial check
}

// === Event Listeners ===
function initEventListeners() {
    // Navbar scroll
    window.addEventListener('scroll', handleNavbarScroll);

    // Mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Nav links smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

// === Reviews Carousel - Infinite Marquee ===
function initCarousel() {
    const track = document.getElementById('carousel-track');

    if (!track) return;

    // Duplicate all cards for seamless infinite loop
    const cards = track.innerHTML;
    track.innerHTML = cards + cards;
}

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    handleNavbarScroll();
    initEventListeners();
    initScrollAnimations();
    initCarousel();
    initMenuPanel();
});
