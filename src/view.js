/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { state } = store('advanced-mobile-navigation', {
    state: {
        get isOpen() {
            return getContext().isOpen;
        },
        get isClosing() {
            return getContext().isClosing;
        }
    },
    actions: {
        toggleMenu() {
            const context = getContext();
            if (context.isOpen) {
                actions.closeMenu();
            } else {
                actions.openMenu();
            }
        },
        openMenu() {
            const context = getContext();
            context.isOpen = true;
            context.isClosing = false;
            
            // Prevent body scroll
            document.body.classList.add('mobile-nav-open');
            
            // Focus on close button for accessibility
            const element = getElement();
            const closeButton = element.ref.querySelector('.mobile-nav-close');
            if (closeButton) {
                // Use setTimeout to ensure DOM is updated
                setTimeout(() => closeButton.focus(), 50);
            }
        },
        closeMenu() {
            const context = getContext();
            context.isClosing = true;
            
            // Wait for animation to complete
            setTimeout(() => {
                context.isOpen = false;
                context.isClosing = false;
                document.body.classList.remove('mobile-nav-open');
                
                // Return focus to toggle button
                const element = getElement();
                const toggleButton = element.ref.querySelector('.mobile-nav-toggle');
                if (toggleButton) {
                    toggleButton.focus();
                }
            }, 400); // Match animation duration in CSS
        },
        handleOverlayClick(event) {
            // Close if clicking on the overlay background (not the content)
            if (event.target.classList.contains('mobile-nav-overlay')) {
                actions.closeMenu();
            }
        },
        handleLinkClick() {
            // Close menu when clicking internal links
            setTimeout(() => {
                actions.closeMenu();
            }, 100);
        }
    },
    callbacks: {
        onOpenChange() {
            const context = getContext();
            const element = getElement();
            
            // Handle ESC key
            const handleEscape = (event) => {
                if (event.key === 'Escape' && context.isOpen) {
                    actions.closeMenu();
                }
            };
            
            if (context.isOpen) {
                document.addEventListener('keydown', handleEscape);
                
                // Setup focus trap
                setupFocusTrap(element.ref);
            } else {
                document.removeEventListener('keydown', handleEscape);
            }
            
            // Handle window resize
            const handleResize = () => {
                if (window.innerWidth > 768 && context.isOpen) {
                    actions.closeMenu();
                }
            };
            
            if (context.isOpen) {
                window.addEventListener('resize', handleResize);
            } else {
                window.removeEventListener('resize', handleResize);
            }
        }
    }
});

// Access actions from the store
const { actions } = store('advanced-mobile-navigation');

/**
 * Setup focus trap within the overlay
 */
function setupFocusTrap(blockElement) {
    const overlay = blockElement.querySelector('.mobile-nav-overlay');
    if (!overlay) return;
    
    const focusableElements = overlay.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
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
    };
    
    overlay.addEventListener('keydown', handleTabKey);
}
