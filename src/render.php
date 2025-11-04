<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Generate a unique ID for this block instance
$unique_id = wp_unique_id('mobile-nav-');

// Extract attributes with defaults
$button_text = isset($attributes['buttonText']) ? esc_html($attributes['buttonText']) : 'Menu';
$button_icon = isset($attributes['buttonIcon']) ? esc_attr($attributes['buttonIcon']) : 'hamburger';
$overlay_color = isset($attributes['overlayColor']) ? esc_attr($attributes['overlayColor']) : '#000000';
$overlay_opacity = isset($attributes['overlayOpacity']) ? floatval($attributes['overlayOpacity']) : 0.95;
$close_button_position = isset($attributes['closeButtonPosition']) ? esc_attr($attributes['closeButtonPosition']) : 'top-right';
$animation_style = isset($attributes['animationStyle']) ? esc_attr($attributes['animationStyle']) : 'fade';
$menu_items = isset($attributes['menuItems']) ? $attributes['menuItems'] : [];
$button_style = isset($attributes['buttonStyle']) ? esc_attr($attributes['buttonStyle']) : 'default';
$button_bg_color = isset($attributes['buttonBackgroundColor']) ? esc_attr($attributes['buttonBackgroundColor']) : '#0073aa';
$button_text_color = isset($attributes['buttonTextColor']) ? esc_attr($attributes['buttonTextColor']) : '#ffffff';
$menu_item_spacing = isset($attributes['menuItemSpacing']) ? intval($attributes['menuItemSpacing']) : 20;

// Prepare context for Interactivity API
$context = array(
    'isOpen' => false,
    'isClosing' => false,
    'uniqueId' => $unique_id,
    'animationStyle' => $animation_style
);

// Get icon character
$icon_char = '';
switch ($button_icon) {
    case 'hamburger':
        $icon_char = '☰';
        break;
    case 'dots':
        $icon_char = '⋯';
        break;
    case 'grid':
        $icon_char = '⊞';
        break;
}

// Determine button background style
$button_bg_style = '';
if ($button_style !== 'outline' && $button_style !== 'text') {
    $button_bg_style = $button_bg_color;
} else {
    $button_bg_style = 'transparent';
}

// Determine border color
$button_border_color = ($button_style === 'outline') ? $button_bg_color : 'transparent';

?>

<div 
    <?php echo get_block_wrapper_attributes(['class' => 'advanced-mobile-navigation']); ?>
    data-wp-interactive="advanced-mobile-navigation"
    data-wp-context='<?php echo wp_json_encode($context); ?>'
    data-wp-watch="callbacks.onOpenChange"
>
    <button
        class="mobile-nav-toggle mobile-nav-button--<?php echo $button_style; ?>"
        aria-label="Toggle navigation"
        data-wp-on--click="actions.toggleMenu"
        data-wp-bind--aria-expanded="state.isOpen"
        style="background-color: <?php echo $button_bg_style; ?>; color: <?php echo $button_text_color; ?>; border-color: <?php echo $button_border_color; ?>;"
    >
        <?php if ($button_icon !== 'none') : ?>
            <span class="mobile-nav-icon" aria-hidden="true">
                <?php echo $icon_char; ?>
            </span>
        <?php endif; ?>
        <?php if ($button_text) : ?>
            <span class="mobile-nav-text"><?php echo $button_text; ?></span>
        <?php endif; ?>
    </button>

    <div
        class="mobile-nav-overlay animation-<?php echo $animation_style; ?>"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        data-wp-class--is-active="state.isOpen"
        data-wp-class--is-closing="state.isClosing"
        data-wp-on--click="actions.handleOverlayClick"
        style="background-color: <?php echo $overlay_color; ?>; --overlay-opacity: <?php echo $overlay_opacity; ?>;"
    >
        <div class="mobile-nav-content">
            <button
                class="mobile-nav-close close-<?php echo $close_button_position; ?>"
                aria-label="Close navigation"
                data-wp-on--click="actions.closeMenu"
            >
                <span aria-hidden="true">✕</span>
            </button>

            <nav class="mobile-nav-menu">
                <ul
                    class="mobile-nav-list"
                    style="--menu-item-spacing: <?php echo $menu_item_spacing; ?>px;"
                >
                    <?php foreach ($menu_items as $item) : ?>
                        <li class="mobile-nav-item">
                            <a
                                href="<?php echo esc_url($item['url']); ?>"
                                class="mobile-nav-link"
                                <?php if (!empty($item['isExternal'])) : ?>
                                    target="_blank"
                                    rel="noopener noreferrer"
                                <?php else : ?>
                                    data-wp-on--click="actions.handleLinkClick"
                                <?php endif; ?>
                            >
                                <?php echo esc_html($item['label']); ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </nav>
        </div>
    </div>
</div>
