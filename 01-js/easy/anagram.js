/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1= str1.replace(/\s+/g, '').tolowerCase();
  str2= str2.replace(/\s+/g, '').tolowerCase();
  if(str1.length !== str2.length) return false;
  const cnt = {};

  for(const char of str2){
    if(!charCount[char]) return false;
    charCount[char]--;
  }

  return Object.values(charCount).every(count => count == 0);
}

module.exports = isAnagram;
