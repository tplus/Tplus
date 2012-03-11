// $ANTLR 3.3 Nov 30, 2010 12:50:56 .\\Pinyin.g 2012-03-10 03:02:10

var PinyinParser = function(input, state) {
    if (!state) {
        state = new org.antlr.runtime.RecognizerSharedState();
    }

    (function(){
    }).call(this);

    PinyinParser.superclass.constructor.call(this, input, state);


         

    this.adaptor = new org.antlr.runtime.tree.CommonTreeAdaptor();

};

org.antlr.lang.augmentObject(PinyinParser, {
    EOF: -1,
    T__6: 6,
    YUN_MU: 4,
    SHENG_MU: 5
});

(function(){
// public class variables
var EOF= -1,
    T__6= 6,
    YUN_MU= 4,
    SHENG_MU= 5;

// public instance methods/vars
org.antlr.lang.extend(PinyinParser, org.antlr.runtime.Parser, {
        

    getTokenNames: function() { return PinyinParser.tokenNames; },
    getGrammarFileName: function() { return ".\\Pinyin.g"; }
});
org.antlr.lang.augmentObject(PinyinParser.prototype, {


    // .\\Pinyin.g:7:1: name returns [result] : firstNameCharactersInPinyin= first_name ' ' lastNameCharactersInPinyin= last_name ;
    // $ANTLR start "name"
    name: function() {
        var result = null;

         var firstNameCharactersInPinyin = null;
         var lastNameCharactersInPinyin = null;


            result = {};

        try {
            // .\\Pinyin.g:11:2: (firstNameCharactersInPinyin= first_name ' ' lastNameCharactersInPinyin= last_name )
            // .\\Pinyin.g:11:4: firstNameCharactersInPinyin= first_name ' ' lastNameCharactersInPinyin= last_name
            this.pushFollow(PinyinParser.FOLLOW_first_name_in_name35);
            firstNameCharactersInPinyin=this.first_name();

            this.state._fsp--;

            this.match(this.input,6,PinyinParser.FOLLOW_6_in_name37); 
            this.pushFollow(PinyinParser.FOLLOW_last_name_in_name41);
            lastNameCharactersInPinyin=this.last_name();

            this.state._fsp--;

            result = {familyName: lastNameCharactersInPinyin, givenName:firstNameCharactersInPinyin};



        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return result;
    },


    // .\\Pinyin.g:15:1: first_name returns [charactersInPinyin] : (singleCharacterInPinyin= character | singleCharacterInPinyin= character otherCharactersInPinyin= first_name );
    // $ANTLR start "first_name"
    first_name: function() {
        var charactersInPinyin = null;

         var singleCharacterInPinyin = null;
         var otherCharactersInPinyin = null;

        try {
            // .\\Pinyin.g:16:2: (singleCharacterInPinyin= character | singleCharacterInPinyin= character otherCharactersInPinyin= first_name )
            var alt1=2;
            var LA1_0 = this.input.LA(1);

            if ( (LA1_0==YUN_MU) ) {
                var LA1_1 = this.input.LA(2);

                if ( (LA1_1==6) ) {
                    alt1=1;
                }
                else if ( ((LA1_1>=YUN_MU && LA1_1<=SHENG_MU)) ) {
                    alt1=2;
                }
                else {
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 1, 1, this.input);

                    throw nvae;
                }
            }
            else if ( (LA1_0==SHENG_MU) ) {
                var LA1_2 = this.input.LA(2);

                if ( (LA1_2==YUN_MU) ) {
                    var LA1_5 = this.input.LA(3);

                    if ( (LA1_5==6) ) {
                        alt1=1;
                    }
                    else if ( ((LA1_5>=YUN_MU && LA1_5<=SHENG_MU)) ) {
                        alt1=2;
                    }
                    else {
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 1, 5, this.input);

                        throw nvae;
                    }
                }
                else {
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 1, 2, this.input);

                    throw nvae;
                }
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 1, 0, this.input);

                throw nvae;
            }
            switch (alt1) {
                case 1 :
                    // .\\Pinyin.g:16:4: singleCharacterInPinyin= character
                    this.pushFollow(PinyinParser.FOLLOW_character_in_first_name62);
                    singleCharacterInPinyin=this.character();

                    this.state._fsp--;

                    charactersInPinyin = [singleCharacterInPinyin];


                    break;
                case 2 :
                    // .\\Pinyin.g:18:4: singleCharacterInPinyin= character otherCharactersInPinyin= first_name
                    this.pushFollow(PinyinParser.FOLLOW_character_in_first_name73);
                    singleCharacterInPinyin=this.character();

                    this.state._fsp--;

                    this.pushFollow(PinyinParser.FOLLOW_first_name_in_first_name77);
                    otherCharactersInPinyin=this.first_name();

                    this.state._fsp--;

                    charactersInPinyin = [singleCharacterInPinyin].concat(otherCharactersInPinyin);


                    break;

            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return charactersInPinyin;
    },


    // .\\Pinyin.g:22:1: last_name returns [charactersInPinyin] : (singleCharacterInPinyin= character | singleCharacterInPinyin= character otherCharactersInPinyin= last_name );
    // $ANTLR start "last_name"
    last_name: function() {
        var charactersInPinyin = null;

         var singleCharacterInPinyin = null;
         var otherCharactersInPinyin = null;

        try {
            // .\\Pinyin.g:23:2: (singleCharacterInPinyin= character | singleCharacterInPinyin= character otherCharactersInPinyin= last_name )
            var alt2=2;
            var LA2_0 = this.input.LA(1);

            if ( (LA2_0==YUN_MU) ) {
                var LA2_1 = this.input.LA(2);

                if ( (LA2_1==EOF) ) {
                    alt2=1;
                }
                else if ( ((LA2_1>=YUN_MU && LA2_1<=SHENG_MU)) ) {
                    alt2=2;
                }
                else {
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 2, 1, this.input);

                    throw nvae;
                }
            }
            else if ( (LA2_0==SHENG_MU) ) {
                var LA2_2 = this.input.LA(2);

                if ( (LA2_2==YUN_MU) ) {
                    var LA2_5 = this.input.LA(3);

                    if ( (LA2_5==EOF) ) {
                        alt2=1;
                    }
                    else if ( ((LA2_5>=YUN_MU && LA2_5<=SHENG_MU)) ) {
                        alt2=2;
                    }
                    else {
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 2, 5, this.input);

                        throw nvae;
                    }
                }
                else {
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 2, 2, this.input);

                    throw nvae;
                }
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 2, 0, this.input);

                throw nvae;
            }
            switch (alt2) {
                case 1 :
                    // .\\Pinyin.g:23:4: singleCharacterInPinyin= character
                    this.pushFollow(PinyinParser.FOLLOW_character_in_last_name98);
                    singleCharacterInPinyin=this.character();

                    this.state._fsp--;

                    charactersInPinyin = [singleCharacterInPinyin];


                    break;
                case 2 :
                    // .\\Pinyin.g:25:4: singleCharacterInPinyin= character otherCharactersInPinyin= last_name
                    this.pushFollow(PinyinParser.FOLLOW_character_in_last_name109);
                    singleCharacterInPinyin=this.character();

                    this.state._fsp--;

                    this.pushFollow(PinyinParser.FOLLOW_last_name_in_last_name113);
                    otherCharactersInPinyin=this.last_name();

                    this.state._fsp--;

                    charactersInPinyin = [singleCharacterInPinyin].concat(otherCharactersInPinyin);


                    break;

            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return charactersInPinyin;
    },


    // .\\Pinyin.g:29:1: character returns [characterInPinyin] : ( YUN_MU | SHENG_MU YUN_MU );
    // $ANTLR start "character"
    character: function() {
        var characterInPinyin = null;

        var YUN_MU1 = null;
        var SHENG_MU2 = null;
        var YUN_MU3 = null;

        try {
            // .\\Pinyin.g:30:5: ( YUN_MU | SHENG_MU YUN_MU )
            var alt3=2;
            var LA3_0 = this.input.LA(1);

            if ( (LA3_0==YUN_MU) ) {
                alt3=1;
            }
            else if ( (LA3_0==SHENG_MU) ) {
                alt3=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 3, 0, this.input);

                throw nvae;
            }
            switch (alt3) {
                case 1 :
                    // .\\Pinyin.g:30:9: YUN_MU
                    YUN_MU1=this.match(this.input,YUN_MU,PinyinParser.FOLLOW_YUN_MU_in_character137); 
                    characterInPinyin = (YUN_MU1?YUN_MU1.getText():null);


                    break;
                case 2 :
                    // .\\Pinyin.g:32:4: SHENG_MU YUN_MU
                    SHENG_MU2=this.match(this.input,SHENG_MU,PinyinParser.FOLLOW_SHENG_MU_in_character152); 
                    YUN_MU3=this.match(this.input,YUN_MU,PinyinParser.FOLLOW_YUN_MU_in_character154); 
                    characterInPinyin = (SHENG_MU2?SHENG_MU2.getText():null) + (YUN_MU3?YUN_MU3.getText():null);


                    break;

            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return characterInPinyin;
    }

    // Delegated rules




}, true); // important to pass true to overwrite default implementations

 

// public class variables
org.antlr.lang.augmentObject(PinyinParser, {
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "YUN_MU", "SHENG_MU", "' '"],
    FOLLOW_first_name_in_name35: new org.antlr.runtime.BitSet([0x00000040, 0x00000000]),
    FOLLOW_6_in_name37: new org.antlr.runtime.BitSet([0x00000030, 0x00000000]),
    FOLLOW_last_name_in_name41: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_character_in_first_name62: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_character_in_first_name73: new org.antlr.runtime.BitSet([0x00000030, 0x00000000]),
    FOLLOW_first_name_in_first_name77: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_character_in_last_name98: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_character_in_last_name109: new org.antlr.runtime.BitSet([0x00000030, 0x00000000]),
    FOLLOW_last_name_in_last_name113: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_YUN_MU_in_character137: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_SHENG_MU_in_character152: new org.antlr.runtime.BitSet([0x00000010, 0x00000000]),
    FOLLOW_YUN_MU_in_character154: new org.antlr.runtime.BitSet([0x00000002, 0x00000000])
});

})();