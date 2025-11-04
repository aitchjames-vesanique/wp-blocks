# Advanced Navigation Block for WordPress

A customizable WordPress block that provides a mobile-friendly fullscreen navigation menu with extensive customization options in the block editor.

## Features

- **Customizable Menu Items**: Add, edit, reorder, and remove menu items directly in the block editor
- **Mobile Fullscreen Popup**: Beautiful fullscreen overlay menu optimized for mobile devices
- **Customizable Button**: Control button label and position (left, center, right)
- **Color Customization**: 
  - Overlay color and opacity
  - Menu background color
  - Menu text color
  - Close button color
- **Menu Alignment**: Control text alignment within the menu (left, center, right)
- **Smooth Animations**: Elegant slide-in animations with staggered menu item reveals
- **Accessibility**: Full keyboard navigation support and ARIA labels
- **Responsive Design**: Optimized for all screen sizes

## Installation

1. Upload the plugin folder to `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Install dependencies: `npm install`
4. Build the assets: `npm run build`
5. The block will appear in the block inserter under the "Design" category

## Development

### Prerequisites

- Node.js and npm installed
- WordPress 5.8+ with Gutenberg enabled

### Setup

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start development mode (watch for changes)
npm start
```

### Project Structure

```
advanced-navigation-block/
├── advanced-navigation-block.php  # Main plugin file
├── package.json                   # npm dependencies
├── webpack.config.js              # Build configuration
├── src/
│   ├── block.json                 # Block metadata
│   ├── index.js                   # Editor component (React)
│   ├── frontend.js                # Frontend JavaScript
│   ├── editor.css                 # Editor styles
│   └── style.css                  # Frontend styles
└── build/                         # Built files (generated)
```

## Usage

1. In the WordPress block editor, search for "Advanced Navigation" block
2. Add the block to your page/post
3. Use the sidebar controls to:
   - Add menu items with labels and URLs
   - Configure button appearance and position
   - Customize colors and styling
   - Adjust menu alignment
4. Preview changes in real-time
5. Publish and the navigation will appear on your frontend

## Customization Options

### Menu Button
- **Button Label**: Text displayed on the toggle button
- **Button Position**: Left, Center, or Right alignment

### Menu Items
- Add unlimited menu items
- Set URL and label for each item
- Option to open links in new tabs
- Drag to reorder items (via up/down buttons)

### Colors & Styling
- **Overlay Color**: Background color of the fullscreen overlay
- **Overlay Opacity**: Transparency level (0-1)
- **Menu Background**: Background color of the menu container
- **Menu Text Color**: Color of menu item text
- **Close Button Color**: Color of the close/X button

### Layout
- **Menu Alignment**: Left, Center, or Right alignment of menu items

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader friendly
- Escape key to close menu
- Respects `prefers-reduced-motion`

## License

GPL-2.0-or-later

## Credits

Built with WordPress Block API and React.
