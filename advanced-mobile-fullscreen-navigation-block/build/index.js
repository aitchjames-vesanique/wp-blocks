( function ( wp ) {
    if ( ! wp || ! wp.blocks ) {
        return;
    }

    const registerBlockType = wp.blocks.registerBlockType;
    const __ = wp.i18n.__;
    const blockEditor = wp.blockEditor || wp.editor;
    const InspectorControls = blockEditor.InspectorControls;
    const useBlockProps = blockEditor.useBlockProps;
    const InnerBlocks = blockEditor.InnerBlocks;
    const BlockControls = blockEditor.BlockControls;
    const AlignmentToolbar = blockEditor.AlignmentToolbar;
    const ColorPalette = blockEditor.ColorPalette;
    const components = wp.components;
    const PanelBody = components.PanelBody;
    const TextControl = components.TextControl;
    const ToggleControl = components.ToggleControl;
    const RangeControl = components.RangeControl;
    const SelectControl = components.SelectControl;
    const ToolbarGroup = components.ToolbarGroup;
    const ToolbarButton = components.ToolbarButton;
    const BaseControl = components.BaseControl;
    const Notice = components.Notice;
    const React = wp.element;
    const Fragment = React.Fragment;
    const useState = React.useState;
    const useMemo = React.useMemo;
    const useEffect = React.useEffect;
    const el = React.createElement;

    const PRESET_COLORS = [
        { name: 'Night', color: '#0f0f0f' },
        { name: 'Charcoal', color: '#1c1c1c' },
        { name: 'Slate', color: '#2d3748' },
        { name: 'Sky', color: '#1a73e8' },
        { name: 'Coral', color: '#ff5a5f' },
        { name: 'Mint', color: '#06d6a0' },
        { name: 'Ivory', color: '#f8f7f1' },
        { name: 'Pure White', color: '#ffffff' }
    ];

    const ALLOWED_BLOCKS = [
        'core/navigation',
        'core/navigation-link',
        'core/group',
        'core/buttons',
        'core/button',
        'core/paragraph',
        'core/heading',
        'core/list',
        'core/social-links',
        'core/search',
        'core/spacer'
    ];

    const TEMPLATE = [
        [
            'core/navigation',
            {
                orientation: 'vertical',
                layout: {
                    type: 'flex',
                    justifyContent: 'center',
                    orientation: 'vertical'
                }
            }
        ]
    ];

    function classNames() {
        const parts = [];
        for ( let i = 0; i < arguments.length; i++ ) {
            const value = arguments[ i ];
            if ( ! value ) {
                continue;
            }
            if ( typeof value === 'string' ) {
                parts.push( value );
            } else if ( Array.isArray( value ) ) {
                parts.push( classNames.apply( null, value ) );
            } else if ( typeof value === 'object' ) {
                Object.keys( value ).forEach( function ( key ) {
                    if ( value[ key ] ) {
                        parts.push( key );
                    }
                } );
            }
        }
        return parts.join( ' ' ).trim();
    }

    function sanitizeId( value, fallback ) {
        const safeValue = ( value || '' ).toString().trim();
        if ( ! safeValue ) {
            return fallback;
        }
        return safeValue.replace( /[^a-zA-Z0-9\-]/g, '' );
    }

    registerBlockType( 'amnb/fullscreen-mobile-navigation', {
        edit: function Edit( props ) {
            const attributes = props.attributes;
            const setAttributes = props.setAttributes;
            const clientId = props.clientId;
            const isSelected = props.isSelected;

            const uniqueId = attributes.uniqueId;
            const toggleButtonLabel = attributes.toggleButtonLabel;
            const toggleButtonAriaLabel = attributes.toggleButtonAriaLabel;
            const closeButtonLabel = attributes.closeButtonLabel;
            const overlayBackground = attributes.overlayBackground;
            const overlayTextColor = attributes.overlayTextColor;
            const toggleButtonBackground = attributes.toggleButtonBackground;
            const toggleButtonTextColor = attributes.toggleButtonTextColor;
            const overlayBlur = attributes.overlayBlur;
            const overlayPadding = attributes.overlayPadding;
            const overlayGap = attributes.overlayGap;
            const menuAlignment = attributes.menuAlignment;
            const buttonAlignment = attributes.buttonAlignment;
            const buttonShape = attributes.buttonShape;
            const closeButtonPosition = attributes.closeButtonPosition;
            const closeOnOverlayClick = attributes.closeOnOverlayClick;
            const closeOnLinkClick = attributes.closeOnLinkClick;
            const lockBodyScroll = attributes.lockBodyScroll;

            const overlayPreviewState = useState( false );
            const isOverlayPreview = overlayPreviewState[ 0 ];
            const setOverlayPreview = overlayPreviewState[ 1 ];

            useEffect( function () {
                if ( ! uniqueId && clientId ) {
                    setAttributes( { uniqueId: clientId } );
                }
            }, [ uniqueId, clientId ] );

            useEffect( function () {
                if ( ! toggleButtonAriaLabel && toggleButtonLabel ) {
                    setAttributes( { toggleButtonAriaLabel: toggleButtonLabel } );
                }
            }, [ toggleButtonAriaLabel, toggleButtonLabel ] );

            const styleVars = useMemo( function () {
                return {
                    '--advanced-nav-overlay-bg': overlayBackground || undefined,
                    '--advanced-nav-overlay-color': overlayTextColor || undefined,
                    '--advanced-nav-toggle-bg': toggleButtonBackground || undefined,
                    '--advanced-nav-toggle-color': toggleButtonTextColor || undefined,
                    '--advanced-nav-overlay-blur': ( overlayBlur || 0 ) + 'px',
                    '--advanced-nav-overlay-padding': ( overlayPadding || 0 ) + 'px',
                    '--advanced-nav-overlay-gap': ( overlayGap || 0 ) + 'px'
                };
            }, [ overlayBackground, overlayTextColor, toggleButtonBackground, toggleButtonTextColor, overlayBlur, overlayPadding, overlayGap ] );

            const blockProps = useBlockProps( {
                className: classNames(
                    'has-button-alignment-' + buttonAlignment,
                    'has-menu-alignment-' + menuAlignment,
                    'has-button-shape-' + buttonShape
                ),
                style: styleVars
            } );

            const overlayClasses = classNames(
                'wp-block-advanced-mobile-navigation__overlay',
                'is-editor-preview',
                'is-align-' + menuAlignment,
                'is-close-' + closeButtonPosition,
                {
                    'is-open': isSelected || isOverlayPreview
                }
            );

            const toolbarButtonLabel = isOverlayPreview
                ? __( 'Hide overlay preview', 'advanced-mobile-navigation' )
                : __( 'Show overlay preview', 'advanced-mobile-navigation' );

            const overlayHelpText = __( 'Toggle the preview to experience how the fullscreen overlay will animate on the front end.', 'advanced-mobile-navigation' );

            return el(
                Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: __( 'Toggle Button', 'advanced-mobile-navigation' ), initialOpen: true },
                        el( TextControl, {
                            label: __( 'Button label', 'advanced-mobile-navigation' ),
                            value: toggleButtonLabel,
                            onChange: function ( value ) {
                                setAttributes( { toggleButtonLabel: value } );
                            }
                        } ),
                        el( TextControl, {
                            label: __( 'Button ARIA label', 'advanced-mobile-navigation' ),
                            help: __( 'Provide an accessible label for screen readers.', 'advanced-mobile-navigation' ),
                            value: toggleButtonAriaLabel,
                            onChange: function ( value ) {
                                setAttributes( { toggleButtonAriaLabel: value } );
                            }
                        } ),
                        el( SelectControl, {
                            label: __( 'Button shape', 'advanced-mobile-navigation' ),
                            value: buttonShape,
                            options: [
                                { label: __( 'Pill', 'advanced-mobile-navigation' ), value: 'pill' },
                                { label: __( 'Rounded', 'advanced-mobile-navigation' ), value: 'rounded' },
                                { label: __( 'Square', 'advanced-mobile-navigation' ), value: 'square' }
                            ],
                            onChange: function ( value ) {
                                setAttributes( { buttonShape: value || 'pill' } );
                            }
                        } ),
                        el(
                            BaseControl,
                            { label: __( 'Button background', 'advanced-mobile-navigation' ) },
                            el( ColorPalette, {
                                colors: PRESET_COLORS,
                                value: toggleButtonBackground,
                                onChange: function ( value ) {
                                    setAttributes( { toggleButtonBackground: value || '' } );
                                }
                            } ),
                            el( TextControl, {
                                label: __( 'Custom background value', 'advanced-mobile-navigation' ),
                                value: toggleButtonBackground,
                                onChange: function ( value ) {
                                    setAttributes( { toggleButtonBackground: value } );
                                },
                                placeholder: __( 'e.g. rgba(15,15,15,0.95)', 'advanced-mobile-navigation' )
                            } )
                        ),
                        el(
                            BaseControl,
                            { label: __( 'Button text colour', 'advanced-mobile-navigation' ) },
                            el( ColorPalette, {
                                colors: PRESET_COLORS,
                                value: toggleButtonTextColor,
                                onChange: function ( value ) {
                                    setAttributes( { toggleButtonTextColor: value || '' } );
                                }
                            } )
                        )
                    ),
                    el(
                        PanelBody,
                        { title: __( 'Overlay Style', 'advanced-mobile-navigation' ), initialOpen: false },
                        el(
                            Notice,
                            { status: 'info', isDismissible: false },
                            __( 'Fine-tune the fullscreen overlay appearance for mobile devices.', 'advanced-mobile-navigation' )
                        ),
                        el(
                            BaseControl,
                            { label: __( 'Overlay background', 'advanced-mobile-navigation' ) },
                            el( ColorPalette, {
                                colors: PRESET_COLORS,
                                value: overlayBackground,
                                onChange: function ( value ) {
                                    setAttributes( { overlayBackground: value || '' } );
                                }
                            } ),
                            el( TextControl, {
                                label: __( 'Custom background value', 'advanced-mobile-navigation' ),
                                value: overlayBackground,
                                onChange: function ( value ) {
                                    setAttributes( { overlayBackground: value } );
                                },
                                placeholder: __( 'e.g. rgba(12,12,12,0.94)', 'advanced-mobile-navigation' )
                            } )
                        ),
                        el(
                            BaseControl,
                            { label: __( 'Overlay text colour', 'advanced-mobile-navigation' ) },
                            el( ColorPalette, {
                                colors: PRESET_COLORS,
                                value: overlayTextColor,
                                onChange: function ( value ) {
                                    setAttributes( { overlayTextColor: value || '' } );
                                }
                            } )
                        ),
                        el( RangeControl, {
                            label: __( 'Overlay blur', 'advanced-mobile-navigation' ),
                            value: overlayBlur,
                            min: 0,
                            max: 48,
                            step: 1,
                            onChange: function ( value ) {
                                setAttributes( { overlayBlur: value || 0 } );
                            },
                            help: __( 'Applies a backdrop blur to create depth.', 'advanced-mobile-navigation' )
                        } ),
                        el( RangeControl, {
                            label: __( 'Overlay padding (px)', 'advanced-mobile-navigation' ),
                            value: overlayPadding,
                            min: 24,
                            max: 160,
                            step: 4,
                            onChange: function ( value ) {
                                setAttributes( { overlayPadding: value || 0 } );
                            }
                        } ),
                        el( RangeControl, {
                            label: __( 'Item gap (px)', 'advanced-mobile-navigation' ),
                            value: overlayGap,
                            min: 12,
                            max: 96,
                            step: 2,
                            onChange: function ( value ) {
                                setAttributes( { overlayGap: value || 0 } );
                            }
                        } ),
                        el( SelectControl, {
                            label: __( 'Overlay content alignment', 'advanced-mobile-navigation' ),
                            value: menuAlignment,
                            options: [
                                { label: __( 'Center', 'advanced-mobile-navigation' ), value: 'center' },
                                { label: __( 'Left', 'advanced-mobile-navigation' ), value: 'left' },
                                { label: __( 'Right', 'advanced-mobile-navigation' ), value: 'right' }
                            ],
                            onChange: function ( value ) {
                                setAttributes( { menuAlignment: value || 'center' } );
                            }
                        } ),
                        el( SelectControl, {
                            label: __( 'Close button position', 'advanced-mobile-navigation' ),
                            value: closeButtonPosition,
                            options: [
                                { label: __( 'Top right', 'advanced-mobile-navigation' ), value: 'top-right' },
                                { label: __( 'Top left', 'advanced-mobile-navigation' ), value: 'top-left' },
                                { label: __( 'Bottom right', 'advanced-mobile-navigation' ), value: 'bottom-right' },
                                { label: __( 'Bottom left', 'advanced-mobile-navigation' ), value: 'bottom-left' }
                            ],
                            onChange: function ( value ) {
                                setAttributes( { closeButtonPosition: value || 'top-right' } );
                            }
                        } )
                    ),
                    el(
                        PanelBody,
                        { title: __( 'Behaviour', 'advanced-mobile-navigation' ), initialOpen: false },
                        el( ToggleControl, {
                            label: __( 'Lock body scroll', 'advanced-mobile-navigation' ),
                            checked: lockBodyScroll,
                            onChange: function ( value ) {
                                setAttributes( { lockBodyScroll: Boolean( value ) } );
                            }
                        } ),
                        el( ToggleControl, {
                            label: __( 'Close when clicking overlay background', 'advanced-mobile-navigation' ),
                            checked: closeOnOverlayClick,
                            onChange: function ( value ) {
                                setAttributes( { closeOnOverlayClick: Boolean( value ) } );
                            }
                        } ),
                        el( ToggleControl, {
                            label: __( 'Close when navigation link is selected', 'advanced-mobile-navigation' ),
                            checked: closeOnLinkClick,
                            onChange: function ( value ) {
                                setAttributes( { closeOnLinkClick: Boolean( value ) } );
                            }
                        } )
                    )
                ),
                el(
                    BlockControls,
                    null,
                    el(
                        ToolbarGroup,
                        null,
                        el( ToolbarButton, {
                            icon: isOverlayPreview ? 'hidden' : 'visibility',
                            label: toolbarButtonLabel,
                            onClick: function () {
                                setOverlayPreview( ! isOverlayPreview );
                            },
                            isPressed: isOverlayPreview
                        } )
                    ),
                    el( AlignmentToolbar, {
                        value: buttonAlignment,
                        onChange: function ( value ) {
                            setAttributes( { buttonAlignment: value || 'left' } );
                        },
                        alignmentControls: [
                            { icon: 'editor-alignleft', title: __( 'Align left', 'advanced-mobile-navigation' ), align: 'left' },
                            { icon: 'editor-aligncenter', title: __( 'Align center', 'advanced-mobile-navigation' ), align: 'center' },
                            { icon: 'editor-alignright', title: __( 'Align right', 'advanced-mobile-navigation' ), align: 'right' }
                        ]
                    } )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'wp-block-advanced-mobile-navigation__toggle-preview' },
                        el(
                            'button',
                            {
                                type: 'button',
                                className: classNames( 'wp-block-advanced-mobile-navigation__toggle', 'has-shape-' + buttonShape ),
                                disabled: true
                            },
                            el( 'span', { className: 'wp-block-advanced-mobile-navigation__toggle-label' }, toggleButtonLabel || __( 'Menu', 'advanced-mobile-navigation' ) ),
                            el( 'span', { className: 'wp-block-advanced-mobile-navigation__toggle-icon', 'aria-hidden': 'true' },
                                el( 'span', null ),
                                el( 'span', null ),
                                el( 'span', null )
                            )
                        ),
                        el( 'button', {
                            type: 'button',
                            className: classNames( 'wp-block-advanced-mobile-navigation__preview-trigger', { 'is-active': isOverlayPreview } ),
                            onClick: function () {
                                setOverlayPreview( ! isOverlayPreview );
                            }
                        }, toolbarButtonLabel )
                    ),
                    el(
                        'div',
                        { className: 'wp-block-advanced-mobile-navigation__preview-notice' },
                        overlayHelpText
                    ),
                    el(
                        'div',
                        { className: overlayClasses, role: 'presentation' },
                        el(
                            'div',
                            { className: 'wp-block-advanced-mobile-navigation__overlay-inner' },
                            el(
                                'div',
                                { className: 'wp-block-advanced-mobile-navigation__overlay-toolbar' },
                                el( 'span', { className: 'wp-block-advanced-mobile-navigation__preview-title' }, __( 'Overlay content', 'advanced-mobile-navigation' ) ),
                                el( 'span', { className: 'wp-block-advanced-mobile-navigation__preview-close' }, closeButtonLabel )
                            ),
                            el(
                                'div',
                                { className: 'wp-block-advanced-mobile-navigation__overlay-content' },
                                el( InnerBlocks, {
                                    allowedBlocks: ALLOWED_BLOCKS,
                                    template: TEMPLATE,
                                    templateLock: false,
                                    renderAppender: InnerBlocks.ButtonBlockAppender ? function () {
                                        return el( InnerBlocks.ButtonBlockAppender, null );
                                    } : undefined
                                } )
                            )
                        )
                    )
                )
            );
        },
        save: function Save( props ) {
            const attributes = props.attributes;
            const uniqueId = sanitizeId( attributes.uniqueId, 'amfnb' );
            const overlayId = 'amfnb-overlay-' + uniqueId;
            const buttonId = 'amfnb-toggle-' + uniqueId;
            const toggleButtonLabel = attributes.toggleButtonLabel;
            const toggleButtonAriaLabel = attributes.toggleButtonAriaLabel;
            const closeButtonLabel = attributes.closeButtonLabel;
            const overlayBackground = attributes.overlayBackground;
            const overlayTextColor = attributes.overlayTextColor;
            const toggleButtonBackground = attributes.toggleButtonBackground;
            const toggleButtonTextColor = attributes.toggleButtonTextColor;
            const overlayBlur = attributes.overlayBlur;
            const overlayPadding = attributes.overlayPadding;
            const overlayGap = attributes.overlayGap;
            const menuAlignment = attributes.menuAlignment;
            const buttonAlignment = attributes.buttonAlignment;
            const buttonShape = attributes.buttonShape;
            const closeButtonPosition = attributes.closeButtonPosition;
            const closeOnOverlayClick = attributes.closeOnOverlayClick;
            const closeOnLinkClick = attributes.closeOnLinkClick;
            const lockBodyScroll = attributes.lockBodyScroll;

            const ariaLabel = ( toggleButtonAriaLabel && toggleButtonAriaLabel.trim().length )
                ? toggleButtonAriaLabel
                : toggleButtonLabel;

            const blockProps = useBlockProps.save( {
                className: classNames(
                    'has-button-alignment-' + buttonAlignment,
                    'has-menu-alignment-' + menuAlignment,
                    'has-button-shape-' + buttonShape
                ),
                style: {
                    '--advanced-nav-overlay-bg': overlayBackground || undefined,
                    '--advanced-nav-overlay-color': overlayTextColor || undefined,
                    '--advanced-nav-toggle-bg': toggleButtonBackground || undefined,
                    '--advanced-nav-toggle-color': toggleButtonTextColor || undefined,
                    '--advanced-nav-overlay-blur': ( overlayBlur || 0 ) + 'px',
                    '--advanced-nav-overlay-padding': ( overlayPadding || 0 ) + 'px',
                    '--advanced-nav-overlay-gap': ( overlayGap || 0 ) + 'px'
                },
                'data-lock-scroll': lockBodyScroll ? 'true' : 'false',
                'data-close-on-overlay': closeOnOverlayClick ? 'true' : 'false',
                'data-close-on-link': closeOnLinkClick ? 'true' : 'false',
                'data-close-position': closeButtonPosition
            } );

            const overlayClasses = classNames(
                'wp-block-advanced-mobile-navigation__overlay',
                'is-align-' + menuAlignment,
                'is-close-' + closeButtonPosition
            );

            return el(
                'div',
                blockProps,
                el(
                    'button',
                    {
                        id: buttonId,
                        className: classNames( 'wp-block-advanced-mobile-navigation__toggle', 'has-shape-' + buttonShape ),
                        type: 'button',
                        'aria-controls': overlayId,
                        'aria-expanded': 'false',
                        'aria-label': ariaLabel || undefined,
                        'data-overlay-target': overlayId
                    },
                    el( 'span', { className: 'wp-block-advanced-mobile-navigation__toggle-label' }, toggleButtonLabel || __( 'Menu', 'advanced-mobile-navigation' ) ),
                    el( 'span', { className: 'wp-block-advanced-mobile-navigation__toggle-icon', 'aria-hidden': 'true' },
                        el( 'span', null ),
                        el( 'span', null ),
                        el( 'span', null )
                    )
                ),
                el(
                    'div',
                    {
                        id: overlayId,
                        className: overlayClasses,
                        role: 'dialog',
                        'aria-modal': 'true',
                        'aria-hidden': 'true',
                        hidden: true
                    },
                    el(
                        'div',
                        { className: 'wp-block-advanced-mobile-navigation__overlay-inner' },
                        el(
                            'button',
                            {
                                type: 'button',
                                className: 'wp-block-advanced-mobile-navigation__close',
                                'aria-label': closeButtonLabel
                            },
                            el( 'span', { 'aria-hidden': 'true' }, ' D7' ),
                            el( 'span', { className: 'screen-reader-text' }, closeButtonLabel )
                        ),
                        el(
                            'nav',
                            {
                                className: 'wp-block-advanced-mobile-navigation__overlay-content',
                                'aria-label': ariaLabel || __( 'Mobile menu', 'advanced-mobile-navigation' )
                            },
                            el( InnerBlocks.Content, null )
                        )
                    )
                )
            );
        }
    } );
} )( window.wp );
