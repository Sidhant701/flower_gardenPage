/**
 * Sunflower Garden - Dynamic flower generation and animation
 * 
 * Configuration for garden layout, flower counts, and animation parameters.
 * Flower counts are calculated dynamically based on screen width.
 */

const GARDEN_CONFIG = {
    // Base counts at 1920px width (desktop)
    baseWidth: 1920,
    baseFlowerCounts: {
        farBack: 18,
        back: 15,
        front: 16
    },
    // Minimum flower counts (for very small screens)
    minFlowerCounts: {
        farBack: 4,
        back: 3,
        front: 3
    },
    petalsPerFlower: 12,
    swayDurations: ['4s', '4.2s', '4.5s', '4.6s', '4.8s', '5s', '5.2s']
};

/**
 * Calculates flower counts based on current viewport width
 * @returns {Object} - Row configurations with calculated counts
 */
function getResponsiveRowConfig() {
    const width = window.innerWidth;
    const ratio = Math.min(width / GARDEN_CONFIG.baseWidth, 1);
    
    const calcCount = (base, min) => Math.max(min, Math.round(base * ratio));
    
    return [
        { 
            className: 'row--far-back', 
            flowerClass: 'sunflower--tiny', 
            count: calcCount(GARDEN_CONFIG.baseFlowerCounts.farBack, GARDEN_CONFIG.minFlowerCounts.farBack)
        },
        { 
            className: 'row--back', 
            flowerClass: 'sunflower--small', 
            count: calcCount(GARDEN_CONFIG.baseFlowerCounts.back, GARDEN_CONFIG.minFlowerCounts.back)
        },
        { 
            className: 'row--front', 
            flowerClass: '', 
            count: calcCount(GARDEN_CONFIG.baseFlowerCounts.front, GARDEN_CONFIG.minFlowerCounts.front)
        }
    ];
}

/**
 * Creates the HTML structure for a single sunflower
 * @param {string} sizeClass - Additional class for flower size variant
 * @param {number} index - Flower index for animation variation
 * @returns {HTMLElement} - The sunflower element
 */
function createSunflower(sizeClass, index) {
    const flower = document.createElement('div');
    flower.className = `sunflower ${sizeClass}`.trim();
    
    // Set varied sway duration based on index
    const duration = GARDEN_CONFIG.swayDurations[index % GARDEN_CONFIG.swayDurations.length];
    flower.style.setProperty('--sway-duration', duration);
    
    // Create stem
    const stem = document.createElement('div');
    stem.className = 'stem';
    flower.appendChild(stem);
    
    // Create leaves
    ['left', 'right'].forEach(side => {
        const leaf = document.createElement('div');
        leaf.className = `leaf leaf--${side}`;
        leaf.setAttribute('aria-hidden', 'true');
        flower.appendChild(leaf);
    });
    
    // Create head with petals and center
    const head = document.createElement('div');
    head.className = 'head';
    
    const petals = document.createElement('div');
    petals.className = 'petals';
    
    for (let i = 0; i < GARDEN_CONFIG.petalsPerFlower; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petals.appendChild(petal);
    }
    
    const center = document.createElement('div');
    center.className = 'center';
    petals.appendChild(center);
    
    head.appendChild(petals);
    flower.appendChild(head);
    
    return flower;
}

/**
 * Creates a row of sunflowers
 * @param {Object} rowConfig - Configuration for the row
 * @returns {HTMLElement} - The row element with flowers
 */
function createRow(rowConfig) {
    const row = document.createElement('div');
    row.className = `row ${rowConfig.className}`;
    
    for (let i = 0; i < rowConfig.count; i++) {
        const flower = createSunflower(rowConfig.flowerClass, i);
        row.appendChild(flower);
    }
    
    return row;
}

/**
 * Clears existing flowers and rebuilds the garden
 */
function rebuildGarden() {
    const garden = document.querySelector('.garden');
    if (!garden) return;
    
    // Remove existing rows
    garden.querySelectorAll('.row').forEach(row => row.remove());
    
    // Rebuild with new counts
    const fragment = document.createDocumentFragment();
    const rows = getResponsiveRowConfig();
    
    rows.forEach(rowConfig => {
        const row = createRow(rowConfig);
        fragment.appendChild(row);
    });
    
    garden.appendChild(fragment);
}

/**
 * Initializes the garden by creating all rows and flowers
 */
function initGarden() {
    const garden = document.querySelector('.garden');
    if (!garden) {
        console.error('Garden container not found');
        return;
    }
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    const rows = getResponsiveRowConfig();
    
    rows.forEach(rowConfig => {
        const row = createRow(rowConfig);
        fragment.appendChild(row);
    });
    
    garden.appendChild(fragment);
}

// Debounce utility for resize events
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(rebuildGarden, 250);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGarden();
        window.addEventListener('resize', handleResize);
    });
} else {
    initGarden();
    window.addEventListener('resize', handleResize);
}
