// Check Password (Simple Private Mode)
function checkPass() {
    var code = document.getElementById("secret-code").value;
    if (code === "143" || code.toLowerCase() === "love" || code.toLowerCase() === "kunjaaaa") {
        document.getElementById("login-screen").style.display = "none";
        // Play audio if available or start confetti
        setTimeout(fireConfettiBurst, 500);
    } else {
        var errorMsg = document.getElementById("error-msg");
        errorMsg.innerText = "Wrong Code! Hint: 143 or Kunjaaaa";
        errorMsg.style.display = "block";
    }
}

// Enter key support for login
document.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && document.getElementById("secret-code") && document.activeElement === document.getElementById("secret-code")) {
        checkPass();
    }
});

// Open Envelope (Reveal Letter)
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');

        // Shoot confetti from all sides to celebrate opening
        fireConfettiBurst();
    }
}

// Confetti Effect using canvas-confetti
function fireConfettiBurst() {
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
        origin: { x: 0, y: 0.8 } // Start from bottom left corner
    });
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
        origin: { x: 1, y: 0.8 } // Start from bottom right corner
    });
    fire(0.2, {
        spread: 60,
        origin: { x: 0.5, y: 0.5 } // Center burst
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        origin: { x: 0.5, y: 0.5 } // Center burst
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        origin: { x: 0.5, y: 0.5 } // Center burst
    });

    // Continuous side poppers
    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
    }, 500);
}

// Navigate to Love Page on "YES"
function handleYesClick(event) {
    if (event) event.stopPropagation(); // prevent closing if needed

    // More confetti!
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        window.location.href = 'love.html';
    }, 1000);
}

// "Shy" No Button - Moves away when hovered or clicked
function moveNoButton(btn) {
    // If it's not absolute yet, make it absolute so it can move freely
    if (btn.style.position !== 'absolute') {
        btn.style.position = 'absolute';
    }

    // Move to a random position within the letter boundaries
    // The letter container is relatively positioned
    // Use 10% to 80% to keep it somewhat inside
    const newLeft = Math.floor(Math.random() * 80 + 10) + '%';
    const newTop = Math.floor(Math.random() * 80 + 10) + '%';

    btn.style.left = newLeft;
    btn.style.top = newTop;
    btn.style.transform = 'none'; // reset transform if any from previous attempts

    // Optional: Change text slightly
    const texts = ["No", "Are you sure?", "Really?", "Think again!", "Be nice!", "Just click Yes!"];
    btn.innerText = texts[Math.floor(Math.random() * texts.length)];
}

// Initialize on page load
window.addEventListener('load', function () {
    const envelope = document.querySelector('.envelope');

    // Slight tilt effect on mousemove for premium feel
    document.addEventListener('mousemove', function (e) {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;

        if (envelope && !envelope.classList.contains('open')) {
            envelope.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        }
    });
});
