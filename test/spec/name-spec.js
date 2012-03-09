describe("Pinyin parser", function() {
    var examples = [
        {input: "Tong Zhang", expectedOutput: {familyName: ["zhang"], givenName:["tong"]}},
        {input: "Xianjing Zhuo", expectedOutput: {familyName: ["zhuo"], givenName:["xian", "jing"]}},
        {input: "Shiwei Zhou", expectedOutput: {familyName: ["zhou"], givenName:["shi", "wei"]}},
        {input: "Guangtao Yang", expectedOutput: {familyName: ["yang"], givenName:["guang", "tao"]}},
        {input: "Ruimin Zhang", expectedOutput: {familyName: ["zhang"], givenName:["rui", "min"]}},
        {input: "Hongzhang Luo", expectedOutput: {familyName: ["luo"], givenName:["hong", "zhang"]}},
        {input: "Dingdong Long", expectedOutput: {familyName: ["long"], givenName:["ding", "dong"]}},
        {input: "Yang Jia", expectedOutput: {familyName: ["jia"], givenName:["yang"]}},
        {input: "Yu Meng", expectedOutput: {familyName: ["meng"], givenName:["yu"]}},
        {input: "Liang Zhuge", expectedOutput: {familyName: ["zhu", "ge"], givenName:["liang"]}},
        {input: "Hui An", expectedOutput: {familyName: ["an"], givenName:["hui"]}}
    ];

    it("should return parsed lower-cased characters in Pinyin for provided full names", function() {
        _.each(examples, function(example) {
            var result = parseCharactersInPinyin(example.input);
            expect(result.familyName.length).toBe(example.expectedOutput.familyName.length);
            _.each(result.familyName, function(chracter, index) {
                expect(chracter).toBe(example.expectedOutput.familyName[index]);
            });
            expect(result.givenName.length).toBe(example.expectedOutput.givenName.length);
            _.each(result.givenName, function(chracter, index) {
                expect(chracter).toBe(example.expectedOutput.givenName[index]);
            });
        });
    });

});

describe("Alias guesser", function() {
    var examples = [
        {input: "Tong Zhang", expectedOutput: {proposals: ["ZT", "TT", "Tong", "Tongtong", "ZhangTong"]}},
        {input: "Xianjing Zhuo", expectedOutput: {proposals: ["ZXJ", "XJ", "Xianjing", "ZhuoXianJing"]}},
        {input: "Shiwei Zhou", expectedOutput: {proposals: ["ZSW", "SW", "Shiwei", "ZhouShiWei"]}},
        {input: "Guangtao Yang", expectedOutput: {proposals: ["YGT", "GT", "Guangtao", "YangGuangTao"]}},
        {input: "Ruimin Zhang", expectedOutput: {proposals: ["ZRM", "RM", "Ruimin", "ZhangRuiMin"]}},
        {input: "Hongzhang Luo", expectedOutput: {proposals: ["LHZ", "HZ", "Hongzhang", "LuoHongZhang"]}},
        {input: "Dingdong Long", expectedOutput: {proposals: ["LDD", "DD", "Dingdong", "LongDingDong"]}},
        {input: "Yang Jia", expectedOutput: {proposals: ["JY", "YY", "Yang", "Yangyang", "JiaYang"]}},
        {input: "Yu Meng", expectedOutput: {proposals: ["MY", "YY", "Yu", "Yuyu", "MengYu"]}},
        {input: "Chao Wang", expectedOutput: {proposals: ["WC", "CC", "Chao", "Chaochao", "WangChao"]}},
        {input: "Hui An", expectedOutput: {proposals: ["AH", "HH", "Hui", "Huihui", "AnHui"]}},
        {input: "Liang Zhuge", expectedOutput: {proposals: ["ZGL", "LL", "Liang", "Liangliang", "ZhuGeLiang"]}}
    ];

    it("should propose appropriate aliases following predefined patterns", function() {
        _.each(examples, function(example) {
            var proposals = guessAlias(example.input);
            expect(proposals.length).not.toBeLessThan(example.expectedOutput.proposals.length);
            _.each(example.expectedOutput.proposals, function(proposal) {
                expect(_.include(proposals,proposal)).toBeTruthy();
            });
        });
    });

});