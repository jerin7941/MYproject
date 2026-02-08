// Array of images
const images = [
    'https://img.sanishtech.com/u/7c82d6c44696d796334d895046255037.jpg',
    'https://img.sanishtech.com/u/724364166c4775eeb0785f4b78e29be8.jpg',
    'https://img.sanishtech.com/u/c6c9b22b7f7124a8ebe9827b9a22e4a1.jpg',
    'https://img.sanishtech.com/u/0e2ea928177b0532b8f6e96edf7e9ffe.jpg',
    'https://img.sanishtech.com/u/290132f314ae988502fac3b7b26ef7de.jpg',
    'https://img.sanishtech.com/u/986ec8eea0da7178867e3698e8ced43e.jpg',
    'https://img.sanishtech.com/u/c6d83d989ba46e16590f653772e7f1d1.jpg'
];

// Shuffle Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Randomize Gallery Images
function randomizeGallery() {
    const cards = document.querySelectorAll('.photo-card img');
    // Create a copy to shuffle
    const shuffledImages = [...images];
    shuffleArray(shuffledImages);

    cards.forEach((img, index) => {
        // Use modulus to loop if there are more cards than images
        img.src = shuffledImages[index % shuffledImages.length];
    });
}

// Confetti Configuration
function fireConfetti() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

// Open Zoom Modal
function openZoom(card) {
    const modal = document.getElementById('zoomModal');
    const zoomImg = document.getElementById('zoomImage');
    const imgSrc = card.querySelector('img').src;

    zoomImg.src = imgSrc;
    modal.classList.add('active');

    // Trigger Intense Love Confetti
    fireLoveConfetti();

    // Also trigger some hearts raining down
    createRainingHearts();
}

// Intense Love Confetti
function fireLoveConfetti() {
    var count = 300;
    var defaults = {
        origin: { y: 0.5 },
        shapes: ['heart'],
        colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#C71585']
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 60, startVelocity: 55, scalar: 2 });
    fire(0.2, { spread: 100, scalar: 3 });
    fire(0.35, { spread: 120, decay: 0.91, scalar: 2.5 });
    fire(0.1, { spread: 150, startVelocity: 35, decay: 0.92, scalar: 2 });

    // Second burst
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.6 },
            shapes: ['heart'],
            colors: ['#FF0000', '#FFFFFF', '#FF69B4']
        });
    }, 300);
}

// Close Zoom Modal
function closeZoom() {
    const modal = document.getElementById('zoomModal');
    modal.classList.remove('active');
}

// Raining Hearts Effect
function createRainingHearts() {
    const container = document.querySelector('.zoom-content');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-50px';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.zIndex = '1002';
            heart.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

// Add animation keyframes for falling hearts if not present
if (!document.querySelector('#heart-style')) {
    const style = document.createElement('style');
    style.id = 'heart-style';
    style.innerHTML = `
        @keyframes fall {
            to { transform: translateY(110vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Heart cursor trail (Restored)
const heartCursorTrail = {
    mouseX: 0,
    mouseY: 0,
    hearts: [],
    heartEmojis: ['❤️', '💕', '💖', '💗', '💝', '💓', '💞', '💘'],
    lastTime: 0,

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            // Create hearts more frequently for smooth trail
            const now = Date.now();
            if (now - this.lastTime > 25) {
                this.createHeartCursor();
                this.lastTime = now;
            }
        });
    },

    createHeartCursor() {
        const heart = document.createElement('div');
        heart.className = 'heart-cursor-trail';
        heart.textContent = this.heartEmojis[Math.floor(Math.random() * this.heartEmojis.length)];
        heart.style.left = this.mouseX + 'px';
        heart.style.top = this.mouseY + 'px';

        // Random spread direction
        const angle = Math.random() * Math.PI * 2;
        const distance = 15 + Math.random() * 25;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        heart.style.setProperty('--offsetX', offsetX + 'px');
        heart.style.setProperty('--offsetY', offsetY + 'px');

        document.body.appendChild(heart);
        this.hearts.push(heart);

        // Keep maximum 50 hearts
        if (this.hearts.length > 50) {
            const oldHeart = this.hearts.shift();
            oldHeart.remove();
        }

        // Auto remove
        setTimeout(() => {
            if (heart.parentNode) heart.remove();
            const index = this.hearts.indexOf(heart);
            if (index > -1) this.hearts.splice(index, 1);
        }, 1000);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Randomize images on load
    // randomizeGallery(); // Disabled to keep fixed positions

    heartCursorTrail.init();

    // Background hearts (Restored)
    const backgroundHearts = document.querySelector('.background-hearts');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝'];

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('background-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        heart.style.opacity = '0.3';
        heart.style.animation = `floatHeart ${Math.random() * 5 + 5}s infinite ease-in-out`;
        backgroundHearts.appendChild(heart);
    }
});
