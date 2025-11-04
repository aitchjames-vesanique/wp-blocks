/**
 * Frontend JavaScript for Advanced Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', function () {
    // Get all navigation blocks on the page
    const navigationBlocks = document.querySelectorAll('.advanced-mobile-navigation');

    navigationBlocks.forEach((block) => {
        initializeNavigation(block);
    });
});

function initializeNavigation(block) {
    const toggleButton = block.querySelector('.mobile-nav-toggle');
    const overlay = block.querySelector('.mobile-nav-overlay');
    const closeButton = block.querySelector('.mobile-nav-close');
    const navLinks = block.querySelectorAll('.mobile-nav-link');

    if (!toggleButton || !overlay || !closeButton) {
        return;
    }

    // Open navigation
    function openNavigation() {
        overlay.classList.add('is-active');
        overlay.classList.remove('is-closing');
        toggleButton.setAttribute('aria-expanded', 'true');
        document.body.classList.add('mobile-nav-open');

        // Focus on close button for accessibility
        closeButton.focus();

        // Trap focus within the overlay
        trapFocus(overlay);
    }

    // Close navigation
    function closeNavigation() {
        overlay.classList.add('is-closing');

        // Wait for animation to complete before removing is-active
        setTimeout(() => {
            overlay.classList.remove('is-active', 'is-closing');
            toggleButton.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('mobile-nav-open');

            // Return focus to toggle button
            toggleButton.focus();
        }, 400); // Match animation duration
    }

    // Toggle button click
    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (overlay.classList.contains('is-active')) {
            closeNavigation();
        } else {
            openNavigation();
        }
    });

    // Close button click
    closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeNavigation();
    });

    // Close on overlay background click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeNavigation();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
            closeNavigation();
        }
    });

    // Close navigation when clicking on a link (unless it's an external link)
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            // If it's an internal link, close the navigation
            if (!link.hasAttribute('target') || link.getAttribute('target') !== '_blank') {
                // Add a small delay to allow the click to register
                setTimeout(() => {
                    closeNavigation();
                }, 100);
            }
        });
    });

    // Focus trap function
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }

    // Handle window resize - close navigation on desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Close navigation if window is resized to desktop size
            if (window.innerWidth > 768 && overlay.classList.contains('is-active')) {
                closeNavigation();
            }
        }, 250);
    });

    // Prevent scroll when overlay is open
    overlay.addEventListener('touchmove', (e) => {
        // Allow scrolling within the overlay content
        if (!e.target.closest('.mobile-nav-content')) {
            e.preventDefault();
        }
    }, { passive: false });
}
