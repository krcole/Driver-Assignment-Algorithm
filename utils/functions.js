const fs = require("fs");

// Function to read a file and return its contents as a promise
const fn_readFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // Split file content into lines and trim each line
      const lines = data.split("\n").map((line) => line.trim());

      // Return array of lines
      resolve(lines);
    });
  });
};

// Function to count the number of consonants in a string
const fn_isStringLengthEven = (str) => {
  return str.length % 2 === 0;
};

// Function to count the number of consonants in a string
const fn_countConsonants = (str) => {
  // Define a regular expression to match consonants (non-vowels)
  const consonantsRegex = /[bcdfghjklmnpqrstvwxyz]/gi;
  // Match all consonants in the string and return the count
  const consonants = str.toLowerCase().match(consonantsRegex);
  return consonants ? consonants.length : 0;
};

// Function to count the number of vowels in a string
const fn_countVowels = (str) => {
  // Define a regular expression to match vowels
  const vowelsRegex = /[aeiou]/gi;
  // Match all vowels in the string and return the count
  const vowels = str.toLowerCase().match(vowelsRegex);
  return vowels ? vowels.length : 0;
};

// Function to calculate suitability score based on street name and driver name
const fn_calculateSuitabilityScore = (streetName, driver) => {
  if (fn_isStringLengthEven(streetName)) {
    const vowels = fn_countVowels(driver);
    return vowels * 1.5;
  } else {
    const consonats = fn_countConsonants(driver);
    return consonats;
  }
};

// Function to check if two numbers have common factors
const fn_haveCommonFactors = (a, b) => {
  for (let i = 2; i <= Math.min(a, b); i++) {
    if (a % i === 0 && b % i === 0) {
      return true;
    }
  }
  return false;
};

// Function to find the object with the highest score
const fn_findHighestScoringObject = (objects) => {
  let highestScoreObject = null;
  let highestScore = -Infinity;

  objects.forEach((obj) => {
    if (obj.score > highestScore) {
      highestScore = obj.score;
      highestScoreObject = obj;
    }
  });

  return highestScoreObject;
};

// Function to parse street name from full address
const fn_parseStreetName = (fullAddress) => {
  // Get the address from the full address
  const address = fullAddress.split(",")[0];

  // Find the index of the first space
  const firstSpaceIndex = address.indexOf(" ");

  // Extract the substring starting from the character after the first space
  const streetName = address.substring(firstSpaceIndex + 1).trim();

  // Return the street name
  return streetName;
};

module.exports = {
  fn_readFile,
  fn_isStringLengthEven,
  fn_countConsonants,
  fn_countVowels,
  fn_haveCommonFactors,
  fn_findHighestScoringObject,
  fn_calculateSuitabilityScore,
  fn_parseStreetName,
};
