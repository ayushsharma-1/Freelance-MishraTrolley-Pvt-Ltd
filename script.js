// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const revealElements = document.querySelectorAll('.reveal');
    const heroText = document.querySelector('.typewriter-text');
    const heroPhrases = [
        'Strong farm trolleys that carry more',
        'Tractor attachments built for durability',
        'Custom-built tools for every field',
        'Trusted by farmers in Chirgaon and beyond'
    ];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        if (name && email && message) {
            alert('धन्यवाद! हम आपसे संपर्क करेंगे। | Thank you! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    function animateHeroText() {
        if (!heroText) return;
        const fullText = heroPhrases[currentPhrase];
        heroText.textContent = fullText.substring(0, currentChar);

        if (!isDeleting && currentChar < fullText.length) {
            currentChar++;
            setTimeout(animateHeroText, 80);
        } else if (isDeleting && currentChar > 0) {
            currentChar--;
            setTimeout(animateHeroText, 30);
        } else {
            if (!isDeleting) {
                isDeleting = true;
                setTimeout(animateHeroText, 1200);
            } else {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % heroPhrases.length;
                setTimeout(animateHeroText, 500);
            }
        }
    }

    function revealOnScroll() {
        const triggerHeight = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerHeight) {
                el.classList.add('active');
            }
        });
    }

    function highlightNavLink() {
        const scrollPos = window.scrollY + document.querySelector('.navbar').offsetHeight + 30;
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const link = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
            if (link) {
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    }

    function scrollEffects() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.background = '#fff';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = '#fff';
        }
        revealOnScroll();
        highlightNavLink();
    }

    animateHeroText();
    revealOnScroll();
    highlightNavLink();
    window.addEventListener('scroll', scrollEffects);
});
