/* ═══════════════════════════════════════════
   CONSTRUCTION WEBSITE – Main JavaScript
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ─── LOADING SCREEN ───
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 1200);
    }

    // ─── NAVBAR SCROLL ───
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ─── MOBILE NAV TOGGLE ───
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        // Close nav on link click (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ─── COUNTER ANIMATION ───
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count, 10);
            if (isNaN(target)) return;
            let current = 0;
            const increment = Math.ceil(target / 80);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + (target > 100 ? '+' : '');
                    clearInterval(timer);
                } else {
                    counter.textContent = current + (target > 100 ? '+' : '');
                }
            }, 30);
        });
        countersAnimated = true;
    }

    // ─── SCROLL ANIMATION (AOS) ───
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 80,
            disable: window.innerWidth < 768 ? true : false
        });
    }

    // ─── TRIGGER COUNTERS ON SCROLL ───
    const heroSection = document.querySelector('.hero-stats');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(heroSection);
    }

    // ─── SMOOTH SCROLL (fallback) ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── ACTIVE NAV LINK ON SCROLL ───
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset + 120;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ─── PARALLAX SHAPES ───
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        shapes.forEach((shape, index) => {
            const speed = 1 + index * 0.5;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
});
