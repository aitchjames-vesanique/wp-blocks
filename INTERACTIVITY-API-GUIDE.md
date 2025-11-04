# WordPress Interactivity API Implementation Guide

This guide explains how this block uses the WordPress Interactivity API and how to extend it.

## Architecture Overview

### 1. Server-Side Rendering (`src/render.php`)

The PHP template generates the initial HTML with special `data-wp-*` directives:

```php
<div 
    data-wp-interactive="advanced-mobile-navigation"
    data-wp-context='<?php echo wp_json_encode($context); ?>'
>
```

**Key Directives Used:**

- `data-wp-interactive="namespace"` - Defines the interactive namespace
- `data-wp-context='{...}'` - Provides initial state
- `data-wp-on--click="actions.functionName"` - Event listeners
- `data-wp-class--classname="state.condition"` - Conditional CSS classes
- `data-wp-bind--attribute="state.value"` - Reactive attribute binding
- `data-wp-watch="callbacks.function"` - Side effects observer

### 2. Frontend Store (`src/view.js`)

The JavaScript defines reactive state and actions:

```javascript
import { store, getContext, getElement } from '@wordpress/interactivity';

store('advanced-mobile-navigation', {
    state: {
        // Reactive getters
        get isOpen() {
            return getContext().isOpen;
        }
    },
    actions: {
        // User interactions
        toggleMenu() {
            // Modify state
        }
    },
    callbacks: {
        // Side effects
        onOpenChange() {
            // React to state changes
        }
    }
});
```

## How State Management Works

### 1. Initial State

Set in `render.php`:
```php
$context = array(
    'isOpen' => false,
    'isClosing' => false,
    'uniqueId' => $unique_id
);
```

### 2. State Updates

Actions modify the context:
```javascript
actions: {
    openMenu() {
        const context = getContext();
        context.isOpen = true; // Reactive update
    }
}
```

### 3. Reactive UI Updates

HTML responds automatically:
```php
<div data-wp-class--is-active="state.isOpen">
    <!-- This div gets 'is-active' class when state.isOpen is true -->
</div>
```

## Common Patterns

### Event Handling

**In PHP (render.php):**
```php
<button data-wp-on--click="actions.toggleMenu">
    Toggle
</button>
```

**In JS (view.js):**
```javascript
actions: {
    toggleMenu() {
        const context = getContext();
        context.isOpen = !context.isOpen;
    }
}
```

### Conditional Classes

**In PHP:**
```php
<div 
    data-wp-class--active="state.isOpen"
    data-wp-class--closing="state.isClosing"
>
```

Classes are added/removed based on state automatically.

### Attribute Binding

**In PHP:**
```php
<button 
    data-wp-bind--aria-expanded="state.isOpen"
>
```

The `aria-expanded` attribute will be `"true"` or `"false"` based on `state.isOpen`.

### Side Effects with Callbacks

**In JS:**
```javascript
callbacks: {
    onOpenChange() {
        const context = getContext();
        
        if (context.isOpen) {
            // Add event listeners
            document.addEventListener('keydown', handler);
        } else {
            // Cleanup
            document.removeEventListener('keydown', handler);
        }
    }
}
```

Use `data-wp-watch` in HTML:
```php
<div data-wp-watch="callbacks.onOpenChange">
```

## Extending the Block

### Adding New State Properties

**1. Update render.php context:**
```php
$context = array(
    'isOpen' => false,
    'currentTab' => 'home', // New property
);
```

**2. Add getter in view.js:**
```javascript
state: {
    get currentTab() {
        return getContext().currentTab;
    }
}
```

**3. Add action to modify it:**
```javascript
actions: {
    setTab(event) {
        const context = getContext();
        const tabName = event.target.dataset.tab;
        context.currentTab = tabName;
    }
}
```

**4. Use in render.php:**
```php
<button 
    data-tab="about"
    data-wp-on--click="actions.setTab"
    data-wp-class--active="state.isActive"
>
    About
</button>
```

### Adding Animation Timing

**In view.js:**
```javascript
actions: {
    closeMenu() {
        const context = getContext();
        context.isClosing = true;
        
        // Delay to allow CSS animation
        setTimeout(() => {
            context.isOpen = false;
            context.isClosing = false;
        }, 400); // Match CSS animation duration
    }
}
```

### Accessing DOM Elements

Use `getElement()` to access the current block's DOM:

```javascript
actions: {
    focusFirstLink() {
        const element = getElement();
        const firstLink = element.ref.querySelector('.mobile-nav-link');
        if (firstLink) {
            firstLink.focus();
        }
    }
}
```

## Best Practices

### 1. **Keep State Minimal**
Only store what needs to be reactive. Don't duplicate data.

✅ Good:
```javascript
context.isOpen = true;
```

❌ Bad:
```javascript
context.isOpen = true;
context.menuState = 'open';
context.displayMenu = true;
```

### 2. **Use Callbacks for Side Effects**
Don't put side effects directly in actions.

✅ Good:
```javascript
actions: {
    openMenu() {
        context.isOpen = true;
    }
},
callbacks: {
    onOpenChange() {
        if (context.isOpen) {
            document.body.classList.add('menu-open');
        }
    }
}
```

❌ Bad:
```javascript
actions: {
    openMenu() {
        context.isOpen = true;
        document.body.classList.add('menu-open'); // Side effect in action
    }
}
```

### 3. **Always Clean Up**
Remove event listeners and cleanup in callbacks:

```javascript
callbacks: {
    onOpenChange() {
        const context = getContext();
        
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                actions.closeMenu();
            }
        };
        
        if (context.isOpen) {
            document.addEventListener('keydown', handleEscape);
        } else {
            document.removeEventListener('keydown', handleEscape);
        }
    }
}
```

### 4. **Use Unique IDs for Multiple Instances**
Generate unique IDs in render.php to support multiple block instances:

```php
$unique_id = wp_unique_id('mobile-nav-');
```

### 5. **Server-Side Rendering First**
Always ensure HTML works without JavaScript, then enhance:

```php
<!-- This link works even if JS fails -->
<a href="/page" data-wp-on--click="actions.navigate">
    Navigate
</a>
```

## Debugging Tips

### 1. Check Context in Console
```javascript
actions: {
    debug() {
        console.log('Current context:', getContext());
    }
}
```

### 2. Verify Directives in HTML
Use browser DevTools to inspect `data-wp-*` attributes.

### 3. Check WordPress Version
Interactivity API requires WordPress 6.5+:
```javascript
if (typeof wp.interactivity === 'undefined') {
    console.error('Interactivity API not available');
}
```

### 4. Watch State Changes
```javascript
callbacks: {
    logStateChanges() {
        console.log('State updated:', getContext());
    }
}
```

## Common Issues & Solutions

### Issue: State not updating
**Solution:** Make sure you're modifying `getContext()` directly:
```javascript
const context = getContext();
context.isOpen = true; // ✅
```

Not:
```javascript
let { isOpen } = getContext();
isOpen = true; // ❌ Won't trigger reactivity
```

### Issue: Multiple instances conflict
**Solution:** Use unique IDs and namespaced state:
```php
$context = array(
    'uniqueId' => wp_unique_id('nav-'),
    'isOpen' => false
);
```

### Issue: Classes not applying
**Solution:** Check directive syntax:
```php
<!-- Correct -->
data-wp-class--my-class="state.isActive"

<!-- Wrong -->
data-wp-class="my-class"
```

## Performance Considerations

1. **Minimize Context Size**: Only store necessary reactive data
2. **Debounce Expensive Operations**: Use setTimeout for heavy operations
3. **Use CSS for Animations**: Let CSS handle transitions, JS manages state
4. **Lazy Load**: Only initialize interactive features when needed

## Resources

- [Official Interactivity API Docs](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/)
- [API Reference](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/api-reference/)
- [Core Block Examples](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library)

---

**Need Help?** Check the main README.md or create an issue on GitHub.
