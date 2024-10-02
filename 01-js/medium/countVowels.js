/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    const vowels = str.split("").reduce((noOfVowels, char) => 
    "aeiouAEIOU".includes(char) ? noOfVowels + 1 : noOfVowels, 0)

    return vowels;
}

module.exports = countVowels;