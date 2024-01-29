function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
}

document.getElementById("player-names").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    let names = [document.getElementById("player1Name").value, document.getElementById("player2Name").value];
    localStorage.setItem("names", JSON.stringify(names));
    navigateToPage('game.html')
  });