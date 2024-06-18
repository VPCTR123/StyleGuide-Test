// Function to map letters to colors
function mapLetterToColor(letter) {
    // Define color mappings
    const colorMap = {
        A: '#003b49',
        B: '#1d4289',
        C: '#d3273e',
        D: '#dc582a',
        E: '#1b365d',
        F: '#5d3754',
        G: '#007a78',
        H: '#003b49',
        I: '#1d4289',
        J: '#dc582a',
        K: '#1b365d',
        L: '#5d3754',
        M: '#007a78',
        N: '#003b49',
        O: '#1d4289',
        P: '#dc582a',
        Q: '#1b365d',
        R: '#5d3754',
        S: '#007a78',
        T: '#003b49',
        U: '#1d4289',
        V: '#dc582a',
        W: '#1b365d',
        X: '#5d3754',
        Y: '#007a78',
        Z: '#003b49',
        // Add more mappings as needed
    };

    // Return color for the given letter, default to black if not found
    return colorMap[letter.toUpperCase()] || '#000000'; // Default to black
}

// Get the user name from the element with class "user-name"
const userNameElement = document.querySelector('.user-name');
const userName = userNameElement.textContent.trim();

// Get the first letter of the user's name and map it to a color
const firstLetter = userName.charAt(0).toUpperCase(); // Capitalize the first initial
const color = mapLetterToColor(firstLetter);

// Set the CSS variable --userColor to the mapped color
document.documentElement.style.setProperty('--userColor', color);

// Set the first letter of the user's name in elements with the class "user-first-initial" (always capitalized)
const userFirstInitialElements = document.querySelectorAll('.user-first-initial');
userFirstInitialElements.forEach(userFirstInitialElement => {
    userFirstInitialElement.textContent = firstLetter;
});
const userFullNameElements = document.querySelectorAll('.user-full-name');
userFullNameElements.forEach(userFullNameElement => {
    userFullNameElement.textContent = userName;
});