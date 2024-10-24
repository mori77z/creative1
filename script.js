const arrowLeft = document.querySelectorAll(".arrow_left");
const arrowRight = document.querySelectorAll(".arrow_right");
const images = document.querySelectorAll(".img-container img");
const carousel = document.querySelector('.carousel');
const carouselWrapper = document.querySelector('.carousel-wrapper');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const currentImageText = document.querySelector('.current-image');
const totalImagesText = document.querySelector('.total-images');

let currentImageIndex = 0;
const totalImages = images.length;

// Function to show the carousel and navigate to the clicked image
function showCarousel(index) {
    currentImageIndex = index;
    carousel.style.display = 'flex';
    totalImagesText.textContent = totalImages; // Update total images
    updateCarousel(); 
}

// Function to update carousel position
function updateCarousel() {
    const itemWidth = document.querySelector('.carousel-item').offsetWidth;
    const offset = -(currentImageIndex * (itemWidth + 20));
    carouselWrapper.style.transform = `translateX(${offset}px)`;

    // Update the current image text
    currentImageText.textContent = currentImageIndex + 1; // Update to 1-based index
}

// Event listeners for image clicks to open the carousel
images.forEach((img, index) => {
    img.addEventListener("click", () => showCarousel(index));
});

// Event listeners for carousel next/prev buttons
nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateCarousel();
});

// Close carousel when clicking outside the image
carousel.addEventListener('click', (e) => {
    if (e.target === carousel) {
        carousel.style.display = 'none';
    }
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
            info.style.fontSize = `${currentFontSize - 1}px`;
        } else {
            info.style.fontSize = `${originalFontSize}px`;
        }
    });
};

window.onload = resizeText; 
window.onresize = resizeText;