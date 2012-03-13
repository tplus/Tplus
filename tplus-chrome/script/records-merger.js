function RecordsMerger() {
}

RecordsMerger.prototype = {
    mergeByCode: function(recordsFromMultipleRepo) {
        var self = this;
        var recordsGroupByCode = {};
        _.each(recordsFromMultipleRepo, function(entry) {
            if (entry.length > 0) {
                var key = entry[0].code;
                (recordsGroupByCode[key] || (recordsGroupByCode[key] = [])).push(entry);
            }
        });

        var result = [];
        _.each(recordsGroupByCode, function(item) {
            var records = self.mergeByDate(_.flatten(item));
            result.push(records);
        });
        return _.flatten(result);
    },

    mergeByDate: function(logMessages) {
        var self = this;
        var logsGroupByCheckedInDate = _.groupBy(logMessages, function(logMessage) {
            return logMessage.dayOfWeek;
        });
        return _.map(logsGroupByCheckedInDate, function(logCollection) {
            var logsInSameDay = _.flatten(logCollection);
            return {
                'dayOfWeek': logsInSameDay[0].dayOfWeek,
                'comment':self._mergeNumbersInSameDay(logsInSameDay),
                'code': logsInSameDay[0].code,
                'billable': logsInSameDay[0].billable
            }
        });
    },
    _mergeNumbersInSameDay:function (logMessages) {
        var comments = [];
        _.each(logMessages, function (logMessage) {
            var comment = logMessage.comment;
            if (!!comment && comments.indexOf(comment) == -1) {
                comments.push(comment);
            }
        });
        return comments.join(',');
    }

}