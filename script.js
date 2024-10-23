document.addEventListener("DOMContentLoaded", function () {
    const arrows = document.querySelectorAll(".arrow");
    const navLinks = document.querySelectorAll(".nav-link");
    const logo = document.getElementById('logo');
    const header = document.querySelector('header');
    const scrollBoxes = document.querySelectorAll('.scroll-box');

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

            // Set creative tab as active
            if (link.textContent === "Creative") {
                link.classList.add('active'); // Ensure 'Creative' link is styled as active
            }

            logo.classList.toggle('georgia', link.textContent === 'Creative'); // Apply Georgia to logo
            header.classList.toggle('georgia', link.textContent === 'Creative'); // Apply Georgia to header
        });
    });

    // Image overlay gallery functionality
    scrollBoxes.forEach(scrollBox => {
        const images = scrollBox.querySelectorAll('.img-container img');
        images.forEach((img, index) => {
            img.addEventListener('click', function () {
                openOverlayGallery(images, index);
            });
        });
    });

    function openOverlayGallery(images, currentIndex) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `
            <span class="close">&times;</span>
            <div class="overlay-content">
                <img src="${images[currentIndex].src}" alt="Overlay Image">
                <div class="overlay-navigation">
                    <span class="nav prev">&lt;</span>
                    <span class="image-index">${currentIndex + 1} / ${images.length}</span>
                    <span class="nav next">&gt;</span>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Close overlay
        overlay.querySelector('.close').onclick = function () {
            overlay.remove();
        };

        // Navigation for overlay images
        overlay.querySelector('.prev').onclick = function () {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateOverlayImage(images, currentIndex, overlay);
        };

        overlay.querySelector('.next').onclick = function () {
            currentIndex = (currentIndex + 1) % images.length;
            updateOverlayImage(images, currentIndex, overlay);
        };
    }

    function updateOverlayImage(images, index, overlay) {
        const overlayImg = overlay.querySelector('img');
        const indexDisplay = overlay.querySelector('.image-index');
        overlayImg.src = images[index].src;
        indexDisplay.textContent = `${index + 1} / ${images.length}`;
    }
});