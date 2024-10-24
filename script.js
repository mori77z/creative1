// Selectors for the carousel and controls
const arrowLeft = document.querySelectorAll(".arrow_left");
const arrowRight = document.querySelectorAll(".arrow_right");
const images = document.querySelectorAll(".img-container img"); // Image containers with fetched images
const carousel = document.querySelector('.carousel');
const carouselWrapper = document.querySelector('.carousel-wrapper');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');

let currentImageIndex = 0; // Index to track the current image in the carousel
const totalImages = images.length; // Total number of images in the carousel

// Function to show carousel and navigate to the clicked image
function showCarousel(index) {
    currentImageIndex = index; // Update the current image index
    carousel.style.display = 'flex'; // Show the carousel
    updateCarousel(); // Update carousel position
}

// Function to update carousel position
function updateCarousel() {
    const itemWidth = document.querySelector('.carousel-item').offsetWidth; // Get the width of each carousel item
    const offset = -(currentImageIndex * (itemWidth + 20)); // Calculate the offset (including margins)
    carouselWrapper.style.transform = `translateX(${offset}px)`; // Move the carousel wrapper
}

// Function to navigate to the next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages; // Move to the next image, loop back if needed
    updateCarousel();
}

// Function to navigate to the previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages; // Move to the previous image, loop back if needed
    updateCarousel();
}

// Event listeners for image clicks to open the carousel
images.forEach((img, index) => {
    img.addEventListener("click", () => showCarousel(index));
});

// Event listeners for carousel next/prev buttons
nextButton.addEventListener('click', nextImage);
prevButton.addEventListener('click', prevImage);

// Close carousel when clicking outside the image
carousel.addEventListener('click', (e) => {
    if (e.target === carousel) {
        carousel.style.display = 'none'; // Hide the carousel when clicking outside the images
    }
});

// Arrow scroll functionality for left/right arrows outside the carousel
const scrollContent = (direction) => {
    const scrollAmount = 300;
    arrowLeft.forEach(arrow => {
        const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;
        if (parentContent && parentContent.classList.contains('content')) {
            parentContent.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        }
    });
};

arrowLeft.forEach(arrow => {
    arrow.addEventListener("click", () => scrollContent(-1)); // Scroll left
});

arrowRight.forEach(arrow => {
    arrow.addEventListener("click", () => scrollContent(1)); // Scroll right
});

// Function to resize text if there's overflow
const resizeText = () => {
    const infoElements = document.querySelectorAll('.info');
    infoElements.forEach(info => {
        const originalFontSize = 12;
        let currentFontSize = parseInt(window.getComputedStyle(info).fontSize);

        // Reduce font size if overflow
        while (info.scrollHeight > info.clientHeight || info.scrollWidth > info.clientWidth) {
            currentFontSize--;
            info.style.fontSize = `${currentFontSize}px`;
            if (currentFontSize <= 8) break; // Stop reducing if font size is too small
        }

        // Reset to original size if no overflow
        if (currentFontSize === originalFontSize) {
            info.style.fontSize = `${originalFontSize}px`;
        }
    });
};

window.onload = resizeText; // Resize text on page load
window.onresize = resizeText; // Resize text when window is resized