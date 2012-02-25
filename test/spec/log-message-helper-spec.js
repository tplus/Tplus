describe("hg log parser to timesheet record comment", function () {
    var commentHelper = new LogMessageHelper();

    it("should return true and correct story number given a valid log", function () {
        var logs = [
                    {"description":"[XJ] #74 assignee autocomplete", "expectedUsers":["XJ"], "expectedNumber":'#74'},
                    {"description":"[XJ&ZRM] #74 assignee autocomplete", "expectedUsers":["XJ", "ZRM"], "expectedNumber":'#74'},
                    {"description":"[XJ&ZRM] ##74 assignee autocomplete", "expectedUsers":["XJ", "ZRM"], "expectedNumber":'#74'},
                    {"description":"[XJ&ZRM&ZT&WR] ##74 assignee autocomplete", "expectedUsers":["XJ", "ZRM", "ZT", "WR"], "expectedNumber":'#74'}
                  ];

        _.each(logs, function(log){
            _.each(log.expectedUsers, function(user){
                expect(commentHelper.isCheckedInBy(log.description, user)).toBeTruthy();
            })
            expect(commentHelper.extractStoryOrDefectOrTaskNumber(log.description)).toBe(log.expectedNumber);
        })
    });

    it("should return false given a invalid log without user name", function () {
        var log = "#74 assignee autocomplete";
        expect(commentHelper.isCheckedInBy(log)).toBeFalsy();

    });

    it("should return false with user name in wrong format", function () {
        var log = "XJ&ZRM #74 assignee autocomplete";
        expect(commentHelper.isCheckedInBy(log)).toBeFalsy();
    });

    it("should return false given a invalid log with user name in wrong format", function () {
        var log = "XJ&ZRM #74 assignee autocomplete";
        expect(commentHelper.isCheckedInBy(log)).toBeFalsy();

    });

    it("should return empty comment given a invalid log with user name in correct format and number in wrong format", function () {
        var logs = [
            "[XJ&ZRM] 74 assignee autocomplete",
            "[XJ&ZRM] #N/A assignee autocomplete",
            "[XJ&ZRM] fix build",
            "[XJ&ZRM] NA fix build"
        ];
        _.each(logs, function (log) {
            expect(commentHelper.extractStoryOrDefectOrTaskNumber(log)).toBe("");
        })

    });

    //checked in with two number or more
})