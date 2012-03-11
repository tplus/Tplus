describe("timesheet record builder for parsed hg log entries", function () {
    it("should return correct timesheet record given one valid log", function () {
        var logs = [
            {"dayOfWeek":4, "cardNumberOfCheckin":"#74"}
        ];
        var result = new TimesheetRecordsBuilder(logs, "", false).toRecords();
        expect(result).toNotBe(null);
        expect(result.length).toBe(1);
        expect(result[0].dayOfWeek).toBe(4);
        expect(result[0].comment).toBe("#74");
    });

    it("should return correct timesheet record given two duplicate valid logs in same day", function () {
        var logs = [
            {"dayOfWeek":4, "cardNumberOfCheckin":"#74"},
            {"dayOfWeek":4, "cardNumberOfCheckin":"#74"}
        ];
        var result = new TimesheetRecordsBuilder(logs, "", false).toRecords();
        expect(result).toNotBe(null);
        expect(result.length).toBe(1);
        expect(result[0].comment).toBe("#74");
    });

    it("should return correct timesheet record given multiple logs in one day", function () {
        var logs = [
            {"dayOfWeek":4, "cardNumberOfCheckin":"#74"},
            {"dayOfWeek":4, "cardNumberOfCheckin":"#74"},
            {"dayOfWeek":4, "cardNumberOfCheckin":"#745"},
            {"dayOfWeek":4, "cardNumberOfCheckin":"#461"}
        ];
        var result = new TimesheetRecordsBuilder(logs, "", false).toRecords();
        expect(result).toNotBe(null);
        expect(result.length).toBe(1);
        expect(result[0].comment).toBe("#74,#745,#461");
    });


});

