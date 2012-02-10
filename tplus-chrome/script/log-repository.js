function LogRepository(data) {
    this.daysOfWeek = ['1','2','3','4','5','6','7'];
    this.TIGER_ACTIVITY_CODE = 'PWC0001 TIGER MISC',
    this.data = data;
}

LogRepository.prototype = {
    filter: function(name, endDateOfWeek) {
        var logEntries = this._extractLogEntries(name, endDateOfWeek);
        return this._transformLogEntries(logEntries);
    },
    _extractLogEntries: function(name, endDateOfWeek) {
        var me = this;
        var result = [];
        $(this.data).find(".bigtable tr").each(function(i, v) {
            var logDate = $(v).find('.date').text();
            var description = $(v).find('.description a').text();
            if (dateUtil.isInSameWeek(logDate, endDateOfWeek) && me._isCheckedInBy(description, name)) {
                result.push({
                    'date' : logDate,
                    'description': description
                });
            }
        });
        return result;
    },
    _isCheckedInBy: function(description, name) {
        return description.indexOf(name) != -1
    },
    _transformLogEntries: function(logEntries) {
        var me = this;
        var workingDays = _.sortBy(_.uniq(_.map(logEntries, function(logEntry) {
            return dateUtil.getNumberOfDay(logEntry.date);
        })), function(day) {
            return day;
        });
        return _.map(workingDays, function(day) {
            var logEntriesOfDay = _.filter(logEntries, function(logEntry) {
                var dayOfLogEntry = dateUtil.getNumberOfDay(logEntry.date);
                return dayOfLogEntry == day;
            });
            return  {'dayOfWeek': day,
                'comment': me._extractComments(logEntriesOfDay),
                'code': me.TIGER_ACTIVITY_CODE,
                'billable': true
            };
        });
    },
    _extractComments: function(logEntriesOfDay) {
        var ignoreCharacter = ["#N/A", "#NA", "N/A", "NA"];
        var result = [];
        _.each(logEntriesOfDay, function(logEntry) {
            var comment = logEntry.description.split(" ")[1];
            _.each(ignoreCharacter, function(character){
                comment = comment.replace(character, '');
            })
            if (comment && result.indexOf(comment) == -1) {
                result.push(comment);
            }
        });
        return result.join(',');
    }
}




