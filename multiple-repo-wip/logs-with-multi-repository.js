function LogsWithMultiRepository() {
    this.DEFAULT_REPOSITORY_URL = 'http://10.18.5.147:1911/shortlog/tip?revcount=1000';
    this.parser = new LogMessageParser();
}

LogsWithMultiRepository.prototype = {
    findBy:function (criteria, callback) {
        var repositores =
            [
                {"url" : "http://10.18.5.147:1911/shortlog/tip?rev=1200", "name" : "tiger", "code" : "PWC0001 TIGER MISC"},
                {"url" : "http://10.18.5.147:1911/shortlog/tip?rev=1200", "name" : "tiger", "code" : "PWC0001 TIGER MISC"}
            ];
        var loadLogsFromMultipleRepoFns = [];
        _.each(repositores, function(repo) {
            var loadLogsFn = function(callback) {
                $.get(repo.url || criteria.repositoryUrl, function(data) {
                    var logs = self._extractLogEntries(criteria.initials, criteria.endDate, data);
                    callback(logs);
                });
            };
            loadLogsFromMultipleRepoFns.push(loadLogsFn);
        });

        tplusAsync.parallel(loadLogsFromMultipleRepoFns, function(logs) {
            callback(logs);
        });

    },
    _extractLogEntries: function(name, endDateOfWeek, data) {
        var self = this;
        var result = [];
        $(data).find(".bigtable tr").each(function(i, v) {
            var logDate = $(v).find('.date').text();
            var description = $(v).find('.description a').text();
            if (dateUtil.isInSameWeek(logDate, endDateOfWeek) && self.parser._isCheckedInBy(description, name)) {
                result.push({
                    'dayOfWeek' : dateUtil.getNumberOfDay(logDate),
                    'comment': self.parser._extractStoryOrDefectOrTaskNumber(description)
                });
            }
        });
        return result;
    }
}
