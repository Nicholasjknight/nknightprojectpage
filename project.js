// Search form input event listener (real-time predictive search)
document.getElementById('searchInput').addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase(); // Get the search query and convert to lowercase
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = ''; // Clear previous results

    if (query) {
        // Initialize variables for storing results
        let searchResultCount = 0;
        const uniqueResults = new Set(); // Set to ensure no duplicates

        // Select only <h1>, <h2>, and <p> elements for searching
        const elementsToSearch = document.querySelectorAll('h1, h2, p');

        elementsToSearch.forEach((element, elementIndex) => {
            const elementText = element.innerText.toLowerCase(); // Get the text content of the element
            const regex = new RegExp(`\\b(${query}\\w*)`, 'gi'); // Match words starting with the query

            const matches = [...elementText.matchAll(regex)]; // Find all matches in the element

            if (matches.length > 0) {
                matches.forEach((match) => {
                    const matchText = match[0];
                    const matchIndex = match.index;

                    // Get the context with a 60 character limit after the match
                    const context = getContextWithLimit(elementText, matchIndex, matchText, 60);

                    // If the context is unique and valid, add it to the result
                    if (!uniqueResults.has(context) && context) {
                        uniqueResults.add(context);

                        // Create result item and add it to the dropdown
                        const resultItem = document.createElement('div');
                        resultItem.className = 'result-item';
                        resultItem.innerHTML = `<a href="#element${elementIndex}" onclick="scrollToElement(${elementIndex});">${context}</a>`;

                        // Append the result item to the container
                        searchResultsContainer.appendChild(resultItem);

                        searchResultCount++;
                    }
                });
            }
        });

        if (searchResultCount > 0) {
            // Total results at the bottom of the dropdown
            const totalResults = document.createElement('div');
            totalResults.className = 'total-results';
            totalResults.innerText = `Total results: ${searchResultCount}`;
            searchResultsContainer.appendChild(totalResults);

            // close button to the top-right
            const closeButton = document.createElement('button');
            closeButton.className = 'close-results';
            closeButton.innerHTML = 'X';
            closeButton.onclick = () => hideSearchResults();
            searchResultsContainer.appendChild(closeButton);

            // Show dropdown results
            searchResultsContainer.style.display = 'block';
        } else {
            searchResultsContainer.style.display = 'none';
        }
    } else {
        // Hide dropdown if the search is cleared
        searchResultsContainer.style.display = 'none';
    }
});

// Function to get context around the search match with a character limit
function getContextWithLimit(text, matchIndex, matchText, charLimit) {
    const snippet = text.slice(matchIndex); // Get the text after the match
    const contextEndIndex = snippet.indexOf(' ', charLimit); // Find where to cut off the context

    // Slice the context to the proper length and append ellipsis if necessary
    const context = (contextEndIndex !== -1) ? snippet.slice(0, contextEndIndex) : snippet.slice(0, charLimit);

    // Return the context with ellipsis if it's longer than charLimit
    return (context.length >= charLimit) ? context.slice(0, charLimit) + '...' : context;
}

// Function to scroll to a specific element by its index
function scrollToElement(elementIndex) {
    const element = document.querySelectorAll('h1, h2, p')[elementIndex]; // Find the element by index
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Scroll to the element
    }
    hideSearchResults(); // Hide the search results when clicking
}

// Function to hide the search results dropdown
function hideSearchResults() {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.style.display = 'none'; // Hide the results
}

// Function to show the search results (called when user starts typing)
function showSearchResults() {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.style.display = 'block'; // Show the results
}

// Show the search results again when typing
document.getElementById('searchInput').addEventListener('focus', function() {
    showSearchResults();
});

function scrollToTop() {
    window.scrollTo(0, 0);
}

window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const rotatingBackground = document.querySelector('.rotating-background');
    const currentRotation = parseFloat(rotatingBackground.style.transform.match(/rotate\((-?\d+\.?\d*)deg\)/)[1]);
    const currentScale = parseFloat(rotatingBackground.style.transform.match(/scale\((-?\d+\.?\d*)\)/)[1]);

    if (currentRotation >= 350.6 && currentScale >= 2.753) {
        rotatingBackground.style.animation = 'none';
    } else {
        rotatingBackground.style.animation = 'spinZoom 20s linear infinite';
    }

    rotatingBackground.style.transform = `scale(${1 + scrolled / 1000}) rotate(${scrolled / 5}deg)`;

    document.querySelectorAll('.parallax').forEach(parallax => {
        parallax.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
});

// Function to play video when clicked
function playVideo(event, videoSrc) {
    event.preventDefault(); // Prevent any default link behavior
    const videoElement = document.getElementById("main_video");
    videoElement.src = videoSrc;
    videoElement.play();
  }
// Toggle hamburger menu for smaller screens
document.querySelector(".hamburger-menu").addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const hamburgerIcon = hamburgerMenu.querySelector(".hamburger-icon");
    const closeIcon = hamburgerMenu.querySelector(".close-icon");

    // Toggle navigation visibility
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none"; // Hide the nav links
        hamburgerIcon.style.display = "block"; // Show hamburger icon
        closeIcon.style.display = "none"; // Hide close icon
    } else {
        navLinks.style.display = "flex"; // Show the nav links
        hamburgerIcon.style.display = "none"; // Hide hamburger icon
        closeIcon.style.display = "block"; // Show close icon
    }
});


//IOS & Safari Checker
 function isIOSorSafari() {
        var userAgent = window.navigator.userAgent;

        // Check for iOS
        var iOS = !!userAgent.match(/iPad|iPhone|iPod/i);

        // Check for Safari
        var safari = /^((?!chrome|android).)*safari/i.test(userAgent);

        return iOS || safari;
    }

    // Apply background scroll for iOS and Safari
    if (isIOSorSafari()) {
        document.querySelectorAll('.parallax').forEach(function(parallaxSection) {
            parallaxSection.style.backgroundAttachment = 'scroll';
        });
    }

