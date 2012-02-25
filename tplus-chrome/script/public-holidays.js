function PublicHolidays(holidays) {
    this.holidaysInWeekDay = holidays || [
                                {"year":"2012",
                                 "items": [
                                     { "date":"2012-01-03","title": "New Year's Day"},
                                     { "date":"2012-01-23","title": "Spring Festival"},
                                     { "date":"2012-01-24","title": "Spring Festival"},
                                     { "date":"2012-01-25","title": "Spring Festival"},
                                     { "date":"2012-01-26","title": "Spring Festival"},
                                     { "date":"2012-01-27","title": "Spring Festival"},
                                     { "date":"2012-04-02","title": "Qingming Festival"},
                                     { "date":"2012-04-03","title": "Qingming Festival"},
                                     { "date":"2012-04-04","title": "Qingming Festival"},
                                     { "date":"2012-05-01","title": "May Day"},
                                     { "date":"2012-06-22","title": "Dragaon Boat Festival"},
                                     { "date":"2012-10-01","title": "National Day"},
                                     { "date":"2012-10-02","title": "National Day"},
                                     { "date":"2012-10-03","title": "National Day"},
                                     { "date":"2012-10-04","title": "National Day"},
                                     { "date":"2012-10-05","title": "National Day"}
                                 ]
                                }
                             ];
    this.PUBLIC_HOLIDAY_CODE = "TW_TOFF LEAVE PUBLIC_HOLIDAY";
}

PublicHolidays.prototype = {
    findBy: function(endDateOfWeek) {
        var self = this;
        var result = [];
        var holidaysInThisYear = _.find(self.holidaysInWeekDay, function(holiday) {
            return holiday.year == dateUtil.getYearOfDay(endDateOfWeek);
        });
        _.each(holidaysInThisYear.items, function(holiday) {
            if (dateUtil.isInSameWeek(holiday.date, endDateOfWeek)) {
                result.push({
                    dayOfWeek: dateUtil.getNumberOfDay(holiday.date),
                    comment: holiday.title,
                    code: self.PUBLIC_HOLIDAY_CODE,
                    billable: false
                });
            }
        });
        return result;
    }
}




