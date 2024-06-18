// Map each letter to a hex color code
var colorMap = {
    'A': '#97a97c', 
    'B': '#718355', 
    'C': '#a4b092', 
    'D': '#7e7b78', 
    'E': '#999491', 
    'F': '#b9b3af', 
    'G': '#014f86', 
    'H': '#2c7da0', 
    'I': '#468faf',
    'J': '#97a97c',
    'K': '#718355', 
    'L': '#a4b092', 
    'M': '#7e7b78', 
    'N': '#999491', 
    'O': '#b9b3af', 
    'P': '#014f86', 
    'Q': '#2c7da0', 
    'R': '#468faf', 
    'S': '#97a97c', 
    'T': '#718355', 
    'U': '#a4b092', 
    'V': '#7e7b78', 
    'W': '#999491', 
    'X': '#b9b3af', 
    'Y': '#014f86', 
    'Z': '#2c7da0', 
    ' ': '#468faf',
    '/': '#97a97c',
  };
  
// Select all div elements with class "thumb" and id "appColorTile"
var appColorTiles = document.querySelectorAll('.thumb#appColorTile');

// Loop through each div and set its background color based on the third letter of the nearest h5 tag below it
appColorTiles.forEach(function(tile) {
  var h5Tag = tile.nextElementSibling.querySelector('h5');
  if (h5Tag) {
    var text = h5Tag.textContent.trim();
    var thirdLetter = text.charAt(2).toUpperCase(); // Get the third letter and convert it to uppercase
    var color = colorMap[thirdLetter];
    if (color) {
      tile.style.backgroundColor = color;
    }
  }
});