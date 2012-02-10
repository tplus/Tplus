function HolidayRepository(data) {
    this._holidayData = data;
}

HolidayRepository.prototype = {
    filter: function(endDateOfWeek) {
        var holidays = this.extractHolidays();
        return this._filterHolidays(holidays, endDateOfWeek);
    },
    extractHolidays: function() {
        var me = this;
        return _.map(this._holidayData.items, function(item) {
            var holidayDate = new Date(item.description.split("<br />")[0].substr(5).trim());
            return {date: holidayDate, title: item.title};
        });
    },

    _filterHolidays: function(holidays, endDateOfWeek) {
        var result = [];
        var me = this;
        _.each(holidays, function(holiday) {
            if (dateUtil.isInSameWeek(holiday.date, endDateOfWeek)) {
                result.push({
                    dayOfWeek: dateUtil.getNumberOfDay(holiday.date),
                    comment: holiday.title,
                    code: "TW_TOFF LEAVE PUBLIC_HOLIDAY",
                    billable: false
                });
            }
        });
        return result;
    }
}




