import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        buttonText,
        buttonIcon,
        overlayColor,
        overlayOpacity,
        closeButtonPosition,
        animationStyle,
        menuItems,
        buttonStyle,
        buttonBackgroundColor,
        buttonTextColor,
        menuItemSpacing
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'advanced-mobile-navigation'
    });

    return (
        <div {...blockProps}>
            <button
                className={`mobile-nav-toggle mobile-nav-button--${buttonStyle}`}
                aria-label="Toggle navigation"
                aria-expanded="false"
                data-animation={animationStyle}
                style={{
                    backgroundColor: buttonStyle !== 'outline' && buttonStyle !== 'text' ? buttonBackgroundColor : 'transparent',
                    color: buttonTextColor,
                    borderColor: buttonStyle === 'outline' ? buttonBackgroundColor : 'transparent'
                }}
            >
                {buttonIcon !== 'none' && (
                    <span className="mobile-nav-icon" aria-hidden="true">
                        {buttonIcon === 'hamburger' && '☰'}
                        {buttonIcon === 'dots' && '⋯'}
                        {buttonIcon === 'grid' && '⊞'}
                    </span>
                )}
                {buttonText && <span className="mobile-nav-text">{buttonText}</span>}
            </button>

            <div
                className={`mobile-nav-overlay animation-${animationStyle}`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                data-close-position={closeButtonPosition}
                style={{
                    backgroundColor: overlayColor,
                    opacity: overlayOpacity
                }}
            >
                <div className="mobile-nav-content">
                    <button
                        className={`mobile-nav-close close-${closeButtonPosition}`}
                        aria-label="Close navigation"
                    >
                        <span aria-hidden="true">✕</span>
                    </button>

                    <nav className="mobile-nav-menu">
                        <ul
                            className="mobile-nav-list"
                            style={{ '--menu-item-spacing': `${menuItemSpacing}px` }}
                        >
                            {menuItems.map((item) => (
                                <li key={item.id} className="mobile-nav-item">
                                    <a
                                        href={item.url}
                                        className="mobile-nav-link"
                                        target={item.isExternal ? '_blank' : '_self'}
                                        rel={item.isExternal ? 'noopener noreferrer' : undefined}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
