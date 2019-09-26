<?php
/**
 * Plugin Name: Catz Block for Gutenberg
 * Description: Add random cats to your post!
 * Version: <strong>10.0.0</strong>
 * Author: Andres Hermosilla
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
