/**
 * Interactivity API view script for Advanced Navigation Block
 * Uses WordPress Interactivity API for future-proof interactivity
 */

import { store, getContext } from '@wordpress/interactivity';

store('advanced-navigation-block/navigation', {
    state: {
        get isOpen() {
            const ctx = getContext();
            return ctx.isOpen || false;
        }
    },
    actions: {
        toggleMenu: () => {
            const ctx = getContext();
            ctx.isOpen = !ctx.isOpen;
            
            // Prevent body scroll when menu is open
            if (ctx.isOpen) {
                document.body.style.overflow = 'hidden';
                
                // Focus management - focus first link after opening
                requestAnimationFrame(() => {
                    const ctx = getContext();
                    const interactiveElement = document.querySelector('[data-wp-interactive="advanced-navigation-block/navigation"]');
                    if (interactiveElement && ctx.isOpen) {
                        const firstLink = interactiveElement.querySelector('.anb-menu-link');
                        if (firstLink) {
                            firstLink.focus();
                        }
                    }
                });
            } else {
                document.body.style.overflow = '';
                
                // Return focus to toggle button
                requestAnimationFrame(() => {
                    const interactiveElement = document.querySelector('[data-wp-interactive="advanced-navigation-block/navigation"]');
                    if (interactiveElement) {
                        const toggleButton = interactiveElement.querySelector('.anb-menu-toggle');
                        if (toggleButton) {
                            toggleButton.focus();
                        }
                    }
                });
            }
        },
        closeMenu: () => {
            const ctx = getContext();
            ctx.isOpen = false;
            document.body.style.overflow = '';
            
            // Return focus to toggle button
            requestAnimationFrame(() => {
                const interactiveElement = document.querySelector('[data-wp-interactive="advanced-navigation-block/navigation"]');
                if (interactiveElement) {
                    const toggleButton = interactiveElement.querySelector('.anb-menu-toggle');
                    if (toggleButton) {
                        toggleButton.focus();
                    }
                }
            });
        },
        handleOverlayClick: ({ event }) => {
            const ctx = getContext();
            // Only close if clicking directly on overlay (not menu container)
            if (event.target === event.currentTarget) {
                ctx.isOpen = false;
                document.body.style.overflow = '';
                
                requestAnimationFrame(() => {
                    const interactiveElement = event.currentTarget.closest('[data-wp-interactive="advanced-navigation-block/navigation"]');
                    if (interactiveElement) {
                        const toggleButton = interactiveElement.querySelector('.anb-menu-toggle');
                        if (toggleButton) {
                            toggleButton.focus();
                        }
                    }
                });
            }
        },
        handleLinkClick: ({ event }) => {
            const href = event.currentTarget.getAttribute('href');
            // Close menu for same-page navigation
            if (href && (href.startsWith('#') || href === window.location.pathname + window.location.search)) {
                setTimeout(() => {
                    const ctx = getContext();
                    ctx.isOpen = false;
                    document.body.style.overflow = '';
                }, 300);
            }
        },
        handleEscapeKey: ({ event }) => {
            const ctx = getContext();
            if (event.key === 'Escape' && ctx.isOpen) {
                ctx.isOpen = false;
                document.body.style.overflow = '';
                
                requestAnimationFrame(() => {
                    const interactiveElement = event.currentTarget.closest('[data-wp-interactive="advanced-navigation-block/navigation"]');
                    if (interactiveElement) {
                        const toggleButton = interactiveElement.querySelector('.anb-menu-toggle');
                        if (toggleButton) {
                            toggleButton.focus();
                        }
                    }
                });
            }
        },
        preventScroll: ({ event }) => {
            const ctx = getContext();
            if (ctx.isOpen) {
                const menuContainer = event.currentTarget.querySelector('.anb-menu-container');
                if (!menuContainer || !menuContainer.contains(event.target)) {
                    event.preventDefault();
                }
            }
        }
    }
});
