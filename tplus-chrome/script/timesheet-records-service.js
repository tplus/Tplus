function TimeSheetRecordsService() {
    this.TIGER_REPOSITORY_URL = "10.18.5.147:1911";
    this.TIGER_ACTIVITY_CODE = 'PWC0001 TIGER MISC';
    this.TIGER_REPOSITORIES =  [
                {"url" : "10.18.5.147:1911", "code" : "PWC0001 TIGER MISC"}
            ];
    this.DEFAULT_BILLABLE = true;
    this.logRepository = new LogRepository();
    this.publicHolidays = new PublicHolidays();
    this.recordsMerger = new RecordsMerger();
}

TimeSheetRecordsService.prototype = {
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
                new LogRepository().load(repo.url, function(data) {
                    var records = new TimesheetRecords(data, repo.code);
                    var result = records.filterBy(criteria.aliases, criteria.endDate);
                    callback(result);
                })
            };
            loadLogsFromMultipleRepoFns.push(loadLogsFn);
        });

        tplusAsync.parallel(loadLogsFromMultipleRepoFns, function(records) {
            var recordsFromRepos = self.recordsMerger.mergeByCode(records);
            callback(recordsFromRepos);
        });

    },
    merge:function (records, holidays) {
        //ToDo remove duplicate records if checked in public holiday that will be ignored.
        return holidays.concat(records).sort(function (item1, item2) {
            return item1.dayOfWeek > item2.dayOfWeek;
        });
    }
}
