// // Dynamic greeting
// function displayGreeting() {
//     const greetingElement = document.getElementById('greeting');
//     const hour = new Date().getHours();
//     let greeting = "Hello!";

//     if (hour < 12) greeting = "Good Morning!";
//     else if (hour < 18) greeting = "Good Afternoon!";
//     else greeting = "Good Evening!";

//     greetingElement.textContent = greeting;
// }

// // Basic frontend form validation
// function validateForm(event) {
//     const name = document.getElementById('id_name');
//     const email = document.getElementById('id_email');
//     const message = document.getElementById('id_message');

//     if (!name.value || !email.value || !message.value) {
//         alert('Please fill in all the fields.');
//         event.preventDefault();
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     displayGreeting();

//     const form = document.querySelector('.contact-form form');
//     if (form) {
//         form.addEventListener('submit', validateForm);
//     }
// });

// Dynamic greeting
function displayGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = "Hello!";

        if (hour < 12) greeting = "Good Morning!";
        else if (hour < 18) greeting = "Good Afternoon!";
        else greeting = "Good Evening!";

        greetingElement.textContent = greeting;
    } else {
        console.warn("Element with ID 'greeting' not found.");
    }
}

// Basic frontend form validation
function validateForm(event) {
    const name = document.getElementById('id_name');
    const email = document.getElementById('id_email');
    const message = document.getElementById('id_message');

    if (!name?.value || !email?.value || !message?.value) {
        alert('Please fill in all the fields.');
        event.preventDefault();
    }
}

// Smooth scroll handler (fixes offsetTop error)
function smoothScroll(event) {
    event.preventDefault();
    const targetID = this.getAttribute('href');
    if (!targetID || targetID === "#") {
        return;
    }

    const target = document.querySelector(targetID);
    if (target) {
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    } else {
        console.warn('Scroll target not found for selector:', targetID);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayGreeting();

    // Form submission handler
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', validateForm);
    } else {
        console.warn("Form element '.contact-form form' not found.");
    }


    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    links.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
});

