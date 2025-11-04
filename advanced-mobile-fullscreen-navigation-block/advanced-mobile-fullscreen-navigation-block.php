<?php
/**
 * Plugin Name:       Advanced Mobile Fullscreen Navigation Block
 * Description:       Adds a customizable fullscreen mobile navigation experience that is editable from the block editor.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            Advanced Mobile Navigation Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       advanced-mobile-navigation
 *
 * @package AdvancedMobileFullscreenNavigationBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Registers the block relying on the metadata loaded from block.json.
 *
 * @return void
 */
function amfnb_register_block() {
    register_block_type( __DIR__ );
}

add_action( 'init', 'amfnb_register_block' );
