function TimeSheetRecords() {
    this.TIGER_REPOSITORY_URL = "10.18.5.147:1911";
    this.TIGER_ACTIVITY_CODE = 'PWC0001 TIGER MISC';
    this.TIGER_REPOSITORIES =  [
                {"url" : "10.18.5.147:1911", "code" : "PWC0001 TIGER MISC"}
            ];
    this.DEFAULT_BILLABLE = true;
    this.logRepository = new LogRepository();
    this.publicHolidays = new PublicHolidays();
}

TimeSheetRecords.prototype = {
    load:function (criteria, callback) {
        var self = this;
        var holidays = self.publicHolidays.findBy(criteria.endDate);
        self.getRecords(criteria, function(records){
            callback(self.merge(records,holidays));
        });
    },
    getRecords:function (criteria, callback) {
        var self = this;
        var repositories =  self.TIGER_REPOSITORIES;
        if(criteria.repositoryUrl){
            repositories[0].url = criteria.repositoryUrl;
        }
        if(criteria.projectCode){
            repositories[0].code = criteria.projectCode;
        }
        var loadLogsFromMultipleRepoFns = [];
        _.each(repositories, function(repo) {
            var loadLogsFn = function(callback) {
                new LogRepository().findBy(repo.url, criteria.initials, criteria.endDate, function(data) {
                    var logRecords = new TimesheetRecordsBuilder(data, repo.code, self.DEFAULT_BILLABLE).toRecords();
                    callback(logRecords);
                })
            };
            loadLogsFromMultipleRepoFns.push(loadLogsFn);
        });

        tplusAsync.parallel(loadLogsFromMultipleRepoFns, function(logs) {
            callback(new RecordsMerger().merge(logs));
        });

    },
    merge:function (logs, holidays) {
        //ToDo remove duplicate records if checked in public holiday that will be ignored.
        return holidays.concat(logs).sort(function (item1, item2) {
            return item1.dayOfWeek > item2.dayOfWeek;
        });
    }
}
