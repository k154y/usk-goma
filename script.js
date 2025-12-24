document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    // Menu mobile toggle
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Gestion du menu déroulant en mode mobile
    document.querySelectorAll('.dropdown > a').forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            }
        });
    });

    // Gestion du menu déroulant au survol sur desktop
    if (window.innerWidth >= 768) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });
    }

    // Gestion du menu déroulant au survol sur mobile (avec délai)
    if (window.innerWidth < 768) {
        let hoverTimer;
        
        document.querySelectorAll('.dropdown > a').forEach(item => {
            item.addEventListener('touchstart', function(e) {
                // Empêcher le comportement par défaut
                e.preventDefault();
                
                // Fermer tous les autres menus déroulants
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== this.parentElement) {
                        d.classList.remove('active');
                    }
                });
                
                // Activer/désactiver le menu actuel après un court délai
                clearTimeout(hoverTimer);
                hoverTimer = setTimeout(() => {
                    this.parentElement.classList.toggle('active');
                }, 300);
            });
            
            // Annuler le timer si l'utilisateur fait défiler
            item.addEventListener('touchmove', function() {
                clearTimeout(hoverTimer);
            });
        });
        
        // Fermer les menus déroulants quand on clique ailleurs
        document.addEventListener('touchstart', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Animation au défilement
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Animation des éléments au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .news-card, .faculty-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialiser l'état des éléments
    const features = document.querySelectorAll('.feature-card');
    const newsCards = document.querySelectorAll('.news-card');
    const facultyCards = document.querySelectorAll('.faculty-card');
    
    features.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    newsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    facultyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    // Démarrer l'animation
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        // Réinitialiser les menus déroulants lors du changement de taille
        if (window.innerWidth >= 768) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Hero background slider
    function startHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        let current = 0;
        if (slides.length === 0) return;
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }

    startHeroSlider();
});