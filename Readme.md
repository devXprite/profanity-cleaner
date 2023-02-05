## profanity-cleaner

A simple and lightweight JavaScript library that helps you clean profane or inappropriate words from a given text. It provides a simple API that you can use to filter out bad words and replace them with asterisks or any other character of your choice. The library uses a predefined list of bad words that can be customized to fit your specific requirements.

### Installation
To install the package, run the following command:

```bash
npm install profanity-cleaner
```

## Usage

### use in Browser

Use directly in the browser with [jsDelivr](https://www.jsdelivr.com/package/npm/profanity-cleaner) or [unpkg](https://unpkg.com/profanity-cleaner/) by including the following script tag in your HTML file.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Profanity Cleaner</title>
    </head>
    <body>
        <script src="https://cdn.jsdelivr.net/npm/profanity-cleaner@latest"></script>
        <script>
            const text = "What the hell is going on?";
            const cleanedText = profanityCleaner.clean(text);

            console.log(cleanedText) // What the **** is going on?
        </script>
    </body>
</html>
```

### use as a module
Import the clean function and call it with a string argument to censor bad words in the text.

```javascript
import { clean } from 'profanity-cleaner';

const text = "Don't be an ash0le";
console.log(clean(text)) // Don't be an ******
```

### Options
You can pass options to the clean function as a second argument. The following options are available:

#### `placeholder`

*Type* : `string`  
*Default* : `*`

The character to use as a placeholder for the bad words.

```javascript
import { clean } from 'profanity-cleaner';

const text = "This is a funck!ng test";

console.log(clean(text, { placeholder: '#' })) 
// OUTPUT: This is a f####g test
```

#### `customReplacement`

*Type* : `function`  
*Default* : `null`

A function that returns a string to replace the bad words with. The function is passed the bad word as an argument.

```javascript
import { clean } from 'profanity-cleaner';

const text = "This is a funck!ng test";

console.log(clean(text, { customReplacement: (word) => word.toUpperCase() }))
// OUTPUT: This is a FUNCK!NG test
```

#### `keepFirstAndLastChar`

*Type* : `boolean`  
*Default* : `false`

Whether to keep the first and last character of the bad word.

```javascript
import { clean } from 'profanity-cleaner';

const text = "This is a funck!ng test";

console.log(clean(text, { keepFirstAndLastChar: true }))
// OUTPUT: This is a f****g test
```

#### `customMatch`

*Type* : `function`  
*Default* : `null`

A function that returns a boolean to determine whether a word should be censored. The function is passed the bad word as an argument. In the following example, only words with an odd number of characters are censored.

```javascript
import { clean } from 'profanity-cleaner';

const text = "This is a funck!ng test";

console.log(clean(text, { customMatch: (word) => word.length % 2 != 0 }))
// OUTPUT: This is a f*****g test
```

#### `exceptions`

*Type* : `array`  
*Default* : `[]`

An array of words that should not be censored. In the following example, the word `hell` is not censored.

```javascript
import { clean } from 'profanity-cleaner';

const exceptionalWords = ['hell'];
const text = "What the hell is going on?";

console.log(clean(text, { exceptions: exceptionalWords }))
// OUTPUT: What the hell is going on?
```

#### `customBadWords`

*Type* : `array`

An array of words that should be censored. In the following example, the word `bad` is censored.

```javascript
import { clean } from 'profanity-cleaner';

const badWordsArray = ['bad', 'evil'];
const text = "This is a bad example";

console.log(clean(text, { customBadWords: badWordsArray }))

// OUTPUT: This is a *** example
```


## Credits
* The list of bad words used in this library was sourced from the [badwords](https://github.com/web-mech/badwords) project.

## License
`profanity-cleaner` is released under the [MIT License](LICENSE).