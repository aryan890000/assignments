/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;

  if(len1 != len2) {
    return false;
  }

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  let freq1 = {};
  let freq2 = {};

  for (let i = 0; i < len1; i++) {
    freq1[str1[i]] === void 0 ? freq1[str1[i]] = 1 : freq1[str1[i]]++;
    freq2[str2[i]] === void 0 ? freq2[str2[i]] = 1 : freq2[str2[i]]++;
  }
  
  for(char of str1) {
    if(freq2[char] === void 0 || freq1[char] !== freq2[char]) {
      return false;
    }
  }

  return true;
}

module.exports = isAnagram;
