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

    // Menu Data (Inlined to avoid CORS issues with local files)
    const MENU_DATA = [
        { name: "Baguette Tradition", price_eur: 1.30, description: "Farine de blé, levain naturel, croûte croustillante." },
        { name: "Baguette Classique", price_eur: 1.10, description: "Baguette légère, idéale pour tous les repas." },
        { name: "Pain de Campagne", price_eur: 3.50, description: "Farines de blé et seigle, fermentation lente." },
        { name: "Pain Complet", price_eur: 3.20, description: "Riche en fibres, goût prononcé." },
        { name: "Pain aux Céréales", price_eur: 3.80, description: "Graines variées, texture moelleuse." },
        { name: "Pain de Seigle", price_eur: 3.90, description: "Saveur rustique, idéal avec fromages." },
        { name: "Ficelle", price_eur: 0.90, description: "Fine et croustillante, parfaite à partager." },
        { name: "Croissant Pur Beurre", price_eur: 1.20, description: "Feuilletage doré, beurre AOP." },
        { name: "Pain au Chocolat", price_eur: 1.30, description: "Chocolat fondant, pâte pur beurre." },
        { name: "Chausson aux Pommes", price_eur: 1.60, description: "Compote de pommes maison." },
        { name: "Pain aux Raisins", price_eur: 1.80, description: "Crème pâtissière et raisins secs." },
        { name: "Brioche Nature", price_eur: 3.90, description: "Moelleuse et légèrement sucrée." },
        { name: "Brioche aux Pépites de Chocolat", price_eur: 4.30, description: "Brioche gourmande au chocolat noir." },
        { name: "Sandwich Jambon Beurre", price_eur: 4.50, description: "Jambon supérieur, beurre doux." },
        { name: "Sandwich Poulet Crudités", price_eur: 4.90, description: "Poulet rôti, salade, tomates." },
        { name: "Quiche Lorraine", price_eur: 3.80, description: "Lardons, œufs, crème fraîche." },
        { name: "Pizza Tomate Fromage", price_eur: 3.50, description: "Sauce tomate, fromage fondant." },
        { name: "Pizza Reine", price_eur: 4.20, description: "Jambon, champignons, fromage." },
        { name: "Éclair au Chocolat", price_eur: 2.80, description: "Crème chocolat, glaçage fondant." },
        { name: "Éclair Café", price_eur: 2.80, description: "Crème pâtissière au café." },
        { name: "Tartelette aux Fraises", price_eur: 3.20, description: "Fraises fraîches, crème légère." },
        { name: "Tartelette au Citron", price_eur: 3.10, description: "Crème citron acidulée." },
        { name: "Millefeuille", price_eur: 3.50, description: "Feuilletage croustillant, crème vanille." },
        { name: "Flan Pâtissier", price_eur: 2.90, description: "Flan onctueux à la vanille." },
        { name: "Cookie Chocolat", price_eur: 1.80, description: "Moelleux, chocolat généreux." }
    ];

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
