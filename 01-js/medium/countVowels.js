/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    let vowels = ['a','e','i','o','u'];
    return str.toLowerCase().split("").filter(item => vowels.includes(item)).length;
}

module.exports = countVowels;