// $ANTLR 3.3 Nov 30, 2010 12:50:56 .\\Pinyin.g 2012-03-10 03:02:10

var PinyinLexer = function(input, state) {
// public PinyinLexer(CharStream input)
// public PinyinLexer(CharStream input, RecognizerSharedState state) {
    if (!state) {
        state = new org.antlr.runtime.RecognizerSharedState();
    }

    (function(){
    }).call(this);

    this.dfa1 = new PinyinLexer.DFA1(this);
    this.dfa2 = new PinyinLexer.DFA2(this);
    PinyinLexer.superclass.constructor.call(this, input, state);


};

org.antlr.lang.augmentObject(PinyinLexer, {
    EOF: -1,
    T__6: 6,
    YUN_MU: 4,
    SHENG_MU: 5
});

(function(){
var HIDDEN = org.antlr.runtime.Token.HIDDEN_CHANNEL,
    EOF = org.antlr.runtime.Token.EOF;
org.antlr.lang.extend(PinyinLexer, org.antlr.runtime.Lexer, {
    EOF : -1,
    T__6 : 6,
    YUN_MU : 4,
    SHENG_MU : 5,
    getGrammarFileName: function() { return ".\\Pinyin.g"; }
});
org.antlr.lang.augmentObject(PinyinLexer.prototype, {
    // $ANTLR start T__6
    mT__6: function()  {
        try {
            var _type = this.T__6;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // .\\Pinyin.g:7:6: ( ' ' )
            // .\\Pinyin.g:7:8: ' '
            this.match(' '); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__6",

    // $ANTLR start SHENG_MU
    mSHENG_MU: function()  {
        try {
            var _type = this.SHENG_MU;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // .\\Pinyin.g:37:9: ( 'b' | 'p' | 'm' | 'f' | 'd' | 't' | 'n' | 'l' | 'g' | 'k' | 'h' | 'j' | 'q' | 'x' | 'z' 'h' | 'c' 'h' | 's' 'h' | 'r' | 'z' | 'c' | 's' | 'y' | 'w' )
            var alt1=23;
            alt1 = this.dfa1.predict(this.input);
            switch (alt1) {
                case 1 :
                    // .\\Pinyin.g:37:11: 'b'
                    this.match('b'); 


                    break;
                case 2 :
                    // .\\Pinyin.g:37:15: 'p'
                    this.match('p'); 


                    break;
                case 3 :
                    // .\\Pinyin.g:37:19: 'm'
                    this.match('m'); 


                    break;
                case 4 :
                    // .\\Pinyin.g:37:23: 'f'
                    this.match('f'); 


                    break;
                case 5 :
                    // .\\Pinyin.g:37:27: 'd'
                    this.match('d'); 


                    break;
                case 6 :
                    // .\\Pinyin.g:37:31: 't'
                    this.match('t'); 


                    break;
                case 7 :
                    // .\\Pinyin.g:37:35: 'n'
                    this.match('n'); 


                    break;
                case 8 :
                    // .\\Pinyin.g:37:39: 'l'
                    this.match('l'); 


                    break;
                case 9 :
                    // .\\Pinyin.g:37:43: 'g'
                    this.match('g'); 


                    break;
                case 10 :
                    // .\\Pinyin.g:37:47: 'k'
                    this.match('k'); 


                    break;
                case 11 :
                    // .\\Pinyin.g:37:51: 'h'
                    this.match('h'); 


                    break;
                case 12 :
                    // .\\Pinyin.g:37:55: 'j'
                    this.match('j'); 


                    break;
                case 13 :
                    // .\\Pinyin.g:37:59: 'q'
                    this.match('q'); 


                    break;
                case 14 :
                    // .\\Pinyin.g:37:63: 'x'
                    this.match('x'); 


                    break;
                case 15 :
                    // .\\Pinyin.g:37:67: 'z' 'h'
                    this.match('z'); 
                    this.match('h'); 


                    break;
                case 16 :
                    // .\\Pinyin.g:37:74: 'c' 'h'
                    this.match('c'); 
                    this.match('h'); 


                    break;
                case 17 :
                    // .\\Pinyin.g:37:81: 's' 'h'
                    this.match('s'); 
                    this.match('h'); 


                    break;
                case 18 :
                    // .\\Pinyin.g:37:88: 'r'
                    this.match('r'); 


                    break;
                case 19 :
                    // .\\Pinyin.g:37:92: 'z'
                    this.match('z'); 


                    break;
                case 20 :
                    // .\\Pinyin.g:37:96: 'c'
                    this.match('c'); 


                    break;
                case 21 :
                    // .\\Pinyin.g:37:100: 's'
                    this.match('s'); 


                    break;
                case 22 :
                    // .\\Pinyin.g:37:104: 'y'
                    this.match('y'); 


                    break;
                case 23 :
                    // .\\Pinyin.g:37:108: 'w'
                    this.match('w'); 


                    break;

            }
            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SHENG_MU",

    // $ANTLR start YUN_MU
    mYUN_MU: function()  {
        try {
            var _type = this.YUN_MU;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // .\\Pinyin.g:40:8: ( 'a' | 'o' | 'e' | 'i' | 'u' | 'a' 'i' | 'e' 'i' | 'u' 'i' | 'a' 'o' | 'o' 'u' | 'i' 'u' | 'i' 'e' | 'u' 'e' | 'e' 'r' | 'a' 'n' | 'e' 'n' | 'i' 'n' | 'u' 'n' | 'a' 'n' 'g' | 'e' 'n' 'g' | 'i' 'n' 'g' | 'o' 'n' 'g' | 'i' 'a' | 'i' 'a' 'n' | 'i' 'a' 'n' 'g' | 'i' 'a' 'o' | 'i' 'o' 'n' 'g' | 'u' 'a' | 'u' 'a' 'n' | 'u' 'a' 'n' 'g' | 'u' 'o' | 'u' 'a' 'i' )
            var alt2=32;
            alt2 = this.dfa2.predict(this.input);
            switch (alt2) {
                case 1 :
                    // .\\Pinyin.g:40:10: 'a'
                    this.match('a'); 


                    break;
                case 2 :
                    // .\\Pinyin.g:40:14: 'o'
                    this.match('o'); 


                    break;
                case 3 :
                    // .\\Pinyin.g:40:18: 'e'
                    this.match('e'); 


                    break;
                case 4 :
                    // .\\Pinyin.g:40:22: 'i'
                    this.match('i'); 


                    break;
                case 5 :
                    // .\\Pinyin.g:40:26: 'u'
                    this.match('u'); 


                    break;
                case 6 :
                    // .\\Pinyin.g:40:30: 'a' 'i'
                    this.match('a'); 
                    this.match('i'); 


                    break;
                case 7 :
                    // .\\Pinyin.g:40:37: 'e' 'i'
                    this.match('e'); 
                    this.match('i'); 


                    break;
                case 8 :
                    // .\\Pinyin.g:40:44: 'u' 'i'
                    this.match('u'); 
                    this.match('i'); 


                    break;
                case 9 :
                    // .\\Pinyin.g:40:51: 'a' 'o'
                    this.match('a'); 
                    this.match('o'); 


                    break;
                case 10 :
                    // .\\Pinyin.g:40:58: 'o' 'u'
                    this.match('o'); 
                    this.match('u'); 


                    break;
                case 11 :
                    // .\\Pinyin.g:40:65: 'i' 'u'
                    this.match('i'); 
                    this.match('u'); 


                    break;
                case 12 :
                    // .\\Pinyin.g:40:72: 'i' 'e'
                    this.match('i'); 
                    this.match('e'); 


                    break;
                case 13 :
                    // .\\Pinyin.g:40:79: 'u' 'e'
                    this.match('u'); 
                    this.match('e'); 


                    break;
                case 14 :
                    // .\\Pinyin.g:40:86: 'e' 'r'
                    this.match('e'); 
                    this.match('r'); 


                    break;
                case 15 :
                    // .\\Pinyin.g:40:93: 'a' 'n'
                    this.match('a'); 
                    this.match('n'); 


                    break;
                case 16 :
                    // .\\Pinyin.g:40:100: 'e' 'n'
                    this.match('e'); 
                    this.match('n'); 


                    break;
                case 17 :
                    // .\\Pinyin.g:40:107: 'i' 'n'
                    this.match('i'); 
                    this.match('n'); 


                    break;
                case 18 :
                    // .\\Pinyin.g:40:114: 'u' 'n'
                    this.match('u'); 
                    this.match('n'); 


                    break;
                case 19 :
                    // .\\Pinyin.g:40:121: 'a' 'n' 'g'
                    this.match('a'); 
                    this.match('n'); 
                    this.match('g'); 


                    break;
                case 20 :
                    // .\\Pinyin.g:40:131: 'e' 'n' 'g'
                    this.match('e'); 
                    this.match('n'); 
                    this.match('g'); 


                    break;
                case 21 :
                    // .\\Pinyin.g:40:141: 'i' 'n' 'g'
                    this.match('i'); 
                    this.match('n'); 
                    this.match('g'); 


                    break;
                case 22 :
                    // .\\Pinyin.g:40:151: 'o' 'n' 'g'
                    this.match('o'); 
                    this.match('n'); 
                    this.match('g'); 


                    break;
                case 23 :
                    // .\\Pinyin.g:40:161: 'i' 'a'
                    this.match('i'); 
                    this.match('a'); 


                    break;
                case 24 :
                    // .\\Pinyin.g:40:168: 'i' 'a' 'n'
                    this.match('i'); 
                    this.match('a'); 
                    this.match('n'); 


                    break;
                case 25 :
                    // .\\Pinyin.g:40:178: 'i' 'a' 'n' 'g'
                    this.match('i'); 
                    this.match('a'); 
                    this.match('n'); 
                    this.match('g'); 


                    break;
                case 26 :
                    // .\\Pinyin.g:40:191: 'i' 'a' 'o'
                    this.match('i'); 
                    this.match('a'); 
                    this.match('o'); 


                    break;
                case 27 :
                    // .\\Pinyin.g:40:201: 'i' 'o' 'n' 'g'
                    this.match('i'); 
                    this.match('o'); 
                    this.match('n'); 
                    this.match('g'); 


                    break;
                case 28 :
                    // .\\Pinyin.g:40:214: 'u' 'a'
                    this.match('u'); 
                    this.match('a'); 


                    break;
                case 29 :
                    // .\\Pinyin.g:40:221: 'u' 'a' 'n'
                    this.match('u'); 
                    this.match('a'); 
                    this.match('n'); 


                    break;
                case 30 :
                    // .\\Pinyin.g:40:231: 'u' 'a' 'n' 'g'
                    this.match('u'); 
                    this.match('a'); 
                    this.match('n'); 
                    this.match('g'); 


                    break;
                case 31 :
                    // .\\Pinyin.g:40:244: 'u' 'o'
                    this.match('u'); 
                    this.match('o'); 


                    break;
                case 32 :
                    // .\\Pinyin.g:40:251: 'u' 'a' 'i'
                    this.match('u'); 
                    this.match('a'); 
                    this.match('i'); 


                    break;

            }
            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "YUN_MU",

    mTokens: function() {
        // .\\Pinyin.g:1:8: ( T__6 | SHENG_MU | YUN_MU )
        var alt3=3;
        switch ( this.input.LA(1) ) {
        case ' ':
            alt3=1;
            break;
        case 'b':
        case 'c':
        case 'd':
        case 'f':
        case 'g':
        case 'h':
        case 'j':
        case 'k':
        case 'l':
        case 'm':
        case 'n':
        case 'p':
        case 'q':
        case 'r':
        case 's':
        case 't':
        case 'w':
        case 'x':
        case 'y':
        case 'z':
            alt3=2;
            break;
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
            alt3=3;
            break;
        default:
            var nvae =
                new org.antlr.runtime.NoViableAltException("", 3, 0, this.input);

            throw nvae;
        }

        switch (alt3) {
            case 1 :
                // .\\Pinyin.g:1:10: T__6
                this.mT__6(); 


                break;
            case 2 :
                // .\\Pinyin.g:1:15: SHENG_MU
                this.mSHENG_MU(); 


                break;
            case 3 :
                // .\\Pinyin.g:1:24: YUN_MU
                this.mYUN_MU(); 


                break;

        }

    }

}, true); // important to pass true to overwrite default implementations

org.antlr.lang.augmentObject(PinyinLexer, {
    DFA1_eotS:
        "\u000f\uffff\u0001\u0016\u0001\u0018\u0001\u001a\u0009\uffff",
    DFA1_eofS:
        "\u001b\uffff",
    DFA1_minS:
        "\u0001\u0062\u000e\uffff\u0003\u0068\u0009\uffff",
    DFA1_maxS:
        "\u0001\u007a\u000e\uffff\u0003\u0068\u0009\uffff",
    DFA1_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0001\u0004\u0001"+
    "\u0005\u0001\u0006\u0001\u0007\u0001\u0008\u0001\u0009\u0001\u000a\u0001"+
    "\u000b\u0001\u000c\u0001\u000d\u0001\u000e\u0003\uffff\u0001\u0012\u0001"+
    "\u0016\u0001\u0017\u0001\u000f\u0001\u0013\u0001\u0010\u0001\u0014\u0001"+
    "\u0011\u0001\u0015",
    DFA1_specialS:
        "\u001b\uffff}>",
    DFA1_transitionS: [
            "\u0001\u0001\u0001\u0010\u0001\u0005\u0001\uffff\u0001\u0004"+
            "\u0001\u0009\u0001\u000b\u0001\uffff\u0001\u000c\u0001\u000a"+
            "\u0001\u0008\u0001\u0003\u0001\u0007\u0001\uffff\u0001\u0002"+
            "\u0001\u000d\u0001\u0012\u0001\u0011\u0001\u0006\u0002\uffff"+
            "\u0001\u0014\u0001\u000e\u0001\u0013\u0001\u000f",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u0015",
            "\u0001\u0017",
            "\u0001\u0019",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(PinyinLexer, {
    DFA1_eot:
        org.antlr.runtime.DFA.unpackEncodedString(PinyinLexer.DFA1_eotS),
    DFA1_eof:
        org.antlr.runtime.DFA.unpackEncodedString(PinyinLexer.DFA1_eofS),
    DFA1_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(PinyinLexer.DFA1_minS),
    DFA1_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(PinyinLexer.DFA1_maxS),
    DFA1_accept:
        org.antlr.runtime.DFA.unpackEncodedString(PinyinLexer.DFA1_acceptS),
    DFA1_special:
        org.antlr.runtime.DFA.unpackEncodedString(PinyinLexer.DFA1_specialS),
    DFA1_transition: (function() {
        var a = [],
            i,
            numStates = PinyinLexer.DFA1_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(PinyinLexer.DFA1_transitionS[i]));
        }
        return a;
    })()
});

PinyinLexer.DFA1 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 1;
    this.eot = PinyinLexer.DFA1_eot;
    this.eof = PinyinLexer.DFA1_eof;
    this.min = PinyinLexer.DFA1_min;
    this.max = PinyinLexer.DFA1_max;
    this.accept = PinyinLexer.DFA1_accept;
    this.special = PinyinLexer.DFA1_special;
    this.transition = PinyinLexer.DFA1_transition;
};

org.antlr.lang.extend(PinyinLexer.DFA1, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "37:1: SHENG_MU : ( 'b' | 'p' | 'm' | 'f' | 'd' | 't' | 'n' | 'l' | 'g' | 'k' | 'h' | 'j' | 'q' | 'x' | 'z' 'h' | 'c' 'h' | 's' 'h' | 'r' | 'z' | 'c' | 's' | 'y' | 'w' );";
    },
    dummy: null
});
org.antlr.lang.augmentObject(PinyinLexer, {
    DFA2_eotS:
        "\u0001\uffff\u0001\u0009\u0001\u000c\u0001\u0010\u0001\u0016\u0001"+
    "\u001c\u0002\uffff\u0001\u001e\u0006\uffff\u0001\u0020\u0003\uffff\u0001"+
    "\u0022\u0001\u0025\u0005\uffff\u0001\u0028\u0008\uffff\u0001\u002a\u0002"+
    "\uffff\u0001\u002c\u0006\uffff",
    DFA2_eofS:
        "\u002d\uffff",
    DFA2_minS:
        "\u0001\u0061\u0001\u0069\u0001\u006e\u0001\u0069\u0002\u0061\u0002"+
    "\uffff\u0001\u0067\u0006\uffff\u0001\u0067\u0003\uffff\u0001\u0067\u0001"+
    "\u006e\u0005\uffff\u0001\u0069\u0008\uffff\u0001\u0067\u0002\uffff\u0001"+
    "\u0067\u0006\uffff",
    DFA2_maxS:
        "\u0001\u0075\u0001\u006f\u0001\u0075\u0001\u0072\u0001\u0075\u0001"+
    "\u006f\u0002\uffff\u0001\u0067\u0006\uffff\u0001\u0067\u0003\uffff\u0001"+
    "\u0067\u0001\u006f\u0005\uffff\u0001\u006e\u0008\uffff\u0001\u0067\u0002"+
    "\uffff\u0001\u0067\u0006\uffff",
    DFA2_acceptS:
        "\u0006\uffff\u0001\u0006\u0001\u0009\u0001\uffff\u0001\u0001\u0001"+
    "\u000a\u0001\u0016\u0001\u0002\u0001\u0007\u0001\u000e\u0001\uffff\u0001"+
    "\u0003\u0001\u000b\u0001\u000c\u0002\uffff\u0001\u001b\u0001\u0004\u0001"+
    "\u0008\u0001\u000d\u0001\u0012\u0001\uffff\u0001\u001f\u0001\u0005\u0001"+
    "\u0013\u0001\u000f\u0001\u0014\u0001\u0010\u0001\u0015\u0001\u0011\u0001"+
    "\uffff\u0001\u001a\u0001\u0017\u0001\uffff\u0001\u0020\u0001\u001c\u0001"+
    "\u0019\u0001\u0018\u0001\u001e\u0001\u001d",
    DFA2_specialS:
        "\u002d\uffff}>",
    DFA2_transitionS: [
            "\u0001\u0001\u0003\uffff\u0001\u0003\u0003\uffff\u0001\u0004"+
            "\u0005\uffff\u0001\u0002\u0005\uffff\u0001\u0005",
            "\u0001\u0006\u0004\uffff\u0001\u0008\u0001\u0007",
            "\u0001\u000b\u0006\uffff\u0001\u000a",
            "\u0001\u000d\u0004\uffff\u0001\u000f\u0003\uffff\u0001\u000e",
            "\u0001\u0014\u0003\uffff\u0001\u0012\u0008\uffff\u0001\u0013"+
            "\u0001\u0015\u0005\uffff\u0001\u0011",
            "\u0001\u001a\u0003\uffff\u0001\u0018\u0003\uffff\u0001\u0017"+
            "\u0004\uffff\u0001\u0019\u0001\u001b",
            "",
            "",
            "\u0001\u001d",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u001f",
            "",
            "",
            "",
            "\u0001\u0021",
            "\u0001\u0023\u0001\u0024",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u0027\u0004\uffff\u0001\u0026",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u0029",
            "",
            "",
            "\u0001\u002b",
            "",
            "",
            "",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(PinyinLexer, {
    DFA2_eot:
        org.antlr.runtime.DFA.unpackEncodedString(PinyinLexer.DFA2_eotS),
    DFA2_eof:
        org.antlr.runtime.DFA.unpackEncodedString(PinyinLexer.DFA2_eofS),
    DFA2_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(PinyinLexer.DFA2_minS),
    DFA2_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(PinyinLexer.DFA2_maxS),
    DFA2_accept:
        org.antlr.runtime.DFA.unpackEncodedString(PinyinLexer.DFA2_acceptS),
    DFA2_special:
        org.antlr.runtime.DFA.unpackEncodedString(PinyinLexer.DFA2_specialS),
    DFA2_transition: (function() {
        var a = [],
            i,
            numStates = PinyinLexer.DFA2_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(PinyinLexer.DFA2_transitionS[i]));
        }
        return a;
    })()
});

PinyinLexer.DFA2 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 2;
    this.eot = PinyinLexer.DFA2_eot;
    this.eof = PinyinLexer.DFA2_eof;
    this.min = PinyinLexer.DFA2_min;
    this.max = PinyinLexer.DFA2_max;
    this.accept = PinyinLexer.DFA2_accept;
    this.special = PinyinLexer.DFA2_special;
    this.transition = PinyinLexer.DFA2_transition;
};

org.antlr.lang.extend(PinyinLexer.DFA2, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "40:1: YUN_MU : ( 'a' | 'o' | 'e' | 'i' | 'u' | 'a' 'i' | 'e' 'i' | 'u' 'i' | 'a' 'o' | 'o' 'u' | 'i' 'u' | 'i' 'e' | 'u' 'e' | 'e' 'r' | 'a' 'n' | 'e' 'n' | 'i' 'n' | 'u' 'n' | 'a' 'n' 'g' | 'e' 'n' 'g' | 'i' 'n' 'g' | 'o' 'n' 'g' | 'i' 'a' | 'i' 'a' 'n' | 'i' 'a' 'n' 'g' | 'i' 'a' 'o' | 'i' 'o' 'n' 'g' | 'u' 'a' | 'u' 'a' 'n' | 'u' 'a' 'n' 'g' | 'u' 'o' | 'u' 'a' 'i' );";
    },
    dummy: null
});
 
})();