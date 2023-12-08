/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrome as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let revStr = "" ;
  for(let i = str.length - 1; i >= 0; i--){
    revStr += str[i]
  }

  if(str.replace(/[^A-Za-z0-9]/g, '').toLowerCase() === revStr.replace(/[^A-Za-z0-9]/g, '').toLowerCase()) return true;
  else{
    return false
  }
}

module.exports = isPalindrome;
