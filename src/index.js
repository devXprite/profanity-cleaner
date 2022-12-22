/* eslint-disable max-len */
const defaultBadWords = require('./badWords.json');

/**
 * A function to censor bad words in a given text.
 *
 * @param {string} text - The input text to be censored.
 * @param {Object} [option={}] - The options object for censoring the text.
 * @param {string} [options.placeholder='*'] - The character to replace bad words with.
 * @param {boolean} [options.caseSensitive=false] - Whether to consider the case of the words while censoring.
 * @param {boolean} [options.wholeWordsOnly=true] - Whether to consider only whole words while censoring.
 * @param {string[]} [options.exceptions=[]] - An array of words that should not be censored.
 * @param {boolean} [options.keepFirstAndLastChar=false] - Whether to keep the first and last characters of the bad words while censoring.
 * @param {function} [options.customReplacement=null] - A custom function to replace bad words. The function should take in a single argument (the bad word) and return the replacement string.
 * @param {boolean} [options.replacePartialWords=false] - Whether to consider partial words while censoring.
 * @param {boolean} [options.includePunctuation=false] - Whether to keep the punctuation at the beginning and end of the bad words while censoring.
 * @param {number} [options.minimumWordLength=1] - The minimum length of a word that should be censored.
 * @param {function} [options.customMatch=null] - A custom function to decide which words should be censored. The function should take in a single argument (the bad word) and return a boolean value indicating whether the word should be censored.
 * @param {string[]} [options.customBadWords=[]] - An array of additional bad words to censor.
 * @returns {string} The censored text.
 *
 * @example
 *
 * const cleanText = clean('This fucking example.');
 * console.log(cleanText); // Output: "This ******* example."
 */

function clean(text, options = {}) {
  // Set default options
  const defaultOptions = {
    placeholder: '*',
    caseSensitive: false,
    wholeWordsOnly: true,
    exceptions: [],
    keepFirstAndLastChar: false,
    customReplacement: null,
    replacePartialWords: false,
    includePunctuation: false,
    minimumWordLength: 1,
    customMatch: null,
    customBadWords: [],
  };

  const option = {
    ...defaultOptions,
    ...options,
  };

  const censoredWords = [...defaultBadWords, ...option.customBadWords ].map((word) => word.replace(/\*/g, '\\w+'));

  // console.log(censoredWords);

  // Create a regular expression based on the options
  let regex = new RegExp(censoredWords.join('|'), 'g');

  if (!option.caseSensitive) {
    regex = new RegExp(censoredWords.join('|'), 'gi');
  }
  if (option.wholeWordsOnly) {
    regex = new RegExp(`\\b(${censoredWords.join('|')})\\b`, 'gi');
  }
  if (option.replacePartialWords) {
    regex = new RegExp(censoredWords.join('|'), 'gi');
  }

  // console.log(regex);

  // Replace the censored words with the censor character or custom replacement
  return text.replace(regex, (match) => {
    // Check if the word is shorter than the minimum length
    if (match.length < option.minimumWordLength) {
      return match;
    }

    // Check if the word matches the custom match function
    if (typeof option.customMatch === 'function' && !option.customMatch(match)) {
      return match;
    }

    // Check if the word is in the exceptions list
    if (option.exceptions.includes(match.toLowerCase())) {
      return match;
    }

    // Use the custom replacement function if provided
    if (typeof option.customReplacement === 'function') {
      return option.customReplacement(match);
    }

    // Keep the first and last characters of the word
    if (option.keepFirstAndLastChar) {
      return `${match[0]}${option.placeholder.repeat(match.length - 2)}${match[match.length - 1]}`;
    }

    // Keep a certain number of characters at the beginning and end of the word
    // if (options.keepMaxChars > 0) {
    //     const numCharsToKeep = Math.min(options.keepMaxChars, match.length);
    //     return `${match.substring(0, numCharsToKeep)}${options.placeholder.repeat(match.length - (numCharsToKeep * 2))}${match.substring(match.length - numCharsToKeep)}`;
    // }

    // Censor the entire word
    let censoredWord = option.placeholder.repeat(match.length);

    // Keep the punctuation at the beginning and end of the word
    if (option.includePunctuation) {
      const firstChar = match[0];
      const lastChar = match[match.length - 1];
      if (firstChar.match(/[^\w\s]/)) {
        censoredWord = `${firstChar}${censoredWord.substring(1)}`;
      }
      if (lastChar.match(/[^\w\s]/)) {
        censoredWord = `${censoredWord.substring(0, censoredWord.length - 1)}${lastChar}`;
      }
    }

    return censoredWord;
  });
}

/**
 * A function to check if a given text contains any bad words.
 *
 * @param {string} text - The input text to check.
 *
 * @returns {Boolen}
 * */

function isProfane(text, options = {}) {
  const cleanedText = clean(text, options);
  return cleanedText !== text;
}

module.exports = {
  clean,
  isProfane,
};