function LogParser() {
    this.TIGER_ACTIVITY_CODE = 'PWC0001 TIGER MISC';
    this.daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
}

LogParser.prototype = {
    parse:function (entries) {
        var self = this;
        var workingDays = _.sortBy(_.uniq(_.map(entries, function (entry) {
            return entry.daysOfWeek;
        })), function (day) {
            return day;
        });
        return _.map(workingDays, function (day) {
            var entriesInWorkingDays = _.filter(entries, function (entry) {
                return entry.daysOfWeek == day;
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
        _.each(entries, function (entry) {
            var comment = entry.comment;
            if (!!comment && comments.indexOf(comment) == -1) {
                comments.push(comment);
            }
        });
        return comments.join(',');
    }
}