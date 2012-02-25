function TimeSheetRecords() {
    this.logRepository = new LogRepository();
    this.publicHolidays = new PublicHolidays();
    this.converter = new TimesheetRecordsConverter();
}

TimeSheetRecords.prototype = {
    load:function (criteria, callback) {
        var self = this;
        var holidays = self.publicHolidays.findBy(criteria.endDate);
        self.logRepository.findBy(criteria.repositoryUrl, criteria, function(data){
            var logRecords = self.converter.convert(data);
            callback(self.merge(logRecords, holidays));
        })

    },

    merge:function (logs, holidays) {
        //ToDo remove duplicate records
        return holidays.concat(logs).sort(function (item1, item2) {
            return item1.dayOfWeek > item2.dayOfWeek;
        });
    }
}
