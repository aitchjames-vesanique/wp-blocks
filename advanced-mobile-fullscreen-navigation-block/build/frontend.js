( function ( wp ) {
    if ( ! wp || ! wp.interactivity ) {
        return;
    }

    const store = wp.interactivity.store;

    store( 'amnb/fullscreenNavigation', {
        state: {
            isOpen: function ( { context } ) {
                return Boolean( context.isOpen );
            }
        },
        actions: {
            toggle: function ( { context } ) {
                context.isOpen = ! context.isOpen;
                context.hasInteracted = true;
            },
            open: function ( { context } ) {
                context.isOpen = true;
                context.hasInteracted = true;
            },
            close: function ( { context } ) {
                context.isOpen = false;
                context.hasInteracted = true;
            },
            handleOverlayClick: function ( { context, event } ) {
                if ( ! context.closeOnOverlayClick ) {
                    return;
                }
                if ( event.target !== event.currentTarget ) {
                    return;
                }
                context.isOpen = false;
                context.hasInteracted = true;
            },
            handleLinkClick: function ( { context, event } ) {
                if ( ! context.closeOnLinkClick ) {
                    return;
                }
                const anchor = event.target.closest( 'a' );
                if ( anchor ) {
                    context.isOpen = false;
                    context.hasInteracted = true;
                }
            },
            handleKeydown: function ( { context, event } ) {
                if ( event.key === 'Escape' ) {
                    context.isOpen = false;
                    context.hasInteracted = true;
                }
            },
            stopPropagation: function ( { event } ) {
                event.stopPropagation();
            }
        },
        effects: {
            manageBodyScroll: function ( { context, state } ) {
                if ( ! context.lockBodyScroll ) {
                    return;
                }
                const className = 'amnb-scroll-locked';
                if ( state.isOpen ) {
                    if ( ! document.body.classList.contains( className ) ) {
                        document.body.classList.add( className );
                    }
                } else {
                    document.body.classList.remove( className );
                }
            },
            manageFocus: function ( { context, state, refs } ) {
                if ( ! context.hasInteracted ) {
                    return;
                }
                if ( state.isOpen ) {
                    if ( refs.overlay ) {
                        refs.overlay.focus();
                    }
                } else if ( refs.toggle && document.activeElement !== refs.toggle ) {
                    refs.toggle.focus();
                }
            }
        }
    } );
} )( window.wp );
