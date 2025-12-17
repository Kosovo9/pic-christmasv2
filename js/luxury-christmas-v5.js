document.addEventListener('DOMContentLoaded', () => {
    initSnowEffect();
    initShowcaseCarousel();
});

/* --- 1. Snow Effect System (Zero Performance Impact) --- */
function initSnowEffect() {
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    document.body.prepend(snowContainer);

    const snowSymbol = '❄';
    const flakeCount = 50; // Balanced for performance

    for (let i = 0; i < flakeCount; i++) {
        createFlake(snowContainer, snowSymbol);
    }
}

function createFlake(container, symbol) {
    const flake = document.createElement('div');
    flake.classList.add('snowflake');
    flake.innerText = symbol;

    // Randomize physics
    const xPos = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 10 + Math.random() * 10; // Slow fall (10-20s)
    const size = 0.5 + Math.random() * 1.5; // Random size

    flake.style.left = `${xPos}vw`;
    flake.style.animationDelay = `${delay}s`;
    flake.style.animationDuration = `${duration}s`;
    flake.style.fontSize = `${size}em`;
    flake.style.opacity = Math.random();

    container.appendChild(flake);
}

/* --- 2. Showcase Carousel Injection & Logic --- */
function initShowcaseCarousel() {
    // Find injection point: Below the main hero button
    const heroSection = document.querySelector('#hero');
    const mainButton = document.querySelector('.cta-button');

    if (!heroSection) return;

    // Create Carousel Container
    const carousel = document.createElement('div');
    carousel.id = 'showcase-carousel';

    // Image sources (using local assets + duplicates for infinite feel)
    const images = [
        'assets/images/carousel_new_1.png',
        'assets/images/carousel_new_2.png',
        'assets/images/gallery1.jpg', // Assuming these exist from before
        'assets/images/gallery2.jpg',
        'assets/images/carousel_new_1.png', // Repeat used
        'assets/images/carousel_new_2.png'
    ];

    images.forEach(src => {
        const thumb = document.createElement('div');
        thumb.classList.add('showcase-thumb');
        // Handle potential missing images gracefully
        thumb.style.backgroundImage = `url('${src}')`;
        // Fallback color if image missing
        thumb.style.backgroundColor = 'rgba(26,26,46,0.8)';

        carousel.appendChild(thumb);
    });

    // Insert after button
    if (mainButton && mainButton.parentNode) {
        // Use a wrapper if needed, or just insert after
        // We'll insert at the bottom of the hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.appendChild(carousel);
        } else {
            heroSection.appendChild(carousel);
        }
    }

    // Auto Scroll Logic (Cinematic - Ultra Smooth)
    let scrollAmount = 0;
    const speed = 0.3; // Slower, more elegant cinematic pan

    function autoScroll() {
        if (!carousel) return;
        scrollAmount += speed;
        // Reset if reached end (Infinite loop illusion)
        if (scrollAmount >= (carousel.scrollWidth - carousel.clientWidth)) {
            scrollAmount = 0;
        }
        carousel.scrollLeft = scrollAmount;
        requestAnimationFrame(autoScroll);
    }

    // Start scroll (can be paused on hover if we want, but "Cinematic" usually implies constant flow)
    // requestAnimationFrame(autoScroll); // Optional: Uncomment for auto-pan
}
