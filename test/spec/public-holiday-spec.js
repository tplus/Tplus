
describe("timesheet records of public holidays in week day", function(){

    var fakeHolidaysInWeekDay = [
        {"year":"2012",
            "items": [
                { "date":"2012-01-03","title": "New Year's Day"},
                { "date":"2012-01-23","title": "Spring Festival"},
                { "date":"2012-01-24","title": "Spring Festival"}
             ]
        }
    ];

    it("should find one record given date which has a public holiday in week Tuesday", function(){
        var publicHolidays = new PublicHolidays(fakeHolidaysInWeekDay);
        var result = publicHolidays.findBy("2012-01-03");
        expect(result).toNotBe(null);
        expect(result.length).toBe(1);
        expect(result[0].dayOfWeek).toBe(2);
        expect(result[0].comment).toEqual("New Year's Day");
        expect(result[0].code).toEqual("TW_TOFF LEAVE PUBLIC_HOLIDAY");
        expect(result[0].billable).toBeFalsy();
    });

    it("should find empty records given a Sunday which has non-public holiday in Friday", function(){
        var publicHolidays = new PublicHolidays(fakeHolidaysInWeekDay);
        var result = publicHolidays.findBy("2012-02-05");
        expect(result).toNotBe(null);
        expect(result.length).toBe(0);
    });

    it("should find one records given a non-Sunday date which has public holiday in Friday", function(){
        var publicHolidays = new PublicHolidays(fakeHolidaysInWeekDay);
        var result = publicHolidays.findBy("2012-01-02");
        expect(result).toNotBe(null);
        expect(result.length).toBe(1);
    });

    it("should find two record given date which has two public holiday in week Monday and Tuesday", function(){
        var publicHolidays = new PublicHolidays(fakeHolidaysInWeekDay);
        var result = publicHolidays.findBy("2012-01-29");
        expect(result).toNotBe(null);
        expect(result.length).toBe(2);
        AssertRecord(result[0], 1);
        AssertRecord(result[1], 2);
    });

    function AssertRecord(result, expectedDayOfWeek) {
        expect(result.dayOfWeek).toBe(expectedDayOfWeek);
        expect(result.comment).toEqual("Spring Festival");
        expect(result.code).toEqual("TW_TOFF LEAVE PUBLIC_HOLIDAY");
        expect(result.billable).toBe(false);
    }
});

