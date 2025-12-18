/**
 * MEGA PROMPT ANTIGRAVITY V5.0: JAVASCRIPT MODULAR
 * Incluye funcionalidad para el efecto de nieve persistente y el autoscroll del carrusel.
 */

(function () {
    "use strict";

    // ====================================================================
    // 1. EFECTO NIEVE PERSISTENTE (Sutil y 3D)
    // ====================================================================

    function createSnowEffect() {
        // Crear el contenedor de nieve si no existe
        let snowContainer = document.getElementById('snow-container');
        if (!snowContainer) {
            snowContainer = document.createElement('div');
            snowContainer.id = 'snow-container';
            document.body.appendChild(snowContainer);
        }

        const numberOfSnowflakes = 50; // Número de copos de nieve sutiles
        const snowContainerStyles = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        snowContainer.style.cssText = snowContainerStyles;

        // Inyectar CSS para la animación de los copos (asumiendo que el CSS principal no lo tiene)
        const snowCSS = `
            @keyframes fall {
                to {
                    transform: translateY(100vh);
                }
            }
            .snowflake {
                position: absolute;
                width: 5px;
                height: 5px;
                background: var(--color-highlight-snow, #E0F7FA);
                border-radius: 50%;
                opacity: 0.8;
                animation: fall linear infinite;
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = snowCSS;
        document.head.appendChild(styleSheet);

        for (let i = 0; i < numberOfSnowflakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';

            // Posición inicial aleatoria
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.top = -Math.random() * 100 + 'vh'; // Empieza fuera de la vista

            // Tamaño y opacidad aleatorios para efecto 3D
            const size = Math.random() * 3 + 2; // 2px a 5px
            snowflake.style.width = size + 'px';
            snowflake.style.height = size + 'px';
            snowflake.style.opacity = Math.random() * 0.5 + 0.3; // 0.3 a 0.8

            // Duración de la animación aleatoria (velocidad de caída)
            const duration = Math.random() * 15 + 10; // 10s a 25s
            snowflake.style.animationDuration = duration + 's';

            // Retraso de la animación aleatorio
            snowflake.style.animationDelay = Math.random() * 20 + 's';

            snowContainer.appendChild(snowflake);
        }
    }

    // ====================================================================
    // 2. CARRUSEL DE MINIATURAS (Autoscroll Suave)
    // ====================================================================

    function setupCarouselAutoscroll() {
        const carousel = document.getElementById('showcase-carousel');
        if (!carousel) return;

        const scrollSpeed = 0.5; // Velocidad de scroll en píxeles por frame
        let scrollDirection = 1; // 1 para derecha, -1 para izquierda

        function autoScroll() {
            // Si el scroll llega al final derecho, cambia la dirección
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
                scrollDirection = -1;
            }
            // Si el scroll llega al inicio izquierdo, cambia la dirección
            else if (carousel.scrollLeft <= 1) {
                scrollDirection = 1;
            }

            // Realiza el scroll suave
            carousel.scrollLeft += scrollSpeed * scrollDirection;
        }

        // Iniciar el autoscroll
        let scrollInterval = setInterval(autoScroll, 20); // 50 frames por segundo

        // Pausar el scroll al pasar el ratón (mejor UX)
        carousel.addEventListener('mouseenter', () => {
            clearInterval(scrollInterval);
        });

        // Reanudar el scroll al quitar el ratón
        carousel.addEventListener('mouseleave', () => {
            scrollInterval = setInterval(autoScroll, 20);
        });
    }

    // ====================================================================
    // INICIALIZACIÓN
    // ====================================================================

    document.addEventListener('DOMContentLoaded', () => {
        // Asume que el desarrollador ha añadido el contenedor #showcase-carousel al HTML
        // y ha incluido el CSS base.
        // createSnowEffect(); // DISABLED: Using Quantum Final optimized snow in index.html
        setupCarouselAutoscroll();
    });

})();
