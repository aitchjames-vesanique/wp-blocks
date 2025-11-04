/**
 * Frontend JavaScript for Advanced Navigation Block
 */

(function() {
    'use strict';

    function initNavigationBlocks() {
        const navigationWrappers = document.querySelectorAll('.anb-navigation-wrapper');

        navigationWrappers.forEach(function(wrapper) {
            const toggleButton = wrapper.querySelector('.anb-menu-toggle');
            const overlay = wrapper.querySelector('.anb-fullscreen-overlay');
            const closeButton = wrapper.querySelector('.anb-menu-close');
            const menuLinks = wrapper.querySelectorAll('.anb-menu-link');

            if (!toggleButton || !overlay) {
                return;
            }

            // Open menu
            function openMenu() {
                overlay.classList.add('anb-active');
                toggleButton.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
                
                // Focus management
                const firstLink = wrapper.querySelector('.anb-menu-link');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }

            // Close menu
            function closeMenu() {
                overlay.classList.remove('anb-active');
                toggleButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                toggleButton.focus();
            }

            // Toggle button click
            toggleButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (overlay.classList.contains('anb-active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            // Close button click
            if (closeButton) {
                closeButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeMenu();
                });
            }

            // Close on overlay click (outside menu container)
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeMenu();
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && overlay.classList.contains('anb-active')) {
                    closeMenu();
                }
            });

            // Close menu when clicking a link (for same-page navigation)
            menuLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    // Only close if it's a same-page link
                    const href = this.getAttribute('href');
                    if (href && (href.startsWith('#') || href === window.location.pathname + window.location.search)) {
                        setTimeout(closeMenu, 300);
                    }
                });
            });

            // Prevent body scroll when menu is open
            overlay.addEventListener('touchmove', function(e) {
                if (overlay.classList.contains('anb-active')) {
                    const menuContainer = wrapper.querySelector('.anb-menu-container');
                    if (!menuContainer.contains(e.target)) {
                        e.preventDefault();
                    }
                }
            }, { passive: false });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigationBlocks);
    } else {
        initNavigationBlocks();
    }

    // Re-initialize for dynamically loaded content
    if (typeof wp !== 'undefined' && wp.domReady) {
        wp.domReady(initNavigationBlocks);
    }
})();
