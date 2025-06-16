/**
 * Ukrainian Stone Products - Main JavaScript
 * Enhanced Bootstrap 5 Version with Ukrainian Language
 * Version: 2.1
 * Date: 2025
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        smoothScroll: {
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        },
        form: {
            submitDelay: 2000,
            validationDelay: 300
        },
        carousel: {
            interval: 5000,
            keyboard: true,
            pause: 'hover'
        }
    };

    // State
    let isInitialized = false;
    let formSubmitting = false;

    /**
     * Initialize the application
     */
    function initializeApp() {
        if (isInitialized) return;

        try {
            initSmoothScroll();
            initFormValidation();
            initCarouselEnhancements();
            initScrollToTop();
            initMobileMenu();
            initLazyLoading();
            initTooltips();
            initAccessibility();

            isInitialized = true;
            console.log('Ukrainian Stone app initialized successfully');

        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    /**
     * Smooth scrolling for anchor links
     */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: config.smoothScroll.behavior
                    });

                    // Close mobile menu if open
                    closeMobileMenu();

                    // Update URL without triggering scroll
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');

        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (navbarToggler) {
                navbarToggler.click();
            }
        }
    }

    /**
     * Form validation and submission
     */
    function initFormValidation() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        const formElements = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message'),
            submitBtn: form.querySelector('button[type="submit"]')
        };

        // Real-time validation
        Object.keys(formElements).forEach(key => {
            const element = formElements[key];
            if (element && element.tagName !== 'BUTTON') {
                element.addEventListener('blur', () => validateField(element));
                element.addEventListener('input', debounce(() => validateField(element), config.form.validationDelay));
            }
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!formSubmitting) {
                handleFormSubmit(formElements);
            }
        });
    }

    /**
     * Validate individual form field
     */
    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type || field.tagName.toLowerCase();
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${getFieldLabel(field)} є обов'язковим полем`;
        }
        // Email validation
        else if (fieldType === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Введіть коректну адресу електронної пошти';
        }
        // Phone validation (Ukrainian format)
        else if (fieldType === 'tel' && value && !isValidUkrainianPhone(value)) {
            isValid = false;
            errorMessage = 'Введіть коректний номер телефону (+380XXXXXXXXX)';
        }
        // Name validation
        else if (field.id === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = "Ім'я повинно містити принаймні 2 символи";
        }
        // Message validation
        else if (field.id === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Повідомлення повинно містити принаймні 10 символів';
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    /**
     * Get field label text
     */
    function getFieldLabel(field) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent : field.placeholder || field.name || 'Поле';
    }

    /**
     * Show field error
     */
    function showFieldError(field, message) {
        field.classList.add('is-invalid');

        let errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            field.parentNode.appendChild(errorDiv);
        }

        errorDiv.textContent = message;

        // Add shake animation
        field.classList.add('shake');
        setTimeout(() => field.classList.remove('shake'), 500);
    }

    /**
     * Clear field error
     */
    function clearFieldError(field) {
        field.classList.remove('is-invalid');

        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    /**
     * Validate email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate Ukrainian phone format
     */
    function isValidUkrainianPhone(phone) {
        // Remove all non-digits
        const digits = phone.replace(/\D/g, '');

        // Check Ukrainian phone patterns
        return /^380\d{9}$/.test(digits) || /^0\d{9}$/.test(digits);
    }

    /**
     * Handle form submission
     */
    function handleFormSubmit(elements) {
        if (formSubmitting) return;

        // Validate all fields
        let isFormValid = true;
        ['name', 'email', 'subject', 'message'].forEach(fieldName => {
            const field = elements[fieldName];
            if (field && !validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            showFormMessage('Будь ласка, виправте помилки у формі', 'error');
            return;
        }

        // Start submission process
        formSubmitting = true;
        const originalBtnText = elements.submitBtn.innerHTML;

        // Show loading state
        elements.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Відправляємо...';
        elements.submitBtn.disabled = true;
        elements.submitBtn.classList.add('loading');

        // Simulate form submission
        setTimeout(() => {
            submitForm(elements, originalBtnText);
        }, config.form.submitDelay);
    }

    /**
     * Submit form (simulate API call)
     */
    function submitForm(elements, originalBtnText) {
        try {
            // Collect form data
            const formData = {
                name: elements.name.value.trim(),
                email: elements.email.value.trim(),
                phone: elements.phone ? elements.phone.value.trim() : '',
                subject: elements.subject.value,
                message: elements.message.value.trim(),
                timestamp: new Date().toISOString(),
                source: 'ukrainian-stone-website'
            };

            // In a real application, you would send this data to your server
            console.log('Form submission data:', formData);

            // Simulate successful submission
            showFormMessage('Дякуємо! Ваше повідомлення успішно відправлено. Ми зв\'яжемося з вами найближчим часом.', 'success');

            // Reset form
            elements.name.closest('form').reset();

            // Clear any validation states
            ['name', 'email', 'phone', 'subject', 'message'].forEach(fieldName => {
                const field = elements[fieldName];
                if (field) {
                    clearFieldError(field);
                }
            });

            // Track form submission (analytics)
            trackFormSubmission(formData);

        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Виникла помилка при відправці форми. Спробуйте ще раз або зв\'яжіться з нами за телефоном.', 'error');
        } finally {
            // Reset button state
            elements.submitBtn.innerHTML = originalBtnText;
            elements.submitBtn.disabled = false;
            elements.submitBtn.classList.remove('loading');
            formSubmitting = false;
        }
    }

    /**
     * Show form message
     */
    function showFormMessage(message, type = 'success') {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        // Remove existing messages
        const existingAlert = form.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create new alert
        const alert = document.createElement('div');
        alert.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show mt-3`;
        alert.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Закрити"></button>
        `;

        form.appendChild(alert);

        // Scroll to message
        alert.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.remove();
                }
            }, 5000);
        }
    }

    /**
     * Track form submission for analytics
     */
    function trackFormSubmission(formData) {
        // Google Analytics 4 event tracking (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: formData.subject,
                value: 1
            });
        }

        // Facebook Pixel tracking (if available)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact');
        }

        console.log('Form submission tracked:', formData.subject);
    }

    /**
     * Carousel enhancements
     */
    function initCarouselEnhancements() {
        const carousel = document.querySelector('#productCarousel');
        if (!carousel) return;

        // Initialize Bootstrap carousel with custom options
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: config.carousel.interval,
            keyboard: config.carousel.keyboard,
            pause: config.carousel.pause,
            wrap: true,
            touch: true
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            bsCarousel.pause();
        });

        carousel.addEventListener('mouseleave', () => {
            bsCarousel.cycle();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.activeElement === carousel || carousel.contains(document.activeElement)) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    bsCarousel.prev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    bsCarousel.next();
                }
            }
        });

        // Touch gestures for mobile
        let startX = 0;
        let currentX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        carousel.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
        }, { passive: true });

        carousel.addEventListener('touchend', () => {
            const diffX = startX - currentX;
            const threshold = 50;

            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    bsCarousel.next();
                } else {
                    bsCarousel.prev();
                }
            }
        }, { passive: true });

        // Preload next/previous images
        carousel.addEventListener('slide.bs.carousel', (e) => {
            preloadCarouselImages(e.to);
        });
    }

    /**
     * Preload carousel images
     */
    function preloadCarouselImages(activeIndex) {
        const items = document.querySelectorAll('#productCarousel .carousel-item');
        const totalItems = items.length;

        // Preload next and previous images
        const nextIndex = (activeIndex + 1) % totalItems;
        const prevIndex = (activeIndex - 1 + totalItems) % totalItems;

        [nextIndex, prevIndex].forEach(index => {
            const img = items[index].querySelector('img');
            if (img && !img.complete) {
                const preloadImg = new Image();
                preloadImg.src = img.src;
            }
        });
    }

    /**
     * Scroll to top functionality
     */
    function initScrollToTop() {
        // Create scroll to top button
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.className = 'btn btn-primary scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Прокрутити до початку');
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: none;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(scrollBtn);

        // Show/hide based on scroll position
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.pageYOffset > 300) {
                    scrollBtn.style.display = 'block';
                    scrollBtn.style.opacity = '1';
                    scrollBtn.style.visibility = 'visible';
                    scrollBtn.classList.add('show');
                } else {
                    scrollBtn.style.opacity = '0';
                    scrollBtn.style.visibility = 'hidden';
                    scrollBtn.classList.remove('show');
                    setTimeout(() => {
                        if (scrollBtn.style.opacity === '0') {
                            scrollBtn.style.display = 'none';
                        }
                    }, 300);
                }
            }, 100);
        }, { passive: true });

        // Scroll to top on click
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Mobile menu enhancements
     */
    function initMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (!navbarToggler || !navbarCollapse) return;

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navbarCollapse.classList.contains('show') &&
                !navbarCollapse.contains(e.target) &&
                !navbarToggler.contains(e.target)) {
                navbarToggler.click();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });

        // Add animation classes
        navbarToggler.addEventListener('click', () => {
            setTimeout(() => {
                navbarCollapse.classList.toggle('animate');
            }, 10);
        });
    }

    /**
     * Lazy loading for images
     */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;

                        // Add loading class
                        img.classList.add('loading');

                        // Load image
                        img.addEventListener('load', () => {
                            img.classList.remove('loading');
                            img.classList.add('loaded');
                        });

                        img.addEventListener('error', () => {
                            img.classList.remove('loading');
                            img.classList.add('error');
                            console.warn('Failed to load image:', img.src);
                        });

                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.classList.add('loaded');
            });
        }
    }

    /**
     * Initialize tooltips
     */
    function initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                boundary: 'viewport',
                placement: 'auto'
            });
        });
    }

    /**
     * Initialize accessibility features
     */
    function initAccessibility() {
        // Skip to main content link
        addSkipToMainContent();

        // Improve focus management
        improveFocusManagement();

        // Add ARIA labels where needed
        addAriaLabels();

        // Handle reduced motion
        handleReducedMotion();
    }

    /**
     * Add skip to main content link
     */
    function addSkipToMainContent() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Перейти до основного контенту';
        skipLink.className = 'skip-to-main visually-hidden-focusable';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-600);
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content ID if not exists
        let mainContent = document.getElementById('main-content');
        if (!mainContent) {
            mainContent = document.querySelector('main') || document.querySelector('.hero-section');
            if (mainContent) {
                mainContent.id = 'main-content';
            }
        }
    }

    /**
     * Improve focus management
     */
    function improveFocusManagement() {
        // Ensure all interactive elements are focusable
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');

        interactiveElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focused');
            });

            element.addEventListener('blur', () => {
                element.classList.remove('focused');
            });
        });

        // Focus trap for modal dialogs (if any)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                handleTabNavigation(e);
            }
        });
    }

    /**
     * Handle tab navigation
     */
    function handleTabNavigation(e) {
        const focusableElements = document.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    /**
     * Add ARIA labels
     */
    function addAriaLabels() {
        // Add labels to buttons without text
        const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
        buttons.forEach(button => {
            const icon = button.querySelector('i');
            if (icon && !button.textContent.trim()) {
                const iconClass = icon.className;
                if (iconClass.includes('chevron-up')) {
                    button.setAttribute('aria-label', 'Прокрутити до початку');
                } else if (iconClass.includes('bars')) {
                    button.setAttribute('aria-label', 'Відкрити меню');
                }
            }
        });

        // Add labels to form controls without labels
        const formControls = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby]), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])');
        formControls.forEach(control => {
            const placeholder = control.placeholder;
            if (placeholder && !document.querySelector(`label[for="${control.id}"]`)) {
                control.setAttribute('aria-label', placeholder);
            }
        });
    }

    /**
     * Handle reduced motion preference
     */
    function handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        function updateMotionPreference(e) {
            if (e.matches) {
                document.documentElement.style.setProperty('--transition-fast', '0.01ms');
                document.documentElement.style.setProperty('--transition-normal', '0.01ms');
                document.documentElement.style.setProperty('--transition-slow', '0.01ms');
            } else {
                document.documentElement.style.removeProperty('--transition-fast');
                document.documentElement.style.removeProperty('--transition-normal');
                document.documentElement.style.removeProperty('--transition-slow');
            }
        }

        updateMotionPreference(prefersReducedMotion);
        prefersReducedMotion.addEventListener('change', updateMotionPreference);
    }

    /**
     * Debounce function for performance
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Error handling
     */
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);

        // Send error to monitoring service (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: e.error.message,
                fatal: false
            });
        }
    });

    /**
     * Initialize when DOM is ready or preloader completes
     */
    function init() {
        // Wait for preloader completion
        window.addEventListener('preloaderComplete', initializeApp);

        // Fallback: initialize after short delay if no preloader
        setTimeout(() => {
            if (!isInitialized) {
                initializeApp();
            }
        }, 100);
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose main functions for debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.UkrainianStoneDebug = {
            reinit: initializeApp,
            config,
            state: {
                initialized: () => isInitialized,
                formSubmitting: () => formSubmitting
            },
            utils: {
                debounce,
                validateField,
                isValidEmail,
                isValidUkrainianPhone
            }
        };
    }

})();