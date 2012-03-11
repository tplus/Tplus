function parseCharactersInPinyin(fullNameInPinyin) {
    var inputStream = new org.antlr.runtime.ANTLRStringStream(fullNameInPinyin.toLowerCase()),
        lexer = new PinyinLexer(inputStream),
        tokenStream = new org.antlr.runtime.CommonTokenStream(lexer),
        parser = new PinyinParser(tokenStream),
        charactersInPinyin = parser.name();
    return charactersInPinyin;
}

function fullNameInitialsPattern(charactersInPinyin) {
    var familyNameInitials = _.map(charactersInPinyin.familyName, function(characterInPinyin) { return characterInPinyin[0];}),
        givenNameInitials = _.map(charactersInPinyin.givenName, function(characterInPinyin) { return characterInPinyin[0];}),
        fullNameInitials = [].concat(familyNameInitials).concat(givenNameInitials);
    return fullNameInitials.join("").toUpperCase();
}

function fullNamePattern(charactersInPinyin) {
    var capitalizedCharactersOfFamilyName = _.map(charactersInPinyin.familyName, function(character) {return character[0].toUpperCase() + character.slice(1)}),
        capitalizedCharactersOfGivenName = _.map(charactersInPinyin.givenName, function(character) {return character[0].toUpperCase() + character.slice(1)});
    return [].concat(capitalizedCharactersOfFamilyName).concat(capitalizedCharactersOfGivenName).join("");
}

function givenNameInitialsPattern(charactersInPinyin) {
    var givenNameInitials = _.map(charactersInPinyin.givenName, function(characterInPinyin) { return characterInPinyin[0];});
    if(charactersInPinyin.givenName.length == 1) {
        return givenNameInitials[0].toUpperCase() + givenNameInitials[0].toUpperCase();
    }
    return givenNameInitials.join("").toUpperCase();
}

function givenNamePattern(charactersInPinyin) {
    var firstCharacterOfGivenName = charactersInPinyin.givenName[0],
        capitalizedFirstCharacterOfGivenName = firstCharacterOfGivenName[0].toUpperCase() + firstCharacterOfGivenName.slice(1);
    return capitalizedFirstCharacterOfGivenName + charactersInPinyin.givenName.slice(1).join("");
}

function cuteGivenNamePattern(charactersInPinyin) {
    var proposals = [];
    _.each(charactersInPinyin.givenName, function(character) {
        proposals.push(character[0].toUpperCase() + character.slice(1) + character);
    });
    return proposals;
}

function guessAlias(fullName) {
    var charactersInPinyin = parseCharactersInPinyin(fullName),
        aliasPatternsFns = [
            fullNameInitialsPattern,
            givenNameInitialsPattern,
            givenNamePattern,
            cuteGivenNamePattern,
            fullNamePattern
        ],
        patterns = _.map(aliasPatternsFns, function(aliasPatternFn) { return aliasPatternFn(charactersInPinyin)}),
        proposals = [];
    _.each(patterns, function(pattern) {proposals = proposals.concat(pattern)});
    return proposals;
}