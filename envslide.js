let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    // Reset the index if it exceeds the number of slides
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Remove 'active' class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide and set the corresponding dot to active
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Change image every 2 seconds
    setTimeout(showSlides, 5000);
}


// Function to send the height of the content to the parent
function sendHeightToParent() {
    const height = document.body.scrollHeight;
    window.parent.postMessage({ shopSlideHeight: height }, '*');
}

// Call the function after the content is loaded
document.addEventListener('DOMContentLoaded', () => {
    sendHeightToParent();
});

// Call the function whenever content changes (e.g., dynamically loaded content)
const observer = new MutationObserver(() => {
    sendHeightToParent();
});

observer.observe(document.getElementById('slideshow-container'), { childList: true, subtree: true });
