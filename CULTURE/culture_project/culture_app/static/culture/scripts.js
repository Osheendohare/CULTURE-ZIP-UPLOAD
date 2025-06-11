// ----------------------------- Greeting Function -----------------------------
function displayGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;
    const currentHour = new Date().getHours();
    let greetingMessage;

    if (currentHour < 12) {
        greetingMessage = 'Good Morning!';
    } else if (currentHour < 18) {
        greetingMessage = 'Good Afternoon!';
    } else {
        greetingMessage = 'Good Evening!';
    }

    greetingElement.textContent = greetingMessage;
}

// --------------------------- Smooth Scroll Function --------------------------
function smoothScroll(event) {
    if (event.target.tagName !== 'A') return;
    const href = event.target.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    event.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
}

// ---------------------------- Form Validation -------------------------------
function validateForm(event) {
    const form = event.target;
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        event.preventDefault();
    }
}

// --------------------------- Carousel Logic ----------------------------------
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;
    let autoplayInterval;

    if (!carousel || images.length === 0 || !prevButton || !nextButton) return;

    function moveCarousel() {
        const imageWidth = images[0].clientWidth;
        carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % images.length;
        moveCarousel();
    }

    function goToPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        moveCarousel();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(goToNext, 3000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    nextButton.addEventListener('click', () => {
        stopAutoplay();
        goToNext();
        startAutoplay();
    });

    prevButton.addEventListener('click', () => {
        stopAutoplay();
        goToPrev();
        startAutoplay();
    });

    window.addEventListener('resize', moveCarousel);

    moveCarousel();
    startAutoplay();
}

// ---------------------- Constitution Topics Wheel ----------------------------
// function initWheel() {
//     const canvas = document.getElementById('wheel');
//     const ctx = canvas?.getContext('2d');
//     const spinButton = document.getElementById('spin-button');
//     const resultDiv = document.getElementById('result');

//     if (!canvas || !ctx || !spinButton || !resultDiv) return;

//     const topics = [
//         'Parliament Structure',
//         'How a Bill Becomes a Law',
//         'Powers of the President',
//         'Judicial Review',
//         'Fundamental Rights',
//         'Directive Principles',
//         'State Legislature',
//         'Union Executive'
//     ];
//     const colors = ['#f39c12', '#d35400', '#c0392b', '#27ae60', '#2980b9', '#8e44ad', '#16a085', '#f1c40f'];

//     const wheel = {
//         startAngle: 0,
//         arc: Math.PI / (topics.length / 2),
//         spinTime: 0,
//         spinTimeTotal: 0,
//         spinAngleStart: 0,
//     };

//     function drawWheel() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         for (let i = 0; i < topics.length; i++) {
//             const angle = wheel.startAngle + i * wheel.arc;
//             ctx.fillStyle = colors[i % colors.length];
//             ctx.beginPath();
//             ctx.moveTo(200, 200);
//             ctx.arc(200, 200, 200, angle, angle + wheel.arc, false);
//             ctx.lineTo(200, 200);
//             ctx.fill();

//             ctx.save();
//             ctx.fillStyle = '#fff';
//             ctx.translate(
//                 200 + Math.cos(angle + wheel.arc / 2) * 150,
//                 200 + Math.sin(angle + wheel.arc / 2) * 150
//             );
//             ctx.rotate(angle + wheel.arc / 2 + Math.PI / 2);
//             ctx.fillText(topics[i], -ctx.measureText(topics[i]).width / 2, 0);
//             ctx.restore();
//         }

//         // Draw arrow
//         ctx.fillStyle = '#e74c3c';
//         ctx.beginPath();
//         ctx.moveTo(190, 10);
//         ctx.lineTo(210, 10);
//         ctx.lineTo(200, 40);
//         ctx.fill();
//     }

//     function easeOut(t, b, c, d) {
//         const ts = (t /= d) * t;
//         const tc = ts * t;
//         return b + c * (tc + -3 * ts + 3 * t);
//     }

//     function rotateWheel() {
//         wheel.spinTime += 30;
//         if (wheel.spinTime >= wheel.spinTimeTotal) {
//             stopRotateWheel();
//             return;
//         }
//         const spinAngle = wheel.spinAngleStart - easeOut(wheel.spinTime, 0, wheel.spinAngleStart, wheel.spinTimeTotal);
//         wheel.startAngle += spinAngle * Math.PI / 180;
//         drawWheel();
//         requestAnimationFrame(rotateWheel);
//     }

//     function stopRotateWheel() {
//         const degrees = wheel.startAngle * 180 / Math.PI + 90;
//         const index = Math.floor((360 - degrees % 360) / (360 / topics.length));
//         resultDiv.innerText = `You got: ${topics[index]}`;
//     }

//     function spin() {
//         wheel.spinAngleStart = Math.random() * 100 + 50;
//         wheel.spinTime = 0;
//         wheel.spinTimeTotal = Math.random() * 3000 + 4000;
//         rotateWheel();
//     }

//     spinButton.addEventListener('click', spin);
//     drawWheel();
// }

// --------------------------- Comment Section -------------------------------
function initComments() {
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('commentsContainer');
    const charCount = document.getElementById('charCount');
    const commentText = document.getElementById('commentText');

    if (!commentForm || !commentsContainer || !charCount || !commentText) return;

    commentText.addEventListener('input', () => {
        charCount.textContent = `${commentText.value.length}/300`;
    });

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const text = commentText.value.trim();
        const imageInput = document.getElementById('commentImage');
        const imageFile = imageInput?.files[0];

        if (!text) {
            alert("Please write a comment before submitting.");
            return;
        }

        const comment = document.createElement('div');
        comment.classList.add('comment');

        const textEl = document.createElement('p');
        textEl.textContent = text;
        comment.appendChild(textEl);

        // const likeBtn = document.createElement('button');
        // likeBtn.textContent = "Like";
        // likeBtn.classList.add('like-button');
        // comment.appendChild(likeBtn);

        // likeBtn.addEventListener('click', () => {
        //     likeBtn.textContent = "Liked!";
        //     comment.classList.add('like-animation');
        //     setTimeout(() => comment.classList.remove('like-animation'), 300);
        // });

        if (commentImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.classList.add('comment-image'); 
                comment.appendChild(imgElement);
            };
            reader.readAsDataURL(commentImage);
        }

        commentsContainer.appendChild(comment);
        setTimeout(() => {
            comment.style.opacity = '1';
            comment.style.transform = 'translateY(0)';
        }, 50);

        comment.scrollIntoView({ behavior: 'smooth' });
        commentForm.reset();
        charCount.textContent = "0/300";
    });
}

// --------------------------- Initialize All -------------------------------
document.addEventListener('DOMContentLoaded', () => {
    displayGreeting();
    document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', smoothScroll));

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) contactForm.addEventListener('submit', validateForm);

    initCarousel();
    // initWheel();
    initComments();
});




