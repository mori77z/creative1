const arrowLeft = document.querySelectorAll(".arrow_left");
const arrowRight = document.querySelectorAll(".arrow_right");
const images = document.querySelectorAll(".img-container img");
const overlay = document.getElementById("image-overlay");
const overlayImage = document.getElementById("overlay-image");
const closeOverlay = document.getElementById("close-overlay");
const prevImage = document.getElementById("prev-image");
const nextImage = document.getElementById("next-image");
const imageIndex = document.getElementById("image-index");

let currentImageIndex;

// Function to open overlay
function openOverlay(index) {
    currentImageIndex = index;
    overlayImage.src = images[index].src;
    overlay.style.display = "flex";
    updateImageIndex();
}

// Function to update image index (show remaining images in current section)
function updateImageIndex() {
    const totalImagesInSection = images.length; // total images in the current section
    imageIndex.textContent = `${currentImageIndex + 1} / ${totalImagesInSection}`;
}

// Event listener for images
images.forEach((img, index) => {
    img.addEventListener("click", () => openOverlay(index));
});

// Event listeners for closing overlay
closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
});

// Event listeners for next/prev buttons
prevImage.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    overlayImage.src = images[currentImageIndex].src;
    updateImageIndex();
});

nextImage.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    overlayImage.src = images[currentImageIndex].src;
    updateImageIndex();
});

// Arrow scroll functionality
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

// Resize text if overflow
const resizeText = () => {
    const infoElements = document.querySelectorAll('.info');
    infoElements.forEach(info => {
        const originalFontSize = 12;
        const currentFontSize = parseInt(window.getComputedStyle(info).fontSize);
        if (info.scrollHeight > info.clientHeight || info.scrollWidth > info.clientWidth) {
            info.style.fontSize = `${currentFontSize - 1}px`; // Reduce font size
        } else {
            info.style.fontSize = `${originalFontSize}px`; // Reset to original
        }
    });
};

window.onload = resizeText; // Resize text on load
window.onresize = resizeText; // Resize text on window resize