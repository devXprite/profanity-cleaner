var expect = require('chai').expect;
const { clean, isProfane } = require('../dist/clean-text');

describe('clean', function () {
    it('Should be a function', function () {
        expect(clean).to.be.a('function');
    });

    // create test that replace bad words with asterisks
    it('Should replace bad words with asterisks', function () {
        expect(clean('This is a fucking example')).to.equal('This is a ******* example');
    });

    // create test that replace bad words with placeholder text
    it('Should replace bad words with placeholder symbol', function () {
        expect(clean('This is a fucking example', { placeholder: '#' })).to.equal('This is a ####### example');
    })
    

    // create test that add custom bad words to the list
    it('Should add custom bad words to the list', function () {
        expect(clean('This is a fucking evil example.', { customBadWords: ['evil'] })).to.equal('This is a ******* **** example.');
    })

    // create test that replace bad words with custom replacement function
    it('Should replace bad words with custom replacement function', function () {
        expect(clean('This is a fucking example', { customReplacement: (word) => word.toUpperCase() })).to.equal('This is a FUCKING example');
    })

    // create test that keep first and last character of the bad word
    it('Should keep first and last character of the bad word', function () {
        expect(clean('This is a fucking example', { keepFirstAndLastChar: true })).to.equal('This is a f*****g example');
    })

    // create test that test custom match function
    it('Should test custom match function', function () {
        expect(clean('This is a fucking hell example', { customMatch: (word) => word.length % 2 != 0 })).to.equal('This is a ******* hell example');
    })

    // create test that test minimum word length
    it('Should test minimum word length', function () {
        expect(clean('This is a hell and fucking example', { minimumWordLength: 5 })).to.equal('This is a hell and ******* example');
    })

    // create test that test case sensitive words
    // it('Should test case sensitive words', function () {
    //     expect(clean('lorem ipsum dOLoR sit amet', { caseSensitive: true, customBadWords:['dolor'] })).to.equal('lorem ipsum dOLoR sit amet');
    //     // expect (clean('lorem ipsum dolor sit amet', { caseSensitive: true, customBadWords:['dOLoR'] })).to.equal('lorem ipsum ****** sit amet');
    // })

    // create test that test exceptions list
    it('Should test exceptions list', function () {
        expect(clean('This is a hell and fucking example', { exceptions: ['hell'] })).to.equal('This is a hell and ******* example');
    })

    // create test that replace partial words
    it('Should replace partial words', function () {
        expect(clean('This is a fucking example', { replacePartialWords: true })).to.equal('This is a ****ing example');
    })

});

describe('isProfane', function () {
    it('Should be a function', function () {
        expect(isProfane).to.be.a('function');
    });

    // create test that check if the string contains bad words
    it('Should return true if the string contains bad words', function () {
        expect(isProfane('This is a fucking example')).to.equal(true);
    })

    // create test that check if the string contains bad words
    it('Should return false if the string doesnot contains bad words', function () {
        expect(isProfane('This is a good example')).to.equal(false);
    })

    // create test that try custom bad word to list
    it('Should return true if the string contains custom bad words', function () {
        expect(isProfane('This is a bad example', { customBadWords: ['bad'] })).to.equal(true);
    })
})