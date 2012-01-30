function LogRepository(data) {
    this.daysOfWeek = ['1','2','3','4','5','6','7'];
    this.MILLI_SECONDS_IN_ONE_DAY = 1000 * 3600 * 24;
    this.data = data;
}

LogRepository.prototype = {
    search: function(name, endDateOfWeek) {
        var logEntries = this._extractLogEntries(name, endDateOfWeek);
        console.log('logEntries', logEntries);
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
        return result.slice(1);
    },
    _isCheckedInBy: function(description, name) {
        return description.indexOf(name) != -1
    },
    _isInSameWeek: function(currentDate, endDateOfWeek) {
        endDateOfWeek = new Date(endDateOfWeek);
        endDateOfWeek = new Date(new Date(new Date(endDateOfWeek).toDateString()).getTime() + 3600*1000*24);
        return (endDateOfWeek.getTime() - new Date(currentDate).getTime()) <= 7 * this.MILLI_SECONDS_IN_ONE_DAY;
    },
    _transformLogEntries: function(logEntries) {
        var me = this;
        var workingDays = _.sortBy(_.uniq(_.map(logEntries, function(logEntry) {
            return me._getNumberOfDay(logEntry.date);
        })), function(day) {
            return day;
        });
        console.log('working days->', workingDays);
        return _.map(workingDays, function(day) {
            var logEntriesOfDay = _.filter(logEntries, function(logEntry) {
                var dayOfLogEntry = me._getNumberOfDay(logEntry.date);
                return dayOfLogEntry == day;
            });
            var commentsOfDay = _.uniq(_.map(logEntriesOfDay, function(logEntry) {
                return me._transformComments(logEntry.description)
            }));
            return  {'dayOfWeek': day, 'comment': commentsOfDay.join(',')};
        });
    },
    _getNumberOfDay : function(date) {
        var dayNumberOfDate = new Date(date).getDay();
        return !dayNumberOfDate ? 7 : dayNumberOfDate;
    },
    _transformComments: function(description) {
        var comment = description.split(" ")[1];
//        if (comment) {
//            comment = comment.replace("#N/A", '');
//        }
        return description.split(" ")[1];
    }

}




