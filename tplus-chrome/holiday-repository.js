function HolidayRepository(data) {
    this._holidayData = data;
    this._util = new Util();
}

HolidayRepository.prototype = {
    search: function(endDateOfWeek) {
        var holidays = this.extractHolidays();
        return this._filterHolidays(holidays);
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
            if (me._util.isInSameWeek(holiday.date, endDateOfWeek)) {
                result.push({
                    dayOfWeek: me._util.getNumberOfDay(holiday.date),
                    comment: holiday.title
                });
            }
        });
        return result;
    }
}




