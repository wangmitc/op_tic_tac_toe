// Function to navigate to a different page
function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
}

// Event listener for clicks anywhere on the screen
document.addEventListener('click', function (event) {
    // Check if the clicked element is a link (a tag)
    if (event.target.tagName === 'A') {
        // If it's a link, let the default behavior happen
        return;
    }

    // URL of the page you want to navigate to
    navigateToPage('lobby.html');
});
