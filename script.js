document.addEventListener("DOMContentLoaded", function () {
    const arrows = document.querySelectorAll(".arrow");
    const navLinks = document.querySelectorAll(".nav-link");
    const logo = document.getElementById('logo');
    const header = document.querySelector('header');

    // Arrow scroll functionality
    arrows.forEach(arrow => {
        arrow.addEventListener("click", function () {
            const isLeft = arrow.classList.contains('arrow_left');
            const isRight = arrow.classList.contains('arrow_right');
            const scrollAmount = 300;

            const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

            if (parentContent && parentContent.classList.contains('content')) {
                if (isLeft) {
                    parentContent.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else if (isRight) {
                    parentContent.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        });
    });

    // Change font on active link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(nav => nav.classList.remove('active')); // Remove active class from all links
            link.classList.add('active'); // Add active class to clicked link

            if (link.dataset.font === 'georgia') {
                logo.classList.add('georgia'); // Apply Georgia to logo
                header.classList.add('georgia'); // Apply Georgia to header
            } else {
                logo.classList.remove('georgia'); // Revert to default font
                header.classList.remove('georgia'); // Revert header to default
            }
        });
    });
});