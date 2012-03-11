function TimesheetRecordsBuilder() {
    this.DEFAULT_BILLABLE = false;
    this.daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
}

TimesheetRecordsBuilder.prototype = {
    toRecords: function(logMessages, projectCode, isBillable) {
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
                'code': projectCode,
                'billable': isBillable
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