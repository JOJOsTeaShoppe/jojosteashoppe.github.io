const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 1; // Start at the first real slide (since we're duplicating slides)
let isTransitioning = false;
let autoSlideInterval;

// Duplicate first and last slides
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);

// Add the clones to the carousel
carousel.appendChild(firstSlideClone);
carousel.insertBefore(lastSlideClone, slides[0]);

// Update slides collection to include the cloned slides
const allSlides = document.querySelectorAll('.carousel-slide');

// Set up the initial slide position
updateCarousel();
startAutoSlide();

// Navigation Controls
prevButton.addEventListener('click', () => {
    if (isTransitioning) return;
    currentIndex--;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    if (isTransitioning) return;
    currentIndex++;
    updateCarousel();
});

// Auto-slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentIndex++;
        updateCarousel();
    }, 5000); // 5 seconds interval
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Function to update the carousel's position
function updateCarousel() {
    isTransitioning = true;
    const slideWidth = allSlides[0].clientWidth;
    const carouselWidth = document.querySelector('.carousel-container').clientWidth;
    const margin = parseInt(getComputedStyle(allSlides[0]).marginRight);

    // Calculate the total width of a slide (including margin)
    const totalWidth = slideWidth + margin;

    // Calculate the offset to center the current slide and show the previous/next slides
    const offset = (carouselWidth - slideWidth) / 2;

    // Update the transform to show the current slide
    carousel.style.transition = 'transform 0.5s ease';
    carousel.style.transform = `translateX(${offset - currentIndex * totalWidth}px)`;
    console.log(offset,currentIndex,totalWidth)

    // Check if we're at a cloned slide (first or last)
    carousel.addEventListener('transitionend', () => {
        if (currentIndex === 0) {
            // If we're at the clone of the last slide, jump to the real last slide
            currentIndex = allSlides.length - 2;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(${offset - currentIndex * totalWidth}px)`;
        } else if (currentIndex === allSlides.length - 1) {
            // If we're at the clone of the first slide, jump to the real first slide
            currentIndex = 1;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(${offset - currentIndex * totalWidth}px)`;
        }
        isTransitioning = false;
    });
}