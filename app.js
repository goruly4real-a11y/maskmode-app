/**
 * MaskMode Interactive Landing Page Script
 * 
 * Handles the "pizzazz": 
 * - Dynamic theme switching based on mask personas.
 * - Preview card updates.
 * - Smooth scroll & light animations.
 */

const masks = {
    default: {
        title: "Default Mode",
        text: "Standard mystical interface.",
        class: "theme-default"
    },
    ronin: {
        title: "Ronin Elite",
        text: "Sharp, lethal discipline.",
        class: "theme-ronin"
    },
    ghost: {
        title: "Ghost Spirit",
        text: "Unseen, unheard, unknown.",
        class: "theme-ghost"
    },
    forest: {
        title: "Forest Guard",
        text: "Guardian of the old woods.",
        class: "theme-forest"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const switcher = document.querySelector('.mask-switcher');
    const options = document.querySelectorAll('.mask-option');
    const previewBody = document.getElementById('previewBody');
    const previewTitle = document.getElementById('previewTitle');
    const previewText = document.getElementById('previewText');
    const logoSvg = document.querySelector('.logo-svg');

    options.forEach(option => {
        option.addEventListener('click', () => {
            const maskKey = option.dataset.mask;
            const maskData = masks[maskKey];

            // 1. Update UI Selection
            options.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // 2. Switch Site-wide Theme
            // Remove existing theme classes
            document.body.classList.remove('theme-default', 'theme-ronin', 'theme-ghost', 'theme-forest');
            document.body.classList.add(maskData.class);

            // 3. Update Preview Card with Animation
            previewBody.style.opacity = '0';
            previewBody.style.transform = 'translateY(10px)';

            setTimeout(() => {
                previewTitle.innerText = maskData.title;
                previewText.innerText = maskData.text;

                previewBody.style.opacity = '1';
                previewBody.style.transform = 'translateY(0)';
            }, 300);

            // 4. Console log for visual confirmation
            console.log(`MaskMode Persona Switched: ${maskData.title}`);
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Cinematic Particle Burst
    function createParticles() {
        const container = document.getElementById('intro-particles');
        const particleCount = 24; // Optimized for performance

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'particle';

            // Random trajectory
            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 100 + Math.random() * 200;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            p.style.setProperty('--tx', `${tx}px`);
            p.style.setProperty('--ty', `${ty}px`);

            // Random size & timing
            const size = 2 + Math.random() * 4;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.animation = `particleBurst ${1 + Math.random()}s forwards ease-out`;
            p.style.animationDelay = `${Math.random() * 0.5}s`;

            container.appendChild(p);
        }
    }

    // Dismiss Intro Overlay with Coordinated Timing
    const introOverlay = document.getElementById('intro-overlay');
    const hero = document.querySelector('.hero');

    // Start particles after logo settles
    setTimeout(createParticles, 1200);

    // Final reveal
    setTimeout(() => {
        introOverlay.classList.add('hide');
        hero.classList.add('fade-in-visible');
        hero.classList.add('reveal-shake');

        // Remove shake class after animation
        setTimeout(() => hero.classList.remove('reveal-shake'), 1000);
    }, 4500);
});
