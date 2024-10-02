/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrome as 'N' and 'n' are considered case-insensitive.
*/

function isAlphabet(char) {
  return char.match(/[a-z]/) !== null;
}

function isPalindrome(str) {
  str = str.toLowerCase();
  
  let left = 0;
  let right = str.length - 1

  while(left < right) {
    while(left < right && !isAlphabet(str[left])) {
      left++;
    }

    while(left < right && !isAlphabet(str[right])) {
      right--;
    }

    if(left < right && str[left] !== str[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

module.exports = isPalindrome;
