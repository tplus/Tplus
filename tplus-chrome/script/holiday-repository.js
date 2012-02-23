function HolidayRepository() {
    this.holidays = {'year':'2012',
                        'items': [{ 'date':'2012-04-03',
                                       'title': 'spring'
                                    }]
                        };
    this.PUBLIC_HOLIDAY_CODE = "TW_TOFF LEAVE PUBLIC_HOLIDAY";
}

HolidayRepository.prototype = {
    getHolidayBy: function(endDateOfWeek) {
        var result = [];
        var me = this;
        _.each(me.holidays.items, function(holiday) {
            if (dateUtil.isInSameWeek(holiday.date, endDateOfWeek)) {
                result.push({
                    dayOfWeek: dateUtil.getNumberOfDay(holiday.date),
                    comment: holiday.title,
                    code: me.PUBLIC_HOLIDAY_CODE,
                    billable: false
                });
            }
        });
        return result;
    }
}




