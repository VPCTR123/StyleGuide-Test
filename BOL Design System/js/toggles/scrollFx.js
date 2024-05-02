window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var elements = document.querySelectorAll('.scroll-fx');

    // Loop through each element with the class ".scroll-fx"
    elements.forEach(function(element) {
        // Check if the scroll position is greater than 0
        if (scrollPosition > 0) {
            // Add a class to apply different styling
            element.classList.add('scrolled');
        } else {
            // Remove the class if scroll position is back to top
            element.classList.remove('scrolled');
        }
    });
});