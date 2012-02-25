function TimeSheetRecordsBuilder(userName, endDate,logRepositoryUrl) {
    this.criteria = {"userName": userName, "endDate" : endDate};
    this.logRepositoryUrl = logRepositoryUrl;
    this.logRepository = new LogRepository();
    this.publicHolidays = new PublicHolidays();
    this.parser = new LogParser();
}

TimeSheetRecordsBuilder.prototype = {
    build:function (callback) {
        var self = this;
        var holidays = self.publicHolidays.findBy(self.criteria.endDate);
        self.logRepository.findBy(self.logRepositoryUrl, self.criteria, function(data){
            var logs = self.parser.parse(data);
            var records = self.merge(logs, holidays);
            callback(records);
        })

    },

    merge:function (logs, holidays) {
        //ToDo remove duplicate records
        return holidays.concat(logs).sort(function (item1, item2) {
            return item1.dayOfWeek > item2.dayOfWeek;
        });
    }
}
