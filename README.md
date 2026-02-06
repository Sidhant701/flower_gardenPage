# 🌻 Animated Sunflower Garden

A beautiful, responsive animated sunflower garden built with pure HTML, CSS, and JavaScript. No frameworks or dependencies required.

![Sunflower Garden Preview](https://img.shields.io/badge/Pure-CSS%20%2B%20JS-yellow?style=flat-square)
![Responsive](https://img.shields.io/badge/Responsive-Yes-green?style=flat-square)
![Accessibility](https://img.shields.io/badge/A11y-Supported-blue?style=flat-square)

## ✨ Features

- **Fully Responsive**: Flower count adjusts dynamically based on screen width
- **Animated Sun**: Glowing sun with subtle pulsing animation
- **Swaying Flowers**: Natural-looking sway animation with varied timing
- **Depth Layering**: Three rows of flowers (tiny, small, full-size) create depth
- **Accessibility**: Supports `prefers-reduced-motion` for users who prefer less motion
- **Configurable**: Easy to customize colors, sizes, and flower counts
- **No Dependencies**: Pure vanilla HTML, CSS, and JavaScript

## 📁 Project Structure

```
flower/
├── sunflower.html   # Main HTML file
├── styles.css       # All styling and animations
├── script.js        # Dynamic flower generation
└── README.md        # This file
```

## 🚀 Getting Started

1. Clone or download the project
2. Open `sunflower.html` in any modern browser
3. That's it! No build steps or server required

```bash
# If you have a local server (optional)
npx serve .
# or
python -m http.server 8000
```

## ⚙️ Configuration

### Flower Counts

Edit `script.js` to adjust flower counts:

```javascript
const GARDEN_CONFIG = {
    // Base counts at 1920px width (desktop)
    baseFlowerCounts: {
        farBack: 18,  // Tiny flowers (back row)
        back: 15,     // Small flowers (middle row)
        front: 16     // Full-size flowers (front row)
    },
    // Minimum flower counts (for very small screens)
    minFlowerCounts: {
        farBack: 4,
        back: 3,
        front: 3
    },
    petalsPerFlower: 12,
    // ...
};
```

### Colors

Edit CSS custom properties in `styles.css`:

```css
:root {
    /* Sky & Grass */
    --color-sky-light: #87ceeb;
    --color-grass-light: #7ab856;
    
    /* Flower Colors */
    --color-petal: #ffd700;
    --color-stem: #2d5016;
    --color-leaf-light: #3aa335;
    
    /* Sun Colors */
    --color-sun-core: #fff7b0;
    --color-sun-mid: #ffeb3b;
    /* ... */
}
```

### Sizes

Adjust flower dimensions via CSS variables:

```css
:root {
    --stem-height: 220px;
    --head-size: 120px;
    --leaf-width: 62px;
    --sun-size: 80px;
    /* ... */
}
```

## 📱 Responsive Behavior

| Screen Width | Far Back | Back | Front | Total Flowers |
|--------------|----------|------|-------|---------------|
| 1920px+      | 18       | 15   | 16    | 49            |
| ~1024px      | 10       | 8    | 9     | 27            |
| ~768px       | 7        | 6    | 6     | 19            |
| ~480px       | 5        | 4    | 4     | 13            |
| <360px       | 4        | 3    | 3     | 10            |

## 🎨 CSS Architecture

The CSS follows a structured organization:

1. **CSS Custom Properties** - All configurable values
2. **Base Styles** - Reset and body styling
3. **Sun Component** - Sun with glare effect
4. **Garden Layout** - Container and row positioning
5. **Sunflower Components** - Base flower and variants
6. **Animations** - Sway and glow keyframes
7. **Responsive Breakpoints** - Mobile-first scaling

## ♿ Accessibility

- Uses semantic HTML (`<main>` with ARIA labels)
- Decorative elements marked with `aria-hidden="true"`
- Respects `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
    .sun, .head {
        animation: none;
    }
}
```

## 🌐 Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

Requires support for:
- CSS Custom Properties
- CSS `clamp()`
- CSS Flexbox
- ES6 JavaScript

## 📄 License

MIT License - Feel free to use, modify, and distribute.

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

Made with 💛 and CSS
