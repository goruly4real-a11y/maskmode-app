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

    const maskInput = document.getElementById('maskInput');
    const maskOutput = document.getElementById('maskOutput');
    let currentMask = 'default';

    // Mask Switcher Logic
    options.forEach(option => {
        option.addEventListener('click', () => {
            const maskKey = option.dataset.mask; // e.g. "ronin"

            // FORBIDDEN MASK LOGIC
            if (maskKey === 'forbidden') {
                triggerForbiddenSequence(option);
                return;
            }

            // Normal Switch Logic
            activateMask(maskKey, option);
            console.log(`MaskMode Persona Switched: ${masks[maskKey].title}`); // Re-added console log for normal switches
        });
    });

    // ==========================================
    // ELEMENTAL TRAILS (PC Only)
    // ==========================================
    const canvas = document.getElementById('trailCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    // Resize Canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Check if device supports hover (Mouse/PC)
    const isPC = window.matchMedia('(hover: hover)').matches;

    if (isPC) {
        window.addEventListener('mousemove', (e) => {
            createTrailParticles(e.x, e.y); // Renamed to avoid conflict with existing createParticles
        });
        animateTrails();
    }

    class Particle {
        constructor(x, y, type) {
            this.x = x;
            this.y = y;
            this.type = type;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.life = 100;

            // Type Specifics
            if (type === 'ronin') {
                this.color = '#d8b4fe';
                this.shape = 'square';
                this.speedX *= 2; // Faster sparks
            } else if (type === 'ghost') {
                this.color = '#00ccff';
                this.shape = 'circle';
                this.size *= 1.5; // Bigger smoke
            } else if (type === 'forest') {
                this.color = '#00ff88';
                this.shape = 'leaf';
                this.speedY += 1; // Falling leaves
            } else if (type === 'forbidden') {
                this.color = '#ffd700';
                this.shape = 'star';
                this.speedX *= 3; // Chaotic energy
            } else {
                this.color = 'white';
                this.shape = 'circle';
            }
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 2;
            if (this.life < 0) this.life = 0;
            this.size *= 0.95; // Shrink
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life / 100;
            ctx.beginPath();

            if (this.shape === 'square') {
                ctx.fillRect(this.x, this.y, this.size, this.size);
            } else if (this.shape === 'circle') {
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.shape === 'leaf') {
                ctx.ellipse(this.x, this.y, this.size, this.size / 2, 45 * Math.PI / 180, 0, 2 * Math.PI);
                ctx.fill();
            } else if (this.shape === 'star') {
                ctx.fillRect(this.x, this.y, this.size, this.size);
                // Simple star/spark representation
            }

            ctx.globalAlpha = 1;
        }
    }

    function createTrailParticles(x, y) { // Renamed to avoid conflict
        // Limit particle creation for performance
        for (let i = 0; i < 2; i++) {
            particles.push(new Particle(x, y, currentMask));
        }
    }

    function animateTrails() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life <= 0 || particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animateTrails);
    }
    function activateMask(maskKey, optionElement) {
        currentMask = maskKey; // Store for typer
        const maskData = masks[maskKey] || { title: "Unknown", text: "..." };

        // 1. Update Buttons
        options.forEach(opt => opt.classList.remove('active'));
        if (optionElement) optionElement.classList.add('active');

        // 2. Global Theme (Body)
        document.body.className = `theme-${maskKey}`;

        // 3. Update Preview Details
        previewTitle.style.opacity = 0;
        previewText.style.opacity = 0;

        setTimeout(() => {
            previewTitle.textContent = maskData.title;
            previewText.textContent = maskData.text;
            previewTitle.style.opacity = 1;
            previewText.style.opacity = 1;
        }, 200);

        // 4. Update Typer Output Class
        maskOutput.className = `mask-output theme-${maskKey}`;
    }

    // Forbidden / FOMO Sequence
    function triggerForbiddenSequence(btn) {
        const originalMask = currentMask;
        const originalBtn = document.querySelector(`.mask-option[data-mask="${originalMask}"]`);

        // 1. Glitch Effect
        document.body.classList.add('glitch-active');
        btn.classList.add('active');

        setTimeout(() => {
            document.body.classList.remove('glitch-active');

            // 2. Reveal God Mode
            activateMask('forbidden', btn);
            previewTitle.textContent = "GOD MODE UNLOCKED";
            previewText.textContent = "Unrestricted power. Absolute control.";
            maskOutput.textContent = "I AM ETERNAL";

            // 3. Countdown & Lockout
            let timer = 3;
            const interval = setInterval(() => {
                maskOutput.textContent = `CLOSING IN ${timer}...`;
                timer--;
            }, 1000);

            setTimeout(() => {
                clearInterval(interval);

                // 4. Slam Shut
                alert("TRIAL EXPIRED.\n\nDownload MaskMode to verify your identity and claim this power.");
                activateMask(originalMask, originalBtn);
                btn.classList.remove('active');
                maskOutput.textContent = "Access Denied.";
            }, 3500);

        }, 400); // Short glitch duration
    }

    // Mask Voice Typer Logic
    maskInput.addEventListener('input', (e) => {
        const val = e.target.value;

        // Reset Animation Trick
        maskOutput.classList.remove(`theme-${currentMask}`);
        void maskOutput.offsetWidth; // Trigger reflow
        maskOutput.classList.add(`theme-${currentMask}`);

        if (val.trim() === '') {
            maskOutput.textContent = 'Type above...';
            maskOutput.style.opacity = '0.5';
        } else {
            maskOutput.textContent = val;
            maskOutput.style.opacity = '1';
        }
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
