/**
 * Ukrainian Stone Products - Preloader
 * Version: 1.0
 * Date: 2025
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        minLoadTime: 2000,        // Minimum loading time in ms
        maxLoadTime: 4000,        // Maximum loading time in ms
        progressSteps: 100,       // Number of progress steps
        progressInterval: 30,     // Progress update interval in ms
        fadeOutDuration: 800      // Fade out animation duration in ms
    };

    // DOM elements
    let preloader = null;
    let progressFill = null;
    let preloaderSubtitle = null;

    // State
    let currentProgress = 0;
    let targetProgress = 0;
    let progressInterval = null;
    let loadingStartTime = Date.now();
    let isLoaded = false;

    // Loading messages in Ukrainian
    const loadingMessages = [
        'Завантаження...',
        'Підготовка каменю...',
        'Налаштування інструментів...',
        'Перевірка якості...',
        'Завершення підготовки...',
        'Майже готово...'
    ];

    /**
     * Initialize preloader
     */
    function initPreloader() {
        // Get DOM elements
        preloader = document.getElementById('preloader');
        progressFill = document.getElementById('progressFill');
        preloaderSubtitle = document.querySelector('.preloader-subtitle');

        if (!preloader || !progressFill || !preloaderSubtitle) {
            console.warn('Preloader elements not found');
            return;
        }

        // Start loading simulation
        startLoadingSimulation();

        // Update loading message periodically
        updateLoadingMessage();

        // Listen for actual page load events
        setupEventListeners();

        // Ensure minimum loading time
        setTimeout(() => {
            if (!isLoaded) {
                setTargetProgress(100);
            }
        }, config.minLoadTime);

        // Force completion after maximum time
        setTimeout(() => {
            if (!isLoaded) {
                completeLoading();
            }
        }, config.maxLoadTime);
    }

    /**
     * Setup event listeners for page load
     */
    function setupEventListeners() {
        // Check if document is already loaded
        if (document.readyState === 'complete') {
            handlePageLoad();
            return;
        }

        // Listen for window load event
        window.addEventListener('load', handlePageLoad);

        // Listen for DOMContentLoaded as fallback
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTargetProgress(80);
            });
        }

        // Track image loading
        trackImageLoading();
    }

    /**
     * Track image loading progress
     */
    function trackImageLoading() {
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
            setTargetProgress(70);
            return;
        }

        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    const imageProgress = Math.floor((loadedImages / totalImages) * 30) + 40;
                    setTargetProgress(imageProgress);
                });

                img.addEventListener('error', () => {
                    loadedImages++;
                    const imageProgress = Math.floor((loadedImages / totalImages) * 30) + 40;
                    setTargetProgress(imageProgress);
                });
            }
        });

        // Initial progress based on already loaded images
        if (loadedImages > 0) {
            const imageProgress = Math.floor((loadedImages / totalImages) * 30) + 40;
            setTargetProgress(imageProgress);
        }
    }

    /**
     * Handle page load completion
     */
    function handlePageLoad() {
        const loadTime = Date.now() - loadingStartTime;

        if (loadTime >= config.minLoadTime) {
            completeLoading();
        } else {
            // Wait for minimum load time
            setTimeout(completeLoading, config.minLoadTime - loadTime);
        }
    }

    /**
     * Start loading simulation
     */
    function startLoadingSimulation() {
        // Initial progress
        setTargetProgress(20);

        // Simulate various loading stages
        setTimeout(() => setTargetProgress(40), 300);
        setTimeout(() => setTargetProgress(60), 800);
        setTimeout(() => setTargetProgress(75), 1200);
        setTimeout(() => setTargetProgress(90), 1600);

        // Start progress animation
        startProgressAnimation();
    }

    /**
     * Start progress bar animation
     */
    function startProgressAnimation() {
        progressInterval = setInterval(() => {
            if (currentProgress < targetProgress) {
                currentProgress += Math.random() * 3 + 1;
                if (currentProgress > targetProgress) {
                    currentProgress = targetProgress;
                }
                updateProgressBar();
            }
        }, config.progressInterval);
    }

    /**
     * Set target progress
     */
    function setTargetProgress(progress) {
        targetProgress = Math.min(progress, 100);
    }

    /**
     * Update progress bar visual
     */
    function updateProgressBar() {
        if (progressFill) {
            progressFill.style.width = currentProgress + '%';
        }
    }

    /**
     * Update loading message
     */
    function updateLoadingMessage() {
        let messageIndex = 0;

        const messageInterval = setInterval(() => {
            if (isLoaded) {
                clearInterval(messageInterval);
                return;
            }

            if (preloaderSubtitle && messageIndex < loadingMessages.length) {
                preloaderSubtitle.textContent = loadingMessages[messageIndex];
                messageIndex++;
            }
        }, 400);
    }

    /**
     * Complete loading process
     */
    function completeLoading() {
        if (isLoaded) return;

        isLoaded = true;
        currentProgress = 100;
        targetProgress = 100;
        updateProgressBar();

        // Clear progress interval
        if (progressInterval) {
            clearInterval(progressInterval);
        }

        // Update final message
        if (preloaderSubtitle) {
            preloaderSubtitle.textContent = 'Готово!';
        }

        // Hide preloader after short delay
        setTimeout(hidePreloader, 500);
    }

    /**
     * Hide preloader with animation
     */
    function hidePreloader() {
        if (!preloader) return;

        // Add fade-out class
        preloader.classList.add('fade-out');

        // Remove preloader from DOM after animation
        setTimeout(() => {
            if (preloader && preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }

            // Enable scrolling
            document.body.style.overflow = '';

            // Trigger custom event for other scripts
            window.dispatchEvent(new CustomEvent('preloaderComplete'));

        }, config.fadeOutDuration);

        // Disable scrolling during preloader
        document.body.style.overflow = 'hidden';
    }

    /**
     * Create particles effect
     */
    function createParticles() {
        const particleContainer = document.querySelector('.stone-animation');
        if (!particleContainer) return;

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: rgba(139, 69, 19, 0.6);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    animation: particle-float ${Math.random() * 3 + 2}s ease-in-out infinite;
                `;

                particleContainer.appendChild(particle);

                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 5000);

            }, i * 200);
        }
    }

    /**
     * Add stone texture animation
     */
    function animateStones() {
        const stones = document.querySelectorAll('.stone');

        stones.forEach((stone, index) => {
            // Add random rotation and scale variations
            const randomRotation = Math.random() * 20 - 10;
            const randomScale = 0.9 + Math.random() * 0.2;

            stone.style.transform += ` rotate(${randomRotation}deg) scale(${randomScale})`;

            // Add subtle glow effect
            stone.style.boxShadow += `, 0 0 ${Math.random() * 10 + 5}px rgba(139, 69, 19, 0.3)`;
        });
    }

    /**
     * Handle errors gracefully
     */
    function handleError(error) {
        console.warn('Preloader error:', error);

        // Ensure preloader doesn't stick around
        setTimeout(() => {
            if (!isLoaded) {
                completeLoading();
            }
        }, 1000);
    }

    /**
     * Performance monitoring
     */
    function monitorPerformance() {
        if (typeof performance !== 'undefined' && performance.timing) {
            const timing = performance.timing;
            const totalTime = timing.loadEventEnd - timing.navigationStart;

            console.log('Page load performance:', {
                totalTime: totalTime + 'ms',
                domReady: (timing.domContentLoadedEventEnd - timing.navigationStart) + 'ms',
                resourcesLoaded: (timing.loadEventEnd - timing.domContentLoadedEventEnd) + 'ms'
            });
        }
    }

    /**
     * Initialize everything when DOM is ready
     */
    function init() {
        try {
            initPreloader();
            createParticles();
            animateStones();

            // Monitor performance in development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                window.addEventListener('load', monitorPerformance);
            }

        } catch (error) {
            handleError(error);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose some functions for debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.PreloaderDebug = {
            completeLoading,
            setTargetProgress,
            currentProgress: () => currentProgress,
            targetProgress: () => targetProgress,
            isLoaded: () => isLoaded
        };
    }

    // Fallback: ensure preloader never sticks around too long
    setTimeout(() => {
        if (!isLoaded && preloader && preloader.style.display !== 'none') {
            console.warn('Preloader timeout reached, forcing completion');
            completeLoading();
        }
    }, config.maxLoadTime + 1000);

})();