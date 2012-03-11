grammar Pinyin;

options {
    language=JavaScript;
}

name returns [result]
@init{
    result = {};
}
	:	firstNameCharactersInPinyin=first_name ' ' lastNameCharactersInPinyin=last_name
		{result = {familyName: lastNameCharactersInPinyin, givenName:firstNameCharactersInPinyin};}
	;

first_name returns [charactersInPinyin]
	:	singleCharacterInPinyin=character
		{charactersInPinyin = [singleCharacterInPinyin];}
	|	singleCharacterInPinyin=character otherCharactersInPinyin=first_name
		{charactersInPinyin = [singleCharacterInPinyin].concat(otherCharactersInPinyin);}
	;

last_name returns [charactersInPinyin]
	:	singleCharacterInPinyin=character
		{charactersInPinyin = [singleCharacterInPinyin];}
	|	singleCharacterInPinyin=character otherCharactersInPinyin=last_name
		{charactersInPinyin = [singleCharacterInPinyin].concat(otherCharactersInPinyin);}
	;

character returns [characterInPinyin]
    :   YUN_MU
        {characterInPinyin = $YUN_MU.text;}
	|	SHENG_MU YUN_MU
	    {characterInPinyin = $SHENG_MU.text + $YUN_MU.text;}
	;


SHENG_MU:	'b'|'p'|'m'|'f'|'d'|'t'|'n'|'l'|'g'|'k'|'h'|'j'|'q'|'x'|'z''h'|'c''h'|'s''h'|'r'|'z'|'c'|'s'|'y'|'w'
	;

YUN_MU	:	'a'|'o'|'e'|'i'|'u'|'a''i'|'e''i'|'u''i'|'a''o'|'o''u'|'i''u'|'i''e'|'u''e'|'e''r'|'a''n'|'e''n'|'i''n'|'u''n'|'a''n''g'|'e''n''g'|'i''n''g'|'o''n''g'|'i''a'|'i''a''n'|'i''a''n''g'|'i''a''o'|'i''o''n''g'|'u''a'|'u''a''n'|'u''a''n''g'|'u''o'|'u''a''i'
	;
