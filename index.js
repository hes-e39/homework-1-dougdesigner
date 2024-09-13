import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */
const fetchColors = ({ name, hex, compName, compHex }) => {
  // Fetch colors data from the COLORS URL
  return fetch(COLORS)
    // Parse the JSON response
    .then(res => res.json())
    // Filter the colors based on the parameters
    .then(colors => {
        if (name) {
          return colors.filter(color => color.name.toLowerCase().includes(name.toLowerCase()));
        } else if (hex) {
          return colors.filter(color => color.hex.includes(hex));
        } else if (compName) {
          // Iterate through the comp array and check if it includes the compName
          return colors.filter(color => color.comp.some(comp => comp.name.toLowerCase().includes(compName.toLowerCase())));
        } else if (compHex) {
          // Iterate through the comp array and check if it includes the compHex
          return colors.filter(color => color.comp.some(comp => comp.hex.includes(compHex)));
        }
    })
};

// Leave this here
export default fetchColors;
