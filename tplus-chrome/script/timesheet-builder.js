function TimesheetRecordsBuilder() {
    this.TIGER_ACTIVITY_CODE = 'PWC0001 TIGER MISC';
    this.daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
}

TimesheetRecordsBuilder.prototype = {
    build:function (logMessages, projectCode) {
        var self = this;
        var workingDays = _.sortBy(_.uniq(_.map(logMessages, function (logMessage) {
            return logMessage.dayOfWeek;
        })), function (day) {
            return day;
        });
        return _.map(workingDays, function (day) {
            var logsCheckedInSameDay = _.filter(logMessages, function (logMessage) {
                return logMessage.dayOfWeek == day;
            });
            return  {'dayOfWeek':day,
                'comment':self._mergeNumbersInSameDay(logsCheckedInSameDay),
                'code':projectCode,
                'billable':true
            };
        });
    },
    _mergeNumbersInSameDay:function (logMessages) {
        var comments = [];
        _.each(logMessages, function (logMessage) {
            var comment = logMessage.cardNumberOfCheckin;
            if (!!comment && comments.indexOf(comment) == -1) {
                comments.push(comment);
            }
        });
        return comments.join(',');
    }
}