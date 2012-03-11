function LogsWithMultiRepository() {
    this.TIGER_REPOSITORY_URL = 'http://10.18.5.147:1911/shortlog/tip?revcount=1000';
    this.TIGER_REPOSITORIES =  [
                {"url" : "http://10.18.5.147:1911/shortlog/tip?rev=1200", "name" : "tiger", "code" : "PWC0001 TIGER MISC"},
                {"url" : "http://10.18.5.147:1911/shortlog/tip?rev=1200", "name" : "tiger", "code" : "PWC0001 TIGER MISC"}
            ];
    this.parser = new LogMessageParser();
}

LogsWithMultiRepository.prototype = {
    findBy:function (criteria, callback) {
        var self = this;
        var repositories =  criteria.repositories || self.TIGER_REPOSITORIES;
        var loadLogsFromMultipleRepoFns = [];
        _.each(repositories, function(repo) {
            var loadLogsFn = function(callback) {
                new LogRepository().findBy(repo.url, criteria.initials, criteria.endDate, function(data) {
                    var logRecords = new TimesheetRecordsBuilder().toRecords(data, repo.code, self.DEFAULT_BILLABLE);
                    callback(logRecords);
                })
            };
            loadLogsFromMultipleRepoFns.push(loadLogsFn);
        });

        tplusAsync.parallel(loadLogsFromMultipleRepoFns, function(logs) {

            //Get all hg records might with same code so need merge records with same code;
            //mergeRecordsWithSameProjectCode(logs)
            callback(logs);
        });

    }
}
