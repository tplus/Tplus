function LogParser() {
}

LogParser.prototype = {
    parse:function (entries) {
        var self = this;
        var workingDays = _.sortBy(_.uniq(_.map(entries, function (entry) {
            return dateUtil.getNumberOfDay(entry.date);
        })), function (day) {
            return day;
        });
        return _.map(workingDays, function (day) {
            var entriesInWorkingDays = _.filter(entries, function (entry) {
                var dayOfLogEntry = dateUtil.getNumberOfDay(entry.date);
                return dayOfLogEntry == day;
            });
            return  {'dayOfWeek':day,
                'comment':self._parseLogDescription(entriesInWorkingDays),
                'code':self.TIGER_ACTIVITY_CODE,
                'billable':true
            };
        });
    },
    _parseLogDescription:function (entries) {
        var comments = [];
        _.each(entries, function (entries) {
            var matchResult = entries.description.match(/#r{0,1}\d+/i);
            if (!!matchResult) {
                var comment = matchResult[0];
                if (comment && comments.indexOf(comment) == -1) {
                    comments.push(comment);
                }
            }
        });
        return comments.join(',');
    }
}
