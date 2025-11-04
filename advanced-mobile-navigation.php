<?php
/**
 * Plugin Name: Advanced Mobile Navigation Block
 * Plugin URI: https://example.com
 * Description: An advanced navigation block with customizable fullscreen mobile menu popup
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: advanced-mobile-navigation
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Register the block
 */
function advanced_mobile_navigation_register_block() {
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'advanced_mobile_navigation_register_block');

/**
 * Enqueue frontend scripts
 */
function advanced_mobile_navigation_enqueue_scripts() {
    if (has_block('advanced-mobile-navigation/navigation-block')) {
        wp_enqueue_script(
            'advanced-mobile-navigation-frontend',
            plugins_url('build/view.js', __FILE__),
            array(),
            '1.0.0',
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'advanced_mobile_navigation_enqueue_scripts');
