function LogRepository(data) {
    this.daysOfWeek = ['1','2','3','4','5','6','7'];
    this.MILLI_SECONDS_IN_ONE_DAY = 1000 * 3600 * 24;
    this.data = data;
}

LogRepository.prototype = {
    search: function(name, endDateOfWeek) {
        var logEntries = this._extractLogEntries(name, endDateOfWeek);
        return this._transformLogEntries(logEntries);
    },
    _extractLogEntries: function(name, endDateOfWeek) {
        var me = this;
        var result = [];
        $(this.data).find(".bigtable tr").each(function(i, v) {
            var logDate = $(v).find('.age').text();
            var description = $(v).find('.description a').text();
            if (me._isInSameWeek(logDate, endDateOfWeek) && me._isCheckedInBy(description, name)) {
                result.push({
                    'date' : logDate,
                    'description': description
                });
            }
        });
        return result;
    },
    _isInSameWeek: function(date, endDateOfWeek) {
        var realEndDate = new Date(endDateOfWeek);
        realEndDate = new Date(new Date(new Date(realEndDate).toDateString()).getTime() + 3600 * 1000 * 24);
        var logDate = new Date(date);
        return (realEndDate >= logDate) && ((realEndDate.getTime() - logDate.getTime()) <= 7 * this.MILLI_SECONDS_IN_ONE_DAY);
    },
    _isCheckedInBy: function(description, name) {
        return description.indexOf(name) != -1
    },
    _transformLogEntries: function(logEntries) {
        var me = this;
        var workingDays = _.sortBy(_.uniq(_.map(logEntries, function(logEntry) {
            return me._getNumberOfDay(logEntry.date);
        })), function(day) {
            return day;
        });
        return _.map(workingDays, function(day) {
            var logEntriesOfDay = _.filter(logEntries, function(logEntry) {
                var dayOfLogEntry = me._getNumberOfDay(logEntry.date);
                return dayOfLogEntry == day;
            });
            return  {'dayOfWeek': day, 'comment': me._extractComments(logEntriesOfDay)};
        });
    },
    _getNumberOfDay : function(date) {
        var dayNumberOfDate = new Date(date).getDay();
        return !dayNumberOfDate ? 7 : dayNumberOfDate;
    },
    _extractComments: function(logEntriesOfDay) {
        var result = [];
        _.each(logEntriesOfDay, function(logEntry) {
            var comment = logEntry.description.split(" ")[1];
            comment = comment.replace("#N/A", '').replace('N/A', '');
            if (comment && result.indexOf(comment) == -1) {
                result.push(comment);
            }
        });
        return result.join(',');
    }
}




