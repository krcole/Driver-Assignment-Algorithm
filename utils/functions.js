const fs = require("fs");

// Function to read a file and return its contents as a promise
const fn_readFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // Split file content into lines
      const lines = data.split("\n").map((line) => line.trim());

      // Convert lines to objects
      const objectsArray = lines.map((line) => {
        return line;
      });

      resolve(objectsArray);
    });
  });
};

// Function to check if a number is even
const fn_isEven = (address) => {
  // Extract the number from the address
  const number = parseInt(address.match(/\d+/)[0]);
  // Check if the number is even
  return number % 2 === 0;
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

module.exports = {
  fn_readFile,
  fn_isEven,
  fn_countConsonants,
  fn_countVowels,
  fn_haveCommonFactors,
  fn_findHighestScoringObject,
};
