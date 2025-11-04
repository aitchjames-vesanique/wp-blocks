# Advanced Mobile Navigation Block for WordPress

A powerful and customizable WordPress block that provides a fullscreen mobile navigation menu with extensive customization options through the Block Editor.

## Features

### 🎨 Customizable Button Styles
- Multiple button styles: Default, Outline, Text Only, and Rounded
- Customizable button colors (background and text)
- Multiple icon options: Hamburger (☰), Dots (⋯), Grid (⊞), or none
- Custom button text

### 🌟 Fullscreen Overlay
- Multiple animation styles:
  - Fade
  - Slide from Top/Bottom/Left/Right
  - Zoom
- Customizable overlay color and opacity
- Configurable close button position (Top Right, Top Left, Top Center)

### 📱 Mobile-First Design
- Fully responsive
- Touch-friendly navigation
- Smooth animations
- Accessibility-focused (ARIA labels, keyboard navigation, focus trap)

### ⚙️ Menu Customization
- Add unlimited menu items
- Reorder items with up/down buttons
- Set custom URLs and labels
- Option to open links in new tabs
- Adjustable menu item spacing

### ♿ Accessibility Features
- ARIA labels and attributes
- Keyboard navigation support
- Focus trap within overlay
- ESC key to close
- Respects `prefers-reduced-motion`
- Focus management

## Installation

### Prerequisites
- WordPress 6.0 or higher
- Node.js 16+ and npm

### Setup Steps

1. **Clone or download this plugin** to your WordPress plugins directory:
   ```bash
   cd wp-content/plugins/
   git clone [your-repo-url] advanced-mobile-navigation
   cd advanced-mobile-navigation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the block:**
   ```bash
   npm run build
   ```

   Or for development with watch mode:
   ```bash
   npm start
   ```

4. **Activate the plugin** in WordPress Admin → Plugins

## Usage

### Adding the Block

1. Edit a page or post in the WordPress Block Editor
2. Click the "+" button to add a new block
3. Search for "Advanced Mobile Navigation"
4. Add the block to your page

### Customizing the Navigation

#### Button Settings
- **Button Text**: Set the text that appears on the navigation button
- **Button Icon**: Choose from Hamburger, Dots, Grid, or None
- **Button Style**: Select Default, Outline, Text Only, or Rounded
- **Button Colors**: Customize background and text colors

#### Overlay Settings
- **Overlay Color**: Choose the background color for the fullscreen menu
- **Overlay Opacity**: Adjust transparency (0-1)
- **Animation Style**: Select how the overlay appears (fade, slide, zoom)
- **Close Button Position**: Choose where the close button appears

#### Menu Items
- **Add Items**: Click "+ Add Menu Item" to add navigation links
- **Reorder**: Use up/down arrows to change item order
- **Configure**: Set label, URL, and external link options
- **Remove**: Delete unwanted items
- **Spacing**: Adjust spacing between menu items

## Customization

### Styling

The block uses CSS custom properties for easy theming:

```css
.mobile-nav-list {
    --menu-item-spacing: 20px; /* Adjustable via block settings */
}
```

### Advanced Customization

You can add custom CSS to your theme to further customize the appearance:

```css
/* Customize the menu links */
.mobile-nav-link {
    font-family: 'Your Custom Font', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
}

/* Add custom hover effects */
.mobile-nav-link:hover {
    background: linear-gradient(45deg, #your-color-1, #your-color-2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

## File Structure

```
advanced-mobile-navigation/
├── advanced-mobile-navigation.php   # Main plugin file
├── package.json                     # Node dependencies
├── src/
│   ├── block.json                  # Block configuration
│   ├── index.js                    # Block registration
│   ├── edit.js                     # Editor component
│   ├── save.js                     # Frontend save component
│   ├── view.js                     # Frontend JavaScript
│   ├── style.scss                  # Frontend styles
│   └── editor.scss                 # Editor styles
├── build/                          # Compiled files (generated)
└── README.md                       # Documentation
```

## Development

### Build Commands

```bash
# Development build with watch mode
npm start

# Production build
npm run build

# Format code
npm run format

# Lint JavaScript
npm run lint:js

# Lint CSS
npm run lint:css
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

This block follows WCAG 2.1 Level AA guidelines:

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader friendly
- Reduced motion support

## Performance

- Optimized animations with CSS transforms
- Lazy-loaded frontend scripts
- Minimal JavaScript footprint
- Efficient event listeners

## Troubleshooting

### Block doesn't appear in editor
- Make sure you've run `npm install` and `npm run build`
- Check that the plugin is activated in WordPress
- Clear browser cache and WordPress cache

### Styles not loading
- Rebuild with `npm run build`
- Check browser console for errors
- Ensure WordPress is enqueuing styles correctly

### Menu not opening/closing
- Check browser console for JavaScript errors
- Ensure `view.js` is being loaded on the frontend
- Test in different browsers

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

GPL-2.0-or-later

## Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review WordPress Block Editor documentation

## Changelog

### 1.0.0
- Initial release
- Fullscreen mobile navigation
- Customizable button and overlay
- Multiple animation styles
- Accessibility features
- Responsive design

## Credits

Built with:
- [@wordpress/scripts](https://www.npmjs.com/package/@wordpress/scripts)
- [@wordpress/block-editor](https://www.npmjs.com/package/@wordpress/block-editor)
- [@wordpress/components](https://www.npmjs.com/package/@wordpress/components)

---

Made with ❤️ for the WordPress community
