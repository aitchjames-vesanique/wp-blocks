## Advanced Mobile Fullscreen Navigation Block

This plugin bundles a Gutenberg block that provides an immersive, full screen mobile navigation experience. The toggle button, overlay layout, and behaviors can be tailored in the editor, while the frontend runs on WordPress's Interactivity API for resilience and accessibility.

### Highlights
- Uses the Interactivity API (`wp.interactivity`) for state management, focus, and scroll locking
- Button, overlay colours, spacing, alignment, and shape are configurable from block controls
- Supports any nested blocks such as `core/navigation`, buttons, headings, and more
- Optional behaviors: close on overlay tap, close on link click, lock body scroll, Escape key support

### Requirements
- WordPress 6.5 or newer (Interactivity API)
- PHP 7.4+

### Installation
1. Copy the `advanced-mobile-fullscreen-navigation-block` folder into your site's `wp-content/plugins` directory.
2. Activate **Advanced Mobile Fullscreen Navigation Block** from the WordPress plugins screen.
3. Inside the block editor, search for "Fullscreen Mobile Navigation" and insert it where you need the mobile menu trigger.

### Customisation
- Configure button label, ARIA label, shape, and colours via the **Toggle Button** inspector panel.
- Tweak overlay background, typography colour, blur, padding, alignment, and gap in **Overlay Style**.
- Control close behavior and scroll locking in **Behaviour**.
- Nest any supported blocks (e.g. `core/navigation`, buttons, headings) inside the overlay content area.

### Frontend Behavior
- The Interactivity API keeps the toggle button and overlay in sync, including ARIA attributes and focus routing.
- Body scroll is locked by default when the overlay opens; disable it from the Behaviour panel if needed.
- The overlay closes automatically when a navigation link is selected (optional) or when the user presses Escape.

No build step is required: the compiled assets in `build/` are referenced directly by `block.json`.
