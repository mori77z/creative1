const arrowLeft = document.querySelectorAll(".arrow_left");
const arrowRight = document.querySelectorAll(".arrow_right");
const images = document.querySelectorAll(".img-container img"); // Image containers with fetched images
const overlay = document.getElementById("image-overlay");
const overlayImage = document.getElementById("overlay-image");
const closeOverlay = document.getElementById("close-overlay");
const prevImage = document.getElementById("prev-image");
const nextImage = document.getElementById("next-image");
const imageIndex = document.getElementById("image-index");
const carouselWrapper = document.querySelector('.carousel-wrapper');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentImageIndex;
let currentIndex = 0; // Index to track the current image in the carousel
const totalImages = images.length; // Total number of images in the carousel

// Function to open overlay when an image is clicked
function openOverlay(index) {
    currentImageIndex = index;
    overlayImage.src = images[index].src; // Set overlay image to the clicked image
    overlay.style.display = "flex"; // Show the overlay
    updateImageIndex();
}

// Function to update the image index in the overlay
function updateImageIndex() {
    const totalImagesInSection = images.length; // Total images for the current section
    imageIndex.textContent = `${currentImageIndex + 1} / ${totalImagesInSection}`; // Display current image index
}

// Event listener for closing the overlay
closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none"; // Hide the overlay when the close button is clicked
});

// Event listeners for next/prev buttons in the overlay
prevImage.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length; // Go to the previous image, loop back if needed
    overlayImage.src = images[currentImageIndex].src; // Set new image in the overlay
    updateImageIndex();
});

nextImage.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length; // Go to the next image, loop back if needed
    overlayImage.src = images[currentImageIndex].src; // Set new image in the overlay
    updateImageIndex();
});

// Function to update carousel position
function updateCarousel() {
    const itemWidth = document.querySelector('.carousel-item').offsetWidth; // Get the width of each carousel item
    const offset = -(currentIndex * (itemWidth + 20)); // Calculate the offset (including margins)
    carouselWrapper.style.transform = `translateX(${offset}px)`; // Move the carousel wrapper
}

// Event listeners for carousel next/prev buttons
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages; // Move to the next image, loop back if needed
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Move to the previous image, loop back if needed
    updateCarousel();
});

// Arrow scroll functionality for left/right arrows outside the carousel
arrowLeft.forEach(arrow => {
    arrow.addEventListener("click", function () {
        const scrollAmount = 300;
        const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

        if (parentContent && parentContent.classList.contains('content')) {
            parentContent.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    });
});

arrowRight.forEach(arrow => {
    arrow.addEventListener("click", function () {
        const scrollAmount = 300;
        const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

        if (parentContent && parentContent.classList.contains('content')) {
            parentContent.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
});

// Event listener for resizing text if there's overflow
const resizeText = () => {
    const infoElements = document.querySelectorAll('.info');
    infoElements.forEach(info => {
        const originalFontSize = 12;
        const currentFontSize = parseInt(window.getComputedStyle(info).fontSize);
        if (info.scrollHeight > info.clientHeight || info.scrollWidth > info.clientWidth) {
            info.style.fontSize = `${currentFontSize - 1}px`; // Reduce font size if overflow
        } else {
            info.style.fontSize = `${originalFontSize}px`; // Reset to original size
        }
    });
};

window.onload = resizeText; // Resize text on page load
window.onresize = resizeText; // Resize text when window is resized

// Event listener for opening overlay when images are clicked
images.forEach((img, index) => {
    img.addEventListener("click", () => openOverlay(index));
});