<?php
/**
 * Plugin Name: Advanced Navigation Block
 * Plugin URI: https://example.com/advanced-navigation-block
 * Description: A customizable navigation block with mobile fullscreen popup menu
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL-2.0-or-later
 * Text Domain: advanced-navigation-block
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Define plugin constants
define('ANB_VERSION', '1.0.0');
define('ANB_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('ANB_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Register the block
 */
function anb_register_block() {
    if (!function_exists('register_block_type')) {
        return;
    }

    // Register block styles
    wp_register_style(
        'anb-block-editor',
        ANB_PLUGIN_URL . 'build/editor.css',
        array(),
        ANB_VERSION
    );

    wp_register_style(
        'anb-block-style',
        ANB_PLUGIN_URL . 'build/style.css',
        array(),
        ANB_VERSION
    );

    // Register block script
    wp_register_script(
        'anb-block-editor',
        ANB_PLUGIN_URL . 'build/index.js',
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor'),
        ANB_VERSION,
        true
    );

    // Register the block
    // Note: viewScript is automatically registered via block.json
    register_block_type(ANB_PLUGIN_DIR . 'src/block.json', array(
        'render_callback' => 'anb_render_block',
    ));
}
add_action('init', 'anb_register_block');

/**
 * Render callback for the block
 */
function anb_render_block($attributes) {
    $menu_items = isset($attributes['menuItems']) ? $attributes['menuItems'] : array();
    $button_label = isset($attributes['buttonLabel']) ? $attributes['buttonLabel'] : 'Menu';
    $button_position = isset($attributes['buttonPosition']) ? $attributes['buttonPosition'] : 'right';
    $menu_alignment = isset($attributes['menuAlignment']) ? $attributes['menuAlignment'] : 'left';
    $overlay_color = isset($attributes['overlayColor']) ? $attributes['overlayColor'] : '#000000';
    $overlay_opacity = isset($attributes['overlayOpacity']) ? $attributes['overlayOpacity'] : 0.9;
    $menu_bg_color = isset($attributes['menuBgColor']) ? $attributes['menuBgColor'] : '#ffffff';
    $close_button_color = isset($attributes['closeButtonColor']) ? $attributes['closeButtonColor'] : '#000000';
    $menu_text_color = isset($attributes['menuTextColor']) ? $attributes['menuTextColor'] : '#000000';
    $block_id = isset($attributes['blockId']) && !empty($attributes['blockId']) 
        ? $attributes['blockId'] 
        : 'anb-' . uniqid();

    // Calculate overlay RGBA
    $overlay_rgba = anb_hex_to_rgba($overlay_color, $overlay_opacity);

    ob_start();
    ?>
    <div 
        class="anb-navigation-wrapper" 
        data-block-id="<?php echo esc_attr($block_id); ?>"
        data-wp-interactive="advanced-navigation-block/navigation"
        data-wp-context='{"isOpen": false}'
    >
        <button 
            class="anb-menu-toggle" 
            aria-label="<?php echo esc_attr($button_label); ?>"
            data-wp-bind--aria-expanded="state.isOpen"
            data-wp-on--click="actions.toggleMenu"
            style="--button-position: <?php echo esc_attr($button_position); ?>;"
        >
            <span class="anb-menu-toggle-label"><?php echo esc_html($button_label); ?></span>
            <span class="anb-menu-toggle-icon">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </button>

        <div 
            class="anb-fullscreen-overlay" 
            role="dialog"
            aria-modal="true"
            aria-label="<?php esc_attr_e('Navigation Menu', 'advanced-navigation-block'); ?>"
            data-wp-class--anb-active="state.isOpen"
            data-wp-on--click="actions.handleOverlayClick"
            data-wp-on--touchmove="actions.preventScroll"
            data-wp-on--keydown="actions.handleEscapeKey"
            style="--overlay-color: <?php echo esc_attr($overlay_rgba); ?>;"
        >
            <div 
                class="anb-menu-container"
                style="--menu-bg-color: <?php echo esc_attr($menu_bg_color); ?>; --menu-text-color: <?php echo esc_attr($menu_text_color); ?>; --menu-alignment: <?php echo esc_attr($menu_alignment); ?>;"
            >
                <button 
                    class="anb-menu-close" 
                    aria-label="<?php esc_attr_e('Close Menu', 'advanced-navigation-block'); ?>"
                    data-wp-on--click="actions.closeMenu"
                    style="--close-color: <?php echo esc_attr($close_button_color); ?>;"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>

                <nav class="anb-menu">
                    <?php if (!empty($menu_items)) : ?>
                        <ul class="anb-menu-list">
                            <?php foreach ($menu_items as $item) : ?>
                                <?php 
                                $url = isset($item['url']) ? esc_url($item['url']) : '#';
                                $label = isset($item['label']) ? esc_html($item['label']) : '';
                                $target = isset($item['opensInNewTab']) && $item['opensInNewTab'] ? '_blank' : '_self';
                                ?>
                                <li class="anb-menu-item">
                                    <a 
                                        href="<?php echo $url; ?>" 
                                        target="<?php echo esc_attr($target); ?>" 
                                        class="anb-menu-link"
                                        data-wp-on--click="actions.handleLinkClick"
                                    >
                                        <?php echo $label; ?>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php else : ?>
                        <p class="anb-menu-empty"><?php esc_html_e('No menu items added yet.', 'advanced-navigation-block'); ?></p>
                    <?php endif; ?>
                </nav>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Convert hex color to RGBA
 */
function anb_hex_to_rgba($hex, $opacity) {
    $hex = ltrim($hex, '#');
    $r = hexdec(substr($hex, 0, 2));
    $g = hexdec(substr($hex, 2, 2));
    $b = hexdec(substr($hex, 4, 2));
    return "rgba($r, $g, $b, $opacity)";
}
