function TimesheetRecordsBuilder(logMessages, code, isBillable) {
    this.logMessages = logMessages;
    this.code = code;
    this.isBillable = isBillable;
}

TimesheetRecordsBuilder.prototype = {
    toRecords: function() {
        var self = this;
        var workingDays = _.sortBy(_.uniq(_.map(self.logMessages, function (logMessage) {
            return logMessage.dayOfWeek;
        })), function (day) {
            return day;
        });
        return _.map(workingDays, function (day) {
            var logsCheckedInSameDay = _.filter(self.logMessages, function (logMessage) {
                return logMessage.dayOfWeek == day;
            });
            return  {'dayOfWeek':day,
                'comment':self._mergeNumbersInSameDay(logsCheckedInSameDay),
                'code': self.code,
                'billable': self.isBillable
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