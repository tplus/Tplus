function TimeSheetRecordsBuilder(userName, endDate,logRepositoryUrl) {
    this.userName = userName;
    this.endDate = endDate;
    this.logRepositoryUrl = logRepositoryUrl;
}

TimeSheetRecordsBuilder.prototype = {
    build:function (callback) {
        var me = this;
        jQuery.get(this.logRepositoryUrl, function(data) {
            var logs = new LogRepository(data).filter(this.userName, this.endDate);
            var holidays = []//new HolidayRepository().getHolidayBy(this.endDate);
            callback(me.merge(logs, holidays));
        });
    },

    merge:function (logs, holidays) {
        //ToDo remove duplicate records
        return holidays.concat(logs).sort(function (item1, item2) {
            return item1.dayOfWeek > item2.dayOfWeek;
        });
    }
}
