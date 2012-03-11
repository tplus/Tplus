function TimeSheetRecords() {
    this.TIGER_REPOSITORY_URL = "10.18.5.147:1911";
    this.TIGER_ACTIVITY_CODE = 'PWC0001 TIGER MISC';
    this.logRepository = new LogRepository();
    this.publicHolidays = new PublicHolidays();
    this.converter = new TimesheetRecordsBuilder();
}

TimeSheetRecords.prototype = {
    load:function (criteria, callback) {
        var self = this;
        var holidays = self.publicHolidays.findBy(criteria.endDate);
        var repoUrl = !criteria.repositoryUrl ? this.TIGER_REPOSITORY_URL : criteria.repositoryUrl;
        var projectCode = !criteria.projectCode ? this.TIGER_ACTIVITY_CODE : criteria.projectCode;
        self.logRepository.findBy(repoUrl, criteria.initials, criteria.endDate, function(data){
            var logRecords = self.converter.toRecords(data, projectCode, self.DEFAULT_BILLABLE);
            callback(self.merge(logRecords, holidays));
        })
    },

    merge:function (logs, holidays) {
        //ToDo remove duplicate records if checked in public holiday that will be ignored.
        return holidays.concat(logs).sort(function (item1, item2) {
            return item1.dayOfWeek > item2.dayOfWeek;
        });
    }
}
