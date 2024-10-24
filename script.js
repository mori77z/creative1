const nextButton = carousel.querySelector('.carousel-control.next');

let currentImageIndex = 0; // Index to track the current image in the carousel
const totalImages = images.length; // Total number of images in the carousel

// Function to fetch images from scroll sections and populate the carousel
function populateCarousel() {
    const scrollBoxes = document.querySelectorAll('.scroll-box');
