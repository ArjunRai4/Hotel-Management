const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function showItems(startIndex) {
    // Hide all items
    carouselItems.forEach(item => {
        item.classList.remove('active');
    });
    // Show two items starting from the given index
    for (let i = startIndex; i < startIndex + 2; i++) {
        if (i >= 0 && i < carouselItems.length) {
            carouselItems[i].classList.add('active');
        }
    }
}

function moveCarousel(direction) {
    currentIndex += direction;
    currentIndex = Math.max(0, Math.min(currentIndex, carouselItems.length - 2)); // Ensure currentIndex is within bounds
    showItems(currentIndex);
}

// Previous button functionality
document.getElementById('prevBtn').addEventListener('click', function() {
    moveCarousel(-1);
});

// Next button functionality
document.getElementById('nextBtn').addEventListener('click', function() {
    moveCarousel(1);
});

// Show the initial items
showItems(currentIndex);