describe("hg log parser", function () {
    it("should return one timesheet record given one valid log", function () {
        var logs = [
            {"date":"2012-02-02", "description":"[XJ&ZRM] #74 autocomplete of assignees"}
        ];
        var result = new LogParser().parse(logs);
        expect(result).toNotBe(null);
        expect(result.length).toBe(1);
    });

    it("should return one timesheet record given two duplicate valid logs in same day", function () {
        var logs = [
            {"date":"2012-02-02", "description":"[XJ&ZRM] #74 autocomplete of assignees"},
            {"date":"2012-02-02", "description":"[XJ&ZRM] #74 refactor autocomplete"}
        ];
        var result = new LogParser().parse(logs);
        expect(result).toNotBe(null);
        expect(result.length).toBe(1);
    });

    it("should return one timesheet record given multiple logs in one day", function () {
        var logs = [
            {"date":"2012-02-02", "description":"[XJ&ZRM] 74 autocomplete of assignees"},
            {"date":"2012-02-02", "description":"[XJ&ZRM] 74 refactor autocomplete"},
            {"date":"2012-02-02", "description":"[XJ&YGT] 745 fix regression"},
            {"date":"2012-02-02", "description":"[XJ&SW] 461 fix defect"}
        ];
        var result = new LogParser().parse(logs);
        expect(result).toNotBe(null);
        expect(result.length).toBe(1);
    });


});

