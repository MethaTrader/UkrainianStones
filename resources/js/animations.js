/**
 * Ukrainian Stone Products - Animations
 * AOS Integration and Custom Animations
 * Version: 1.0
 * Date: 2025
 */

(function() {
    'use strict';

    // Animation configuration
    const animationConfig = {
        aos: {
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 0
        },
        counters: {
            duration: 2000,
            easing: 'easeOutQuart'
        },
        parallax: {
            enabled: true,
            factor: 0.5
        }
    };

    // State
    let isInitialized = false;
    let countersAnimated = false;
    let parallaxElements = [];

    /**
     * Initialize all animations
     */
    function initAnimations() {
        if (isInitialized) return;

        try {
            initAOS();
            initCounterAnimations();
            initParallaxEffects();
            initCustomAnimations();
            initScrollAnimations();

            isInitialized = true;
            console.log('Animations initialized successfully');

        } catch (error) {
            console.error('Error initializing animations:', error);
        }
    }

    /**
     * Initialize AOS (Animate On Scroll)
     */
    function initAOS() {
        if (typeof AOS === 'undefined') {
            console.warn('AOS library not loaded');
            return;
        }

        AOS.init({
            duration: animationConfig.aos.duration,
            easing: animationConfig.aos.easing,
            once: animationConfig.aos.once,
            offset: animationConfig.aos.offset,
            delay: animationConfig.aos.delay,

            // Custom settings
            disable: function() {
                // Disable on mobile if performance is poor
                return window.innerWidth < 768 &&
                    (navigator.hardwareConcurrency < 4 ||
                        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
            },

            // Callbacks
            initCallback: function() {
                console.log('AOS initialized');
            },

            animatedCallback: function(el) {
                // Add completion class for additional styling
                el.classList.add('aos-animated-complete');
            }
        });

        // Refresh AOS on dynamic content changes
        setupAOSRefresh();
    }

    /**
     * Setup AOS refresh for dynamic content
     */
    function setupAOSRefresh() {
        // Refresh AOS when images load (affects layout)
        const images = document.querySelectorAll('img[data-aos]');
        images.forEach(img => {
            img.addEventListener('load', () => {
                AOS.refresh();
            });
        });

        // Refresh AOS when window resizes
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                AOS.refresh();
            }, 250);
        });
    }

    /**
     * Initialize counter animations
     */
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        if (counters.length === 0) return;

        // Use Intersection Observer for better performance
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe the first counter
        if (counters[0]) {
            counterObserver.observe(counters[0]);
        }
    }

    /**
     * Animate counter numbers
     */
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');

        counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = animationConfig.counters.duration;
            const startTime = performance.now();

            // Add staggered delay
            setTimeout(() => {
                animateCounter(counter, target, duration, startTime);
            }, index * 200);
        });
    }

    /**
     * Animate individual counter
     */
    function animateCounter(element, target, duration, startTime) {
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease out quart)
            const easedProgress = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easedProgress * target);

            element.textContent = currentValue;

            // Add glow effect during animation
            if (progress < 1) {
                element.classList.add('animate');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                element.classList.remove('animate');
            }
        }

        requestAnimationFrame(updateCounter);
    }

    /**
     * Initialize parallax effects
     */
    function initParallaxEffects() {
        if (!animationConfig.parallax.enabled) return;

        // Find parallax elements
        parallaxElements = [
            {
                element: document.querySelector('.hero-section'),
                speed: 0.5,
                type: 'background'
            },
            {
                element: document.querySelector('.hero-image img'),
                speed: 0.3,
                type: 'transform'
            }
        ].filter(item => item.element);

        if (parallaxElements.length > 0) {
            setupParallaxScroll();
        }
    }

    /**
     * Setup parallax scroll effects
     */
    function setupParallaxScroll() {
        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            parallaxElements.forEach(item => {
                const { element, speed, type } = item;
                if (!element) return;

                const offset = scrolled * speed;

                if (type === 'background') {
                    element.style.transform = `translateY(${offset}px)`;
                } else if (type === 'transform') {
                    element.style.transform = `translateY(${offset}px) scale(1.05)`;
                }
            });

            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        // Use passive scroll listener for better performance
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    /**
     * Initialize custom animations
     */
    function initCustomAnimations() {
        initHoverAnimations();
        initScrollRevealAnimations();
        initTextAnimations();
        initMorphingShapes();
    }

    /**
     * Initialize hover animations
     */
    function initHoverAnimations() {
        // Product cards hover effect
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';

                // Add ripple effect
                createRippleEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.custom-btn-primary, .custom-btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * Create ripple effect
     */
    function createRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(139, 69, 19, 0.1);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        // Add ripple animation keyframes if not exists
        addRippleKeyframes();

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    /**
     * Add ripple animation keyframes
     */
    function addRippleKeyframes() {
        if (document.querySelector('#ripple-styles')) return;

        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Initialize scroll reveal animations
     */
    function initScrollRevealAnimations() {
        const revealElements = document.querySelectorAll('.content-text, .contact-info');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    /**
     * Initialize text animations
     */
    function initTextAnimations() {
        // Typewriter effect for hero title (optional)
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && heroTitle.classList.contains('typewriter')) {
            initTypewriterEffect(heroTitle);
        }

        // Gradient text animation
        const gradientTexts = document.querySelectorAll('.gradient-text');
        gradientTexts.forEach(text => {
            text.style.backgroundSize = '200% 200%';
        });
    }

    /**
     * Initialize typewriter effect
     */
    function initTypewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '3px solid var(--primary-600)';

        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    element.style.borderRightColor =
                        element.style.borderRightColor === 'transparent' ?
                            'var(--primary-600)' : 'transparent';
                }, 500);
            }
        }

        setTimeout(type, 1000);
    }

    /**
     * Initialize morphing shapes
     */
    function initMorphingShapes() {
        const morphShapes = document.querySelectorAll('.morph-shape');
        morphShapes.forEach(shape => {
            // Add random animation delay
            shape.style.animationDelay = Math.random() * 2 + 's';
        });
    }

    /**
     * Initialize scroll-based animations
     */
    function initScrollAnimations() {
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateScrollAnimations() {
            const currentScrollY = window.scrollY;
            const direction = currentScrollY > lastScrollY ? 'down' : 'up';

            // Update navbar on scroll
            updateNavbarOnScroll(currentScrollY);

            // Update parallax elements
            updateParallaxOnScroll(currentScrollY);

            lastScrollY = currentScrollY;
            ticking = false;
        }

        function requestScrollTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestScrollTick, { passive: true });
    }

    /**
     * Update navbar appearance on scroll
     */
    function updateNavbarOnScroll(scrollY) {
        const navbar = document.querySelector('.custom-navbar');
        if (!navbar) return;

        if (scrollY > 100) {
            navbar.style.padding = '0.75rem 0';
            navbar.style.backgroundColor = 'rgba(251, 251, 250, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.backgroundColor = 'rgba(251, 251, 250, 0.95)';
            navbar.style.backdropFilter = 'blur(16px)';
        }
    }

    /**
     * Update parallax elements on scroll
     */
    function updateParallaxOnScroll(scrollY) {
        if (!animationConfig.parallax.enabled) return;

        parallaxElements.forEach(item => {
            const { element, speed, type } = item;
            if (!element) return;

            const offset = scrollY * speed;

            if (type === 'background') {
                element.style.transform = `translateY(${offset}px)`;
            } else if (type === 'transform') {
                element.style.transform = `translateY(${offset}px)`;
            }
        });
    }

    /**
     * Cleanup animations
     */
    function cleanup() {
        // Reset AOS
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // Reset counters
        countersAnimated = false;

        // Clear any running animations
        parallaxElements = [];

        console.log('Animations cleaned up');
    }

    /**
     * Handle reduced motion preference
     */
    function handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            // Disable parallax and complex animations
            animationConfig.parallax.enabled = false;
            animationConfig.aos.duration = 200;

            // Remove morphing animations
            const morphShapes = document.querySelectorAll('.morph-shape');
            morphShapes.forEach(shape => {
                shape.style.animation = 'none';
            });
        }

        // Listen for changes
        prefersReducedMotion.addEventListener('change', handleReducedMotion);
    }

    /**
     * Initialize when preloader completes or DOM is ready
     */
    function init() {
        handleReducedMotion();

        // Wait for preloader completion
        window.addEventListener('preloaderComplete', initAnimations);

        // Fallback: initialize after delay if no preloader
        setTimeout(() => {
            if (!isInitialized) {
                initAnimations();
            }
        }, 100);
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose animation controls for debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.AnimationsDebug = {
            reinit: initAnimations,
            cleanup,
            config: animationConfig,
            state: {
                initialized: () => isInitialized,
                countersAnimated: () => countersAnimated
            }
        };
    }

})();